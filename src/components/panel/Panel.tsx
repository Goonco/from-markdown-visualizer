import type { ReactNode } from "react";
import type { IconType } from "react-icons/lib";
import type { AppState } from "@/hooks";

export function Panel({
  title,
  Icon,
  children,
}: {
  title: string;
  Icon: IconType;
  children: ReactNode;
}) {
  return (
    <div className="relative size-full bg-white divide-y divide-neutral-300 flex flex-col">
      <div className="w-full flex flex-row items-center gap-1.5 px-2 py-1 bg-gray-100">
        <Icon />
        <span className="text-sm">{title}</span>
      </div>
      <div className="flex-1 overflow-auto min-h-0">{children}</div>
    </div>
  );
}

export function StateWrapper<T extends AppState["status"]>({
  state,
  disableStatus,
  children,
}: {
  state: AppState;
  disableStatus: T[];
  children: (safeState: Exclude<AppState, { status: T }>) => ReactNode;
}) {
  // state.status 타입이 배열 타입보다 넓어서 TS 에러가 날 수 있으므로 잠시 타입 단언을 해줍니다.
  if ((disableStatus as AppState["status"][]).includes(state.status)) {
    return (
      <div className="size-full">
        <p className="w-full text-center pt-4 text-neutral-400 font-light">
          Disabled
        </p>
      </div>
    );
  }

  // 여기 도달했다면 disableStatus에 해당하는 상태가 아님이 확실하므로 안전하게 전달!
  return children(state as Exclude<AppState, { status: T }>);
}
