import {
  Header,
  Toolbar,
  EventPanel,
  StackPanel,
  TreePanel,
  MarkdownPanel,
} from "@components";
import { useGenerator } from "@hooks";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@ui/resizable";

function App() {
  const { md, handleMdChange, state, handleStart, handleNext, handleStop } =
    useGenerator();

  return (
    <div className="w-dvw h-dvh flex flex-col mx-auto px-12">
      <Header />
      <div className="flex-1 w-full flex flex-col">
        <Toolbar
          status={state.status}
          handleStart={handleStart}
          handleNext={handleNext}
          handleStop={handleStop}
        />

        <ResizablePanelGroup
          orientation="horizontal"
          className="flex-1 w-full my-3 border border-neutral-300 rounded-md overflow-hidden"
        >
          <ResizablePanel>
            <ResizablePanelGroup orientation="vertical">
              <ResizablePanel
                defaultSize={0.3}
                children={
                  <MarkdownPanel
                    state={state}
                    md={md}
                    handleMdChange={handleMdChange}
                  />
                }
              />
              <ResizableHandle withHandle />
              <ResizablePanel
                defaultSize={0.7}
                children={<EventPanel state={state} />}
              />
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel children={<StackPanel state={state} />} />
          <ResizableHandle withHandle />
          <ResizablePanel children={<TreePanel state={state} />} />
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

export default App;
