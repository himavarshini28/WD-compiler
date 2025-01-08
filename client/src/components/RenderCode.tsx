import { useSelector } from "react-redux"
import { RootState } from "./redux/store"

const RenderCode = () => {
    const fullCode = useSelector((state:RootState)=>state.compilerSlice.fullCode)
    const CombinedCode = `<html><style>${fullCode.css}</style><body>${fullCode.html}</body><script>${fullCode.javascript}</script></html>`
    const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
        CombinedCode
      )}`;
    
      return (
        <div className="bg-white h-full sm:h-[calc(100dvh-60px)]">
          <iframe
            title="rendered-code"
            className="w-full h-full"
            src={iframeCode}
          />
        </div>
  )
}

export default RenderCode



