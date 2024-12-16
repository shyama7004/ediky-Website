import React, { useState, useEffect, useRef, useCallback } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import "./Algorithms.css";

// Constants: Use environment variable for production, fallback for local testing
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://mlorbit-backend.onrender.com/execute";

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
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("Idle");
  const [autoRun, setAutoRun] = useState(false);
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [argumentsInput, setArgumentsInput] = useState("");

  const autoRunTimer = useRef(null);

  useEffect(() => {
    const savedCode = localStorage.getItem(`code_${language}`);
    setCode(savedCode || SUPPORTED_LANGUAGES[language].template);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(`code_${language}`, code);
  }, [code, language]);

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

  const clearOutput = () => {
    setOutput("");
    setStatus("Idle");
  };

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

  const toggleTheme = () => {
    setEditorTheme((prevTheme) => (prevTheme === "vs-dark" ? "vs-light" : "vs-dark"));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Online Code Runner</h1>
        <div className="control-panel">
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
          <input
            type="text"
            placeholder="Arguments (optional)"
            value={argumentsInput}
            onChange={(e) => setArgumentsInput(e.target.value)}
          />
          <button onClick={runCode} disabled={status === "Running"}>
            {status === "Running" ? <span className="spinner" /> : "Run Code"}
          </button>
          <button onClick={clearOutput}>Clear Output</button>
          <button onClick={downloadCode}>Download Code</button>
          <label>
            Auto-Run
            <input
              type="checkbox"
              checked={autoRun}
              onChange={(e) => setAutoRun(e.target.checked)}
            />
          </label>
          <label>
            Theme
            <input
              type="checkbox"
              checked={editorTheme === "vs-dark"}
              onChange={toggleTheme}
            />
          </label>
        </div>
      </header>
      <div className="main-container">
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
        <div className="output-section">
          <h2>Console</h2>
          <div className="terminal" role="log">
            <pre>{output}</pre>
          </div>
        </div>
      </div>
      <div className="status-bar">
        <div>Language: {SUPPORTED_LANGUAGES[language].name}</div>
        <div>Status: {status}</div>
      </div>
    </div>
  );
}

export default Algorithms;
