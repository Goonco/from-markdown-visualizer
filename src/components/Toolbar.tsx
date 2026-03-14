import type { AppState } from "@hooks";
import clsx from "clsx";
import type { ReactNode } from "react";

import {
  IoPlayOutline,
  IoStopOutline,
  IoPlayForwardOutline,
} from "react-icons/io5";

export function Toolbar({
  status,
  handleStart,
  handleNext,
  handleStop,
}: {
  status: AppState["status"];
  handleStart: () => void;
  handleNext: () => void;
  handleStop: () => void;
}) {
  return (
    <div>
      <div className="inline-flex border bg-white border-neutral-200 rounded-md divide-x divide-neutral-200 overflow-hidden">
        <StyeldButton onClick={handleStart} disabled={status !== "READY"}>
          <IoPlayOutline size="14" className="font-bold" />
          <span>RUN</span>
        </StyeldButton>
        <StyeldButton onClick={handleStop} disabled={status === "READY"}>
          <IoStopOutline size="14" />
          <span>STOP</span>
        </StyeldButton>
        <StyeldButton
          onClick={handleNext}
          disabled={status === "READY" || status === "END"}
        >
          <IoPlayForwardOutline size="14" />
          <span>NEXT</span>
        </StyeldButton>
      </div>
    </div>
  );
}

function StyeldButton({
  disabled,
  onClick,
  children,
}: {
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "px-2 gap-0.5 py-1 text-sm font-medium  flex flex-row items-center",
        {
          "bg-neutral-300 cursor-not-allowed!": disabled,
          "hover:bg-neutral-300": !disabled,
        },
      )}
    >
      {children}
    </button>
  );
}
