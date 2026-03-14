import type { AppState } from "@/hooks";
import type { Yield } from "@mdast";
import type { Root, RootContent } from "mdast";
import { Panel, StateWrapper } from "./Panel";
import { IoAnalytics } from "react-icons/io5";
import Mermaid from "src/ui/Mermaid";

let nodeId = 0;
const id = () => `n${nodeId++}`;
const link = (n1: string, n2: string) => `${n1} --> ${n2}`;

function generateTree(root: Root) {
  nodeId = 0;
  const declarations: string[] = [];
  const links: string[] = [];

  const rootId = id();
  declarations.push(`${rootId}(("${root.type}"))`);
  root.children.forEach((c) => {
    aux(c, rootId);
  });

  function aux(child: RootContent, parentId: string) {
    const childId = id();
    const label =
      "value" in child ? `${child.type}: ${child.value}` : child.type;
    declarations.push(`${childId}(("${label}"))`);
    links.push(link(parentId, childId));

    if ("children" in child && Array.isArray(child.children))
      child.children.forEach((c) => aux(c, childId));
  }

  return `graph TD\n\t${declarations.join("\n\t")}\n\t${links.join("\n\t")}`;
}

function TreePanelContent({ tree }: { tree: Yield["tree"] }) {
  const mermaid = generateTree(tree);

  return (
    <div className="size-full overflow-auto">
      <Mermaid chart={mermaid} />
    </div>
  );
}

export function TreePanel({ state }: { state: AppState }) {
  return (
    <Panel Icon={IoAnalytics} title="Tree">
      <StateWrapper state={state} disableStatus={["READY", "END"]}>
        {(safeState) => <TreePanelContent tree={safeState.yields.cur.tree} />}
      </StateWrapper>
    </Panel>
  );
}
