import React, { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import useCompilerStore from "../lib/compilerStore";
import CodeEditor from "../components/CodeEditor";
import RenderCode from "../components/RenderCode";
import { Select } from "../components/ui/select";
import useUserStore from "../lib/userStore";
import wsService from "../lib/websocketService";

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
  const [isConnected, setIsConnected] = useState(false);
  const [activeUsers, setActiveUsers] = useState(1);
  const updateTimeoutRef = useRef(null);
  const isRemoteUpdateRef = useRef(false);

  useEffect(() => {
    if (!id) return;

    setCollabLoading(true);
    setCollabError("");

    const handleMessage = (data) => {
      console.log('Received WebSocket message:', data.type);
      
      switch (data.type) {
        case 'sync':
          isRemoteUpdateRef.current = true;
          setFullCode(data.code);
          setCollabLoading(false);
          console.log('Synced with session:', data.code);
          break;

        case 'code-update':
          console.log('Code update from another client');
          isRemoteUpdateRef.current = true;
          setFullCode(data.code);
          break;

        case 'user-joined':
          setActiveUsers(data.totalClients);
          console.log('User joined, total clients:', data.totalClients);
          break;

        case 'user-left':
          setActiveUsers(data.totalClients);
          console.log('User left, total clients:', data.totalClients);
          break;

        case 'error':
          setCollabError(data.message);
          setCollabLoading(false);
          break;

        default:
          console.log('Unknown message type:', data.type);
      }
    };

    const handleError = (error) => {
      console.error('WebSocket error:', error);
      setCollabError('Connection error. Retrying...');
    };

    const handleConnect = () => {
      setIsConnected(true);
      setCollabError("");
      console.log('Connected to collaboration session');
    };

    wsService.connect(id, handleMessage, handleError, handleConnect);

    return () => {
      wsService.disconnect();
      setIsConnected(false);
    };
  }, [id, setFullCode]);

  useEffect(() => {
    if (!id || !isConnected) {
      console.log('Skipping code update:', { id, isConnected });
      return;
    }
    
    if (isRemoteUpdateRef.current) {
      console.log('Skipping local update (was remote update)');
      isRemoteUpdateRef.current = false;
      return;
    }

    console.log('Scheduling code update to send...');
    
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }

    updateTimeoutRef.current = setTimeout(() => {
      console.log('Sending code update via WebSocket:', fullCode);
      wsService.sendCodeUpdate(fullCode);
    }, 300);

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [id, isConnected, fullCode]);

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to save code.");
      return;
    }
    
    try {
      const sessionId = Math.random().toString(36).substring(2, 15) + 
                        Math.random().toString(36).substring(2, 15);
      
      const apiUrl = import.meta.env.VITE_WS_URL?.replace('ws://', 'http://').replace('wss://', 'https://') || 'http://localhost:8080';
      
      const response = await fetch(`${apiUrl}/session/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          code: fullCode,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create session');
      }

      setShareId(sessionId);
      setShowLinks(true);
    } catch (err) {
      console.error('Error saving code:', err);
      alert("Error saving code: " + err.message);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(window.location.origin + text);
  };

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
            Connecting to collaboration session...
          </div>
        )}
        {id && isConnected && (
          <div className="text-green-400 text-center mb-2 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Connected • {activeUsers} {activeUsers === 1 ? 'user' : 'users'} online
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
