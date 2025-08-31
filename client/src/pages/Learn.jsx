import React from "react";

const Learn = () => (
  <div className="min-h-screen flex flex-col items-center bg-gray-950 pt-20">
    <div className="w-full max-w-3xl bg-gray-900 rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
      <h2 className="text-4xl  text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600">
  <span className="text-white">Welcome to </span>
  WD Compiler
</h2>

      <div className="text-white text-lg leading-relaxed">
        <h3 className="text-2xl font-bold text-blue-400 mb-4">Features Overview</h3>
        <ul className="list-disc pl-6 mb-6">
          <li><span className="font-bold text-purple-400">Live Code Editor:</span> Write HTML, CSS, and JavaScript with instant preview. Switch languages using the dropdown.</li>
          <li><span className="font-bold text-purple-400">Save & Share:</span> Save your code and get a shareable link. Others can view your code in a read-only preview.</li>
          <li><span className="font-bold text-purple-400">Real-Time Collaboration:</span> Use collaborative links to edit code together in real time. Changes sync instantly across all users.</li>
          <li><span className="font-bold text-purple-400">Profile Dashboard:</span> View all your saved snippets and your email in your personal dashboard. Easily manage your code.</li>
          <li><span className="font-bold text-purple-400">Authentication:</span> Secure login and signup with Firebase. Your code is saved to your account.</li>
          <li><span className="font-bold text-purple-400">Modern UI:</span> Enjoy a beautiful, responsive interface with dark mode and smooth animations.</li>
        </ul>
        <h3 className="text-xl font-bold text-blue-400 mb-2">How to Use</h3>
        <ol className="list-decimal pl-6 mb-6">
          <li>Go to the <span className="text-blue-400">Compiler</span> page and start coding.</li>
          <li>Use the <span className="text-blue-400">Save</span> button to save your work and get a shareable/collaborative link.</li>
          <li>Access your <span className="text-blue-400">Profile</span> to view all your saved snippets.</li>
          <li>Share collaborative links for real-time editing with friends or teammates.</li>
          <li>Use the <span className="text-blue-400">Learn More</span> page to explore all features and tips.</li>
        </ol>
        <h3 className="text-xl font-bold text-blue-400 mb-2">Tips & Support</h3>
        <ul className="list-disc pl-6">
          <li>Make sure you are logged in to save and collaborate.</li>
          <li>Use the Profile page to organize and review your work.</li>
          <li>For any issues, check your internet connection and login status.</li>
        </ul>
      </div>
    </div>
  </div>
);

export default Learn;
