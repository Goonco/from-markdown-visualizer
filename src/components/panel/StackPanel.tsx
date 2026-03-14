import type { Node } from "mdast";
import type { Yield } from "@mdast";
import type { Fragment } from "@mdast/types";
import { ObjectInspector } from "react-inspector";
import { Panel, StateWrapper } from "./Panel";
import { IoFileTrayStacked } from "react-icons/io5";
import type { AppState } from "@/hooks";

function StackPanelContent({ stack }: { stack: Yield["stack"] }) {
  return (
    <div className="size-full divide-y divide-neutral-2003">
      {stack.map((n, idx) => (
        <Node key={idx} node={n} />
      ))}
    </div>
  );
}

function Node({ node }: { node: Fragment | Node }) {
  return (
    <div className="p-2">
      <span>{node.type}</span>
      <ObjectInspector data={node} />
    </div>
  );
}

export function StackPanel({ state }: { state: AppState }) {
  return (
    <Panel Icon={IoFileTrayStacked} title="Stack">
      <StateWrapper state={state} disableStatus={["READY", "END"]}>
        {(safeState) => (
          <StackPanelContent stack={safeState.yields.cur.stack} />
        )}
      </StateWrapper>
    </Panel>
  );
}
