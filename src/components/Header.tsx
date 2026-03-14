import { IoLogoGithub } from "react-icons/io5";

export function Header() {
  return (
    <header className="py-3 flex flex-row items-center justify-between w-full">
      <Left />
      <Right />
    </header>
  );
}

function Left() {
  return (
    <div className="flex items-center gap-1">
      <a
        className="font-bold hover:opacity-70 flex items-center gap-1"
        href="https://github.com/syntax-tree/mdast-util-from-markdown"
        target="_blank"
      >
        <img className="size-6 rounded" src="/logo.png" alt="icon" />
        <span>mdast-util-from-markdown</span>
      </a>

      <span className="w-px h-3 bg-neutral-400"></span>
      <span className="font-light text-sm text-neutral-500">
        Context Visualizer Playground
      </span>
    </div>
  );
}

function Right() {
  return (
    <div className="flex flex-row items-center gap-3">
      {/* <Tree /> */}
      <GitHubLink />
    </div>
  );
}

function GitHubLink() {
  return (
    <a
      href="https://github.com/syntax-tree/mdast-util-from-markdown"
      target="_blank"
      className="hover:opacity-70 flex flex-row items-center gap-1 text-neutral-700"
    >
      <IoLogoGithub size="20" />
      <span className="text-sm font-medium">GitHub</span>
    </a>
  );
}

// function Tree() {
//   return (
//     <button className="hover:opacity-70 flex flex-row items-center gap-1 text-neutral-700">
//       <IoCodeSlash size="20" />
//       <span className="text-sm font-medium">Tree</span>
//     </button>
//   );
// }
