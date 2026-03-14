import { Panel, StateWrapper } from "./Panel";
import { type Event } from "micromark-util-types";
import clsx from "clsx";
import { IoListCircle } from "react-icons/io5";
import type { AppState } from "@/hooks";

function EventPanelContent({
  events,
  curIdx,
}: {
  events: Event[];
  curIdx: number;
}) {
  return (
    <div className="size-full">
      <div className="sticky top-0 bg-white grid grid-cols-[60px_180px_1fr] divide-x divide-neutral-200 border-b border-neutral-200 text-center text-sm font-medium">
        <span>Type</span>
        <span>Token</span>
        <span>Content</span>
      </div>
      <div>
        {events.map((e, idx) => (
          <EventNode key={idx} event={e} current={idx === curIdx} />
        ))}
      </div>
    </div>
  );
}

function EventNode({ event, current }: { event: Event; current: boolean }) {
  return (
    <div
      className={clsx(
        "grid grid-cols-[60px_180px_1fr] divide-x divide-neutral-200 border-b border-neutral-200 text-center text-sm",
        { "bg-blue-300": current },
      )}
    >
      <span className="font-light">{event[0]}</span>
      <span>{event[1].type}</span>
      <span>{`"${event[2].sliceSerialize(event[1])}"`}</span>
    </div>
  );
}

export function EventPanel({ state }: { state: AppState }) {
  return (
    <Panel Icon={IoListCircle} title="Event List">
      <StateWrapper state={state} disableStatus={["READY", "END"]}>
        {(safeState) => (
          <EventPanelContent
            events={safeState.yields.cur.events}
            curIdx={safeState.yields.cur.curEventIdx}
          />
        )}
      </StateWrapper>
    </Panel>
  );
}
