import { useState, useRef, useReducer } from "react";
import { fromMarkdown, type Yield, type Gen } from "@mdast";
import { ok as assert } from "devlop";

export type AppState =
  | { status: "READY"; yields: { prev: null; cur: null } }
  | { status: "START"; yields: { prev: null; cur: Yield } }
  | { status: "CONTINUE"; yields: { prev: Yield; cur: Yield } }
  | { status: "END"; yields: { prev: Yield; cur: null } };

type Action =
  | { type: "START"; value: Yield }
  | { type: "NEXT"; value: Yield }
  | { type: "FINISH" }
  | { type: "STOP" };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "START":
      return { status: "START", yields: { prev: null, cur: action.value } };

    case "NEXT":
      assert(state.status === "START" || state.status === "CONTINUE");
      return {
        status: "CONTINUE",
        yields: {
          prev: state.yields.cur,
          cur: action.value,
        },
      };

    case "FINISH":
      assert(state.status === "START" || state.status === "CONTINUE");
      return { status: "END", yields: { prev: state.yields.cur, cur: null } };

    case "STOP":
      return { status: "READY", yields: { prev: null, cur: null } };

    default:
      return state;
  }
}

export function useGenerator() {
  const [md, setMd] = useState<string>("# Hello World");
  const [state, dispatch] = useReducer(appReducer, {
    status: "READY",
    yields: { prev: null, cur: null },
  });
  const iteratorRef = useRef<Gen | null>(null);

  function handleMdChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMd(e.target.value);
  }

  function handleStart() {
    iteratorRef.current = fromMarkdown(md);

    const { value, done } = iteratorRef.current.next();
    assert(!done);
    dispatch({ type: "START", value });
  }

  const handleNext = () => {
    if (!iteratorRef.current) return;
    const { value, done } = iteratorRef.current.next();

    if (done) dispatch({ type: "FINISH" });
    else dispatch({ type: "NEXT", value });
  };

  const handleStop = () => {
    dispatch({ type: "STOP" });
  };

  return { md, handleMdChange, state, handleStart, handleNext, handleStop };
}
