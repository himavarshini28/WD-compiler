import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RenderCode from "../components/RenderCode";


const languageOptions = [
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "javascript", label: "JavaScript" },
];

const Share = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("html");

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const apiUrl = import.meta.env.VITE_WS_URL?.replace('ws://', 'http://').replace('wss://', 'https://') || 'http://localhost:8080';
        
        const response = await fetch(`${apiUrl}/session/${id}`);
        const data = await response.json();
        
        if (data.exists && data.code) {
          setSnippet(data.code);
        } else {
          setError("Snippet not found or session expired.");
        }
      } catch (err) {
        console.error('Error fetching snippet:', err);
        setError("Failed to load snippet. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchSnippet();
    }
  }, [id]);

  if (loading) return <div className="text-white text-center mt-16">Loading...</div>;
  if (error) return <div className="text-red-400 text-center mt-16 border border-red-500 bg-gray-800 rounded p-4 max-w-md mx-auto">{error}</div>;
  if (!snippet) return <div className="text-white text-center mt-16">Snippet not found.</div>;

  const srcDoc = `
    <html>
      <head>
        <style>${snippet.css}</style>
      </head>
      <body>
        ${snippet.html}
        <script>${snippet.javascript}<\/script>
      </body>
    </html>
  `;

  const getCode = () => {
    if (!snippet) return "";
    if (currentLanguage === "html") return snippet.html || "";
    if (currentLanguage === "css") return snippet.css || "";
    if (currentLanguage === "javascript") return snippet.javascript || "";
    return "";
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row gap-4 p-4 bg-gradient-to-br from-gray-900 to-gray-950" style={{ marginTop: '64px' }}>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <select
            value={currentLanguage}
            onChange={e => setCurrentLanguage(e.target.value)}
            className="w-32 border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-blue-400 rounded-lg px-2 py-1"
          >
            {languageOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg bg-gray-900 border border-gray-700">
          <pre className="w-full h-full text-sm text-white p-4 font-mono whitespace-pre-wrap overflow-auto select-none">
            {getCode()}
          </pre>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="font-bold text-lg mb-2 text-blue-400">Live Preview</div>
        <div className="flex-1 rounded-lg overflow-hidden shadow-lg bg-white border border-gray-700">
          <RenderCode code={srcDoc} />
        </div>
      </div>
    </div>
  );
};

export default Share;