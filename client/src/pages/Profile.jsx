import React, { useEffect, useState } from "react";
import useUserStore from "../lib/userStore";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const Profile = () => {
  const user = useUserStore((state) => state.user);
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      if (!user) return;
      const snap = await getDocs(collection(db, `users/${user.uid}/snippets`));
      setSnippets(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchSnippets();
  }, [user]);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-white">Please login to view your profile.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 to-gray-950 pt-20">
      <div className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600">Profile Dashboard</h2>
        <div className="text-white text-center mb-4">Email: <span className="font-bold text-blue-400">{user.email}</span></div>
        <h3 className="text-xl font-bold text-blue-400 mb-2">Your Saved Snippets</h3>
        {loading ? (
          <div className="text-white text-center">Loading...</div>
        ) : snippets.length === 0 ? (
          <div className="text-white text-center">No snippets saved yet.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {snippets.map(snippet => (
              <div key={snippet.id} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="text-blue-300 font-bold mb-2">Snippet ID: {snippet.id}</div>
                <div className="flex gap-4">
                  <pre className="flex-1 text-xs text-white bg-gray-900 p-2 rounded overflow-auto max-h-32">{snippet.html}</pre>
                  <pre className="flex-1 text-xs text-green-300 bg-gray-900 p-2 rounded overflow-auto max-h-32">{snippet.css}</pre>
                  <pre className="flex-1 text-xs text-yellow-300 bg-gray-900 p-2 rounded overflow-auto max-h-32">{snippet.javascript}</pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
