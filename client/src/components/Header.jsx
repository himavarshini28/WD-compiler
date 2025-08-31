import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../lib/userStore";
import { auth } from "../lib/firebase";

const Header = () => {
  const user = useUserStore((state) => state.user);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full h-16 flex items-center bg-gray-950 justify-between px-8 shadow-lg border border-gray-800 ">
      <Link to="/" className="text-2xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600  transition-colors">WD Compiler</Link>
      <div className="flex gap-6 items-center">

        <Link to="/compiler" className="text-white font-semibold hover:text-blue-400 transition-colors">Compiler</Link>
        <Link to="/learn" className="text-white font-semibold hover:text-blue-400 transition-colors">Learn More</Link>
        {user ? (
          <>
            <button
              className="text-white font-semibold border border-white  p-2  rounded-lg hover:text-blue-400 transition-colors"
              onClick={() => auth.signOut()}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white  border border-white font-semibold hover:text-blue-400 rounded-lg transition-colors">Login</Link>
            <Link to="/signup" className="text-white border border-white rounded-lg font-semibold hover:text-blue-400 transition-colors">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
