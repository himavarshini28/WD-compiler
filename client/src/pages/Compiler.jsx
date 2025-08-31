import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import useCompilerStore from "../lib/compilerStore";
import CodeEditor from "../components/CodeEditor";
import RenderCode from "../components/RenderCode";
import { Select } from "../components/ui/select";
import { db } from "../lib/firebase";
import { collection, addDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import useUserStore from "../lib/userStore";

const languageOptions = [
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "javascript", label: "JavaScript" },
];

const Compiler = () => {
  const { id } = useParams();
  const user = useUserStore((state) => state.user);
  const currentLanguage = useCompilerStore((state) => state.currentLanguage);
  const setLanguage = useCompilerStore((state) => state.setLanguage);
  const fullCode = useCompilerStore((state) => state.fullCode);
  const setFullCode = useCompilerStore((state) => state.setFullCode);

  const [showLinks, setShowLinks] = useState(false);
  const [shareId, setShareId] = useState("");
  const [collabLoading, setCollabLoading] = useState(false);
  const [collabError, setCollabError] = useState("");

  // Real-time collaboration listener
  useEffect(() => {
    if (!id) return;
    setCollabLoading(true);
    setCollabError("");
    const docRef = doc(db, "snippets", id);
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFullCode({
            html: data.html || "",
            css: data.css || "",
            javascript: data.javascript || "",
          });
          setCollabLoading(false);
        } else {
          setCollabError("Collaboration snippet not found.");
          setCollabLoading(false);
        }
      },
      (error) => {
        setCollabError("Error loading collaboration: " + error.message);
        setCollabLoading(false);
      }
    );
    return () => unsubscribe();
  }, [id, setFullCode]);

  // Update Firestore when code changes (only if collaborating)
  useEffect(() => {
    if (!id || !user) return;
    const docRef = doc(db, "snippets", id);
    const timeout = setTimeout(() => {
      updateDoc(docRef, {
        html: fullCode.html,
        css: fullCode.css,
        javascript: fullCode.javascript,
      }).catch((err) => {
        setCollabError("Error updating collaboration: " + err.message);
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [id, user, fullCode]);

  // Save snippet globally only (profile functionality removed)
  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to save code.");
      return;
    }
    try {
      // Save to global "snippets" only
      const docRef = await addDoc(collection(db, "snippets"), {
        html: fullCode.html,
        css: fullCode.css,
        javascript: fullCode.javascript,
        owner: user.uid,
        collaborators: [user.uid],
        createdAt: new Date(),
      });

      setShareId(docRef.id);
      setShowLinks(true);
    } catch (err) {
      alert("Error saving code: " + err.message);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(window.location.origin + text);
  };

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
    <div
      className="w-full min-h-screen flex flex-col lg:flex-row gap-4 p-4 bg-gray-950"
      style={{ marginTop: "64px" }}
    >
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <Select
            options={languageOptions}
            value={currentLanguage}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-32 border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-400"
          />
          {!id && (
            <button
              className="border border-white text-white py-2 px-4 rounded-lg shadow hover:scale-105 transition-transform"
              onClick={handleSave}
            >
              Save
            </button>
          )}
        </div>



        {showLinks && (
          <div className="bg-gray-800 border border-blue-400 rounded-lg p-4 mb-4 text-white flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span>Shareable Link:</span>
              <span className="bg-gray-700 px-2 py-1 rounded text-blue-300 text-xs">
                /share/{shareId}
              </span>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
                onClick={() => handleCopy(`/share/${shareId}`)}
              >
                Copy
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span>Collaborative Link:</span>
              <span className="bg-gray-700 px-2 py-1 rounded text-purple-300 text-xs">
                /compiler/{shareId}
              </span>
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded text-xs"
                onClick={() => handleCopy(`/compiler/${shareId}`)}
              >
                Copy
              </button>
            </div>
          </div>
        )}

        {id && collabLoading && (
          <div className="text-blue-400 text-center mb-2">
            Loading collaborative code...
          </div>
        )}
        {id && collabError && (
          <div className="text-red-400 text-center border border-red-500 bg-gray-800 rounded p-2 mb-2">
            {collabError}
          </div>
        )}

        <div className="flex-1 rounded-lg overflow-hidden shadow-lg bg-gray-900 border border-gray-700">
          <CodeEditor />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="font-bold text-2xl px-3 mt-2 mb-3 text-white">
          Live Preview
        </div>
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg bg-white border border-gray-700">
          <RenderCode code={srcDoc} />
        </div>
      </div>
    </div>
  );
};

export default Compiler;
