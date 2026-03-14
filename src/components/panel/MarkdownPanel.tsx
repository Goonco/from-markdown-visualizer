import { Panel } from "./Panel";
import { IoLogoMarkdown } from "react-icons/io5";
import Markdown from "react-markdown";
import type { AppState } from "@/hooks";

export function MarkdownPanel({
  state,
  md,
  handleMdChange,
}: {
  state: AppState;
  md: string;
  handleMdChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  const disabled = state.status !== "READY";
  return (
    <Panel Icon={IoLogoMarkdown} title="Markdown Editor">
      {disabled ? (
        <div className="p-2 prose prose-neutral">
          <Markdown>{md}</Markdown>
        </div>
      ) : (
        <textarea
          disabled={disabled}
          className="block p-2 size-full resize-none outline-none"
          value={md}
          onChange={handleMdChange}
        />
      )}
    </Panel>
  );
}
