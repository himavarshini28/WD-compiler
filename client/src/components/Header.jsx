import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav className="fixed top-0 left-0 w-full h-16 bg-black flex items-center justify-between px-8 shadow-lg border-b" style={{ borderColor: '#CFFFE2' }}>
    <Link to="/" className="text-[##CFFFE2] text-2xl font-bold tracking-wide hover:text-[#CFFFE2] transition-colors" style={{ color: '#CFFFE2' }}>WD Compiler</Link>
    <div className="flex gap-6">
      <Link to="/login" className="font-semibold hover:text-[#CFFFE2] transition-colors" style={{ color: '#CFFFE2' }}>Login</Link>
      <Link to="/signup" className="font-semibold hover:text-[#CFFFE2] transition-colors" style={{ color: '#CFFFE2' }}>Sign Up</Link>
      <Link to="/compiler" className="font-semibold hover:text-[#CFFFE2] transition-colors" style={{ color: '#CFFFE2' }}>Compiler</Link>
    </div>
  </nav>
);

export default Header;
