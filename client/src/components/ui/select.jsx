import React from "react";

export const Select = ({ options, value, onChange, className = "" }) => (
  <select value={value} onChange={onChange} className={`bg-gray-800 text-white p-2 rounded ${className}`}>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);
