import React, { useState } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center" style={{ color: '#CFFFE2' }}>Sign Up</h2>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="px-4 py-3 rounded bg-black border focus:outline-none focus:ring-2 transition"
          style={{ color: '#CFFFE2', borderColor: '#CFFFE2' }}
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="px-4 py-3 rounded bg-black border focus:outline-none focus:ring-2 transition"
          style={{ color: '#CFFFE2', borderColor: '#CFFFE2' }}
        />
        {error && <div className="text-center" style={{ color: '#CFFFE2' }}>{error}</div>}
        <button
          className="font-bold py-2 rounded transition"
          style={{ background: '#CFFFE2', color: 'black' }}
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;