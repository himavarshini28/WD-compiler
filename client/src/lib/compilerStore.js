import { create } from 'zustand';

const useCompilerStore = create((set) => ({
  currentLanguage: 'html',
  fullCode: {
    html: `<!-- Default HTML -->\n<div class='container'>\n  <h1>Hello, World!</h1>\n  <p>Welcome to WD Compiler</p>\n  <button class='btn'>Click me</button>\n</div>`,
    css: `/* Default CSS */\n.container {\n  max-width: 600px;\n  margin: 0 auto;\n}\n.btn {\n  background: #4f46e5;\n  color: white;\n  padding: 8px 16px;\n  border-radius: 4px;\n}`,
    javascript: `// Default JavaScript\ndocument.querySelector('.btn')\n  .addEventListener('click', () => {\n    alert('Hello from WD Compiler!');\n    document.querySelector('h1').style.color = '#4f46e5';\n  });`,
  },
  updateCode: (value) => set((state) => ({
    fullCode: {
      ...state.fullCode,
      [state.currentLanguage]: value,
    },
  })),
  setLanguage: (lang) => set(() => ({
    currentLanguage: lang,
  })),
  setFullCode: (codeObj) => set(() => ({
    fullCode: codeObj,
  })),
}));

export default useCompilerStore;
