import { useEffect, useRef, useId } from "react";
import mermaid from "mermaid";

// 초기 설정은 컴포넌트 밖에서 한 번만 실행
mermaid.initialize({
  startOnLoad: false,
  theme: "neutral", // 'default', 'forest', 'dark', 'neutral' 중 선택 가능
  securityLevel: "loose",
});

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, ""); // 머메이드는 ID에 콜론(:)이 들어가면 에러나서 제거

  useEffect(() => {
    if (ref.current && chart) {
      // 1. 기존 내용 비우기
      ref.current.innerHTML = "";

      // 2. 문자열을 SVG로 렌더링
      mermaid
        .render(`mermaid-${id}`, chart)
        .then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        })
        .catch((err) => {
          console.error("Mermaid 렌더링 에러:", err);
        });
    }
  }, [chart, id]);

  return (
    <div
      ref={ref}
      className="flex justify-center p-4 bg-white overflow-auto"
      // 스타일은 취향껏 조정하세요
    />
  );
}
