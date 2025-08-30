import React from "react";

const RenderCode = ({ code }) => {
  return (
    <iframe
      title="Live Preview"
      srcDoc={code}
      sandbox="allow-scripts"
      className="w-full h-full border-none rounded"
    />
  );
};

export default RenderCode;
