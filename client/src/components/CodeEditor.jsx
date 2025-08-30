import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { tags as t } from "@lezer/highlight";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import useCompilerStore from "../lib/compilerStore";

const CodeEditor = () => {
  const currentLanguage = useCompilerStore((state) => state.currentLanguage);
  const fullCode = useCompilerStore((state) => state.fullCode);
  const updateCode = useCompilerStore((state) => state.updateCode);

  const onChange = React.useCallback(
    (value) => {
      updateCode(value);
    },
    [updateCode]
  );

  return (
    <CodeMirror
      value={fullCode[currentLanguage]}
      height="calc(100vh - 60px - 50px)"
      extensions={[loadLanguage(currentLanguage)]}
      onChange={onChange}
      theme={draculaInit({
        settings: {
          caret: "#c6c6c6",
          fontFamily: "monospace",
        },
        styles: [{ tag: t.comment, color: "#6272a4" }],
      })}
    />
  );
};

export default CodeEditor;
