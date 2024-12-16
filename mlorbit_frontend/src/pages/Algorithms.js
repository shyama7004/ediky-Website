import React, { useState, useEffect, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import "./Algorithms.css";

// Constants
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL; // Updated backend URL
const SUPPORTED_LANGUAGES = {
  python: {
    name: "Python",
    extension: "py",
    template: `# Python Example\nprint("Hello, World!")`,
  },
  cpp: {
    name: "C++",
    extension: "cpp",
    template: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!\\n";\n    return 0;\n}`,
  },
  java: {
    name: "Java",
    extension: "java",
    template: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  },
};

function Algorithms() {
  // State Management
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("Idle");
  const [autoRun, setAutoRun] = useState(false);
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [argumentsInput, setArgumentsInput] = useState("");

  const autoRunTimer = useRef(null);

  // Load code from localStorage or use template when language changes
  useEffect(() => {
    const savedCode = localStorage.getItem(`code_${language}`);
    setCode(savedCode || SUPPORTED_LANGUAGES[language].template);
  }, [language]);

  // Save code to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(`code_${language}`, code);
  }, [code, language]);

  // Run Code Function
  const runCode = useCallback(async () => {
    setStatus("Running");
    setOutput("Executing your code...");
    try {
      const response = await axios.post(BACKEND_URL, {
        code,
        language,
        arguments: argumentsInput.trim(),
      });
      setOutput(response.data.output || "Code executed successfully with no output.");
      setStatus("Success");
    } catch (error) {
      const errorMsg =
        error.response?.data?.output ||
        error.message ||
        "An unexpected error occurred.";
      setOutput(`Error: ${errorMsg}`);
      setStatus("Error");
    }
  }, [code, language, argumentsInput]);

  // Clear Output Function
  const clearOutput = () => {
    setOutput("");
    setStatus("Idle");
  };

  // Download Code Function
  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const extension = SUPPORTED_LANGUAGES[language].extension;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `code.${extension}`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Auto-Run Effect with Debounce
  useEffect(() => {
    if (autoRun) {
      if (autoRunTimer.current) {
        clearTimeout(autoRunTimer.current);
      }
      autoRunTimer.current = setTimeout(() => {
        runCode();
      }, 1000);
      return () => clearTimeout(autoRunTimer.current);
    }
  }, [code, autoRun, runCode]);

  // Handle Theme Toggle
  const toggleTheme = () => {
    setEditorTheme((prevTheme) => (prevTheme === "vs-dark" ? "vs-light" : "vs-dark"));
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Online Code Runner</h1>
        <div className="control-panel">
          {/* Language Selector */}
          <select
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
            aria-label="Select Programming Language"
          >
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>

          {/* Arguments Input */}
          <input
            type="text"
            placeholder="Arguments (optional)"
            value={argumentsInput}
            onChange={(e) => setArgumentsInput(e.target.value)}
            aria-label="Input Arguments"
          />

          {/* Run Code Button */}
          <button onClick={runCode} disabled={status === "Running"} aria-label="Run Code">
            {status === "Running" ? <span className="spinner" /> : "Run Code"}
          </button>

          {/* Clear Output Button */}
          <button onClick={clearOutput} aria-label="Clear Output">
            Clear Output
          </button>

          {/* Download Code Button */}
          <button onClick={downloadCode} aria-label="Download Code">
            Download Code
          </button>

          {/* Auto-Run Toggle */}
          <div className="toggle-container">
            <label>
              Auto-Run
              <input
                type="checkbox"
                checked={autoRun}
                onChange={(e) => setAutoRun(e.target.checked)}
                aria-label="Toggle Auto-Run"
              />
            </label>
          </div>

          {/* Theme Toggle */}
          <div className="toggle-container">
            <label>
              Theme
              <input
                type="checkbox"
                checked={editorTheme === "vs-dark"}
                onChange={toggleTheme}
                aria-label="Toggle Editor Theme"
              />
            </label>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-container">
        {/* Editor */}
        <div className="editor-section">
          <Editor
            height="100%"
            theme={editorTheme}
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              wordWrap: "on",
              automaticLayout: true,
            }}
          />
        </div>

        {/* Output */}
        <div className="output-section">
          <h2>Console</h2>
          <div className="terminal" role="log" aria-live="polite">
            <pre>{output}</pre>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <div>Language: {SUPPORTED_LANGUAGES[language].name}</div>
        <div>Status: {status}</div>
      </div>
    </div>
  );
}

export default Algorithms;
