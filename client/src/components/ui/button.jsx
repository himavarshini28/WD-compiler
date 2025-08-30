import React from "react";

export const Button = ({ children, className = "", variant = "primary", size = "md", ...props }) => {
  const base = "px-4 py-2 rounded font-semibold transition-all focus:outline-none ";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-700 text-white hover:bg-gray-800",
    outline: "border border-gray-700 text-white hover:bg-gray-800",
  };
  const sizes = {
    md: "text-base",
    lg: "text-lg px-6 py-3",
  };
  return (
    <button className={`${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`} {...props}>
      {children}
    </button>
  );
};
