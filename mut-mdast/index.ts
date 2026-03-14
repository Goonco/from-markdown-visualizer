import { parse, postprocess, preprocess } from "micromark";
import type { Encoding, Value, Event } from "micromark-util-types";
import type { Root } from "mdast";
import type { CompileContext, Options } from "./types";

// @ts-expect-error temp suppress
import { compiler } from "./compile";

export function fromMarkdown(
  value: Value,
  encdoing?: Encoding | null | undefined,
  Options?: Options | null | undefined,
): Gen;
export function fromMarkdown(
  value: Value,
  Options?: Options | null | undefined,
): Gen;
export function fromMarkdown(
  value: Value,
  encoding?: Encoding | Options | null | undefined,
  options?: Options | null | undefined,
): Gen {
  if (typeof encoding !== "string") {
    options = encoding;
    encoding = undefined;
  }

  return (compiler as MutatedCompiler)(options)(
    postprocess(
      parse(options)
        .document()
        .write(preprocess()(value, encoding, true)),
    ),
  );
}

type MutatedCompiler = (
  options?: Options | null | undefined,
) => (events: Event[]) => Gen;

export type Yield = {
  stack: CompileContext["stack"];
  tree: Root;
  events: Event[];
  curEventIdx: number;
};
export type Gen = Generator<Yield, Root, never>;
