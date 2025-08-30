import React from "react";
import useCompilerStore from "../lib/compilerStore";
import CodeEditor from "../components/CodeEditor";
import RenderCode from "../components/RenderCode";
import { Select } from "../components/ui/select";

const languageOptions = [
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "javascript", label: "JavaScript" },
];

const Compiler = () => {
  const currentLanguage = useCompilerStore((state) => state.currentLanguage);
  const setLanguage = useCompilerStore((state) => state.setLanguage);
  const fullCode = useCompilerStore((state) => state.fullCode);

  // Combine code for live preview
  const srcDoc = `
    <html>
      <head>
        <style>${fullCode.css}</style>
      </head>
      <body>
        ${fullCode.html}
        <script>${fullCode.javascript}<\/script>
      </body>
    </html>
  `;

  return (
    <div className="w-full h-[calc(100vh-60px)] flex flex-col lg:flex-row gap-4 p-4 bg-black">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <Select
            options={languageOptions}
            value={currentLanguage}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-32 border"
            style={{
              borderColor: "#CFFFE2",
              color: "#CFFFE2",
              background: "black",
            }}
          />
          <span style={{ color: "#CFFFE2" }}>Select Language</span>
        </div>
        <div
          className="flex-1 rounded-lg overflow-hidden shadow-lg"
          style={{ border: "1px solid #CFFFE2" }}
        >
          <CodeEditor />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div
          className="font-bold text-lg mb-2"
          style={{ color: "#CFFFE2" }}
        >
          Live Preview
        </div>
        <div
          className="flex-1 rounded-lg overflow-hidden shadow-lg bg-black"
          style={{ border: "1px solid #CFFFE2" }}
        >
          <RenderCode code={srcDoc} />
        </div>
      </div>
    </div>
  );
};

export default Compiler;
