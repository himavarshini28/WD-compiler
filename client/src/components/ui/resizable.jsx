import React, { useRef } from "react";

export const Resizable = ({ children, className = "" }) => {
  const ref = useRef(null);
  // Add resizable logic if needed
  return (
    <div ref={ref} className={`resize-x overflow-auto ${className}`}>{children}</div>
  );
};
