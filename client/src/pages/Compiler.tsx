import CodeEditor from "@/components/CodeEditor"
import HelperHeader from "@/components/HelperHeader"
import RenderCode from "@/components/RenderCode"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"



const Compiler = () => {
  return (
    <ResizablePanelGroup direction="horizontal">
  <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={50}>
  <div className="sticky top-0 z-10 bg-gray-200">
          <HelperHeader />
        </div>
    <CodeEditor/>
    </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px]" defaultSize={50}><RenderCode/></ResizablePanel>
</ResizablePanelGroup>

  )
}

export default Compiler
