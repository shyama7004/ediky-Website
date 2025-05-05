import React, { useState, useEffect, useCallback, useRef } from 'react';
import Editor from '@monaco-editor/react'; // monaco editor for code editing
import './CodePlayground.css';

// default starter code shown in editor
const DEFAULT_CODE = `# Python ML example:
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier

# Your code here
`;

// helper: for .ipynb files, parse JSON and combine code cells into a single string
function extractNotebookCode(name, content) {
    if (!name.endsWith('.ipynb')) return content;
    try {
        const nb = JSON.parse(content);
        return nb.cells
            .filter(c => c.cell_type === 'code')
            .flatMap(c => c.source)
            .join('');
    } catch {
        return ''; // return empty if JSON parsing fails
    }
}

export default function CodePlayground() {
    // UI state
    const [showRunner, setShowRunner] = useState(false);
    const [files, setFiles] = useState([{ name: 'playground.py', code: DEFAULT_CODE }]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [pos, setPos] = useState({ x: 100, y: 100 }); // position of draggable runner
    const [dragOffset, setDragOffset] = useState(null);

    // pyodide setup
    const [pyodide, setPyodide] = useState(null);
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [terminals, setTerminals] = useState([]); // holds terminal state
    const outputRef = useRef(null); // to scroll output into view if needed

    // initialize pyodide and install necessary packages
    const initPyodide = useCallback(async () => {
        setLoading(true); setError(''); setOutput('Loading Pyodide…');
        try {
            const m = await import('https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.mjs');
            const py = await m.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/' });
            await py.loadPackage(['numpy', 'scipy', 'scikit-learn', 'pandas', 'micropip']);
            setPyodide(py); setOutput('');
        } catch (e) {
            setError(e.message);
        } finally { setLoading(false); }
    }, []);
    useEffect(() => { initPyodide(); }, [initPyodide]);

    // helper to detect if output contains HTML content
    const isHTML = str => /<(img|canvas)/.test(str);

    // run code (either .py or .ipynb)
    const runCode = async () => {
        if (!pyodide) return setError('⚠️ Pyodide still loading…');
        setLoading(true); setError(''); setOutput('');
        const { name, code: raw } = files[activeIdx];
        const fullCode = extractNotebookCode(name, raw);

        // wrap output so we can capture print() as a return string
        const wrapped = `import sys
from io import StringIO
_buf = StringIO()
_old = sys.stdout
sys.stdout = _buf
try:
${fullCode.split('\n').map(l => '    ' + l).join('\n')}
finally:
    sys.stdout = _old
_buf.getvalue()`;

        try {
            await pyodide.loadPackagesFromImports(fullCode);
            const res = await pyodide.runPythonAsync(wrapped);
            setOutput(res);
        } catch (e) {
            setError(e.toString());
        } finally {
            setLoading(false);
        }
    };

    const clearOutput = () => { setOutput(''); setError(''); };

    // create a new file (either .py or .ipynb based on existing ones)
    const addFile = () => {
        const defaultName = files.length === 0 ? 'playground.py' : `file${files.length + 1}${files.some(f => f.name.endsWith('.ipynb')) ? '.ipynb' : '.py'}`;
        const name = window.prompt('File name:', defaultName);
        if (!name) return;
        setFiles(f => [...f, { name, code: name.endsWith('.ipynb') ? '{"cells":[]}' : '' }]);
        setActiveIdx(files.length);
    };

    // remove file tab (but never allow removing the last one)
    const removeFile = idx => {
        if (files.length === 1) return;
        setFiles(f => f.filter((_, i) => i !== idx));
        setActiveIdx(ai => {
            if (idx === ai) return 0;
            if (idx < ai) return ai - 1;
            return ai;
        });
    };

    // add new terminal (limit to 3)
    const addTerminal = () => {
        if (terminals.length >= 3) return;
        const id = Date.now();
        setTerminals(ts => [...ts, { id, input: '', output: '' }]);
    };

    // remove terminal window
    const removeTerminal = id =>
        setTerminals(ts => ts.filter(t => t.id !== id));

    // update code typed into terminal input
    const updateTerminalInput = (id, val) =>
        setTerminals(ts => ts.map(t => t.id === id ? { ...t, input: val } : t));

    // run code from terminal input
    const runTerminal = async id => {
        const term = terminals.find(t => t.id === id);
        if (!pyodide) return;
        try {
            const res = await pyodide.runPythonAsync(term.input);
            setTerminals(ts => ts.map(t => t.id === id ? { ...t, output: res } : t));
        } catch (e) {
            setTerminals(ts => ts.map(t => t.id === id ? { ...t, output: e.toString() } : t));
        }
    };

    // download current code as a file
    const downloadCode = () => {
        const { name, code } = files[activeIdx];
        const blob = new Blob([code], { type: 'application/octet-stream' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = name;
        a.click();
    };

    // handle dragging logic for repositioning playground
    useEffect(() => {
        const mv = e => {
            if (!dragOffset) return;
            setPos({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
        };
        const up = () => setDragOffset(null);
        window.addEventListener('mousemove', mv);
        window.addEventListener('mouseup', up);
        return () => {
            window.removeEventListener('mousemove', mv);
            window.removeEventListener('mouseup', up);
        };
    }, [dragOffset]);

    // toggle minimized state
    const toggleRunner = () => setShowRunner(v => !v);

    // UI render
    return (
        <>
            {!showRunner && (
                <div className="cp-minimized-pill" onClick={toggleRunner}>Runner</div>
            )}
            {showRunner && (
                <>
                    <div className="cp-minimized-pill" onClick={toggleRunner}>Runner</div>
                    <div className="playground" style={{ top: pos.y, left: pos.x }}>
                        {/* draggable code editor header */}
                        <div className="vs-code-header"
                            onMouseDown={e => setDragOffset({ x: e.clientX - pos.x, y: e.clientY - pos.y })}
                        >
                            {/* tab bar with file names */}
                            <div className="vs-tabs">
                                {files.map((f, i) => (
                                    <span
                                        key={i}
                                        className={`vs-tab ${i === activeIdx ? 'active' : ''}`}
                                        onClick={() => setActiveIdx(i)}
                                    >
                                        {f.name}
                                        {files.length > 1 && (
                                            <button
                                                className="tab-close-btn"
                                                onClick={e => { e.stopPropagation(); removeFile(i); }}
                                                title="Close"
                                            >
                                                ×
                                            </button>
                                        )}
                                    </span>
                                ))}
                                <span className="vs-tab add-tab" onClick={addFile}>＋</span>
                            </div>
                            <button className="cp-btn-minimize" onClick={toggleRunner}>―</button>
                        </div>

                        {/* control buttons */}
                        <div className="cp-controls">
                            <button className="cp-btn cp-btn-run" onClick={runCode} disabled={loading}>
                                {loading ? '…' : 'Run ▶'}
                            </button>
                            <button className="cp-btn" onClick={clearOutput}>Clear</button>
                            <button className="cp-btn add-term" onClick={addTerminal} disabled={terminals.length >= 3}>
                                + Terminal
                            </button>
                            <button className="cp-btn" onClick={downloadCode}>Save Code</button>
                        </div>

                        {/* editor */}
                        <div className="cp-editor">
                            <Editor
                                height="100%"
                                language={files[activeIdx].name.endsWith('.ipynb') ? 'json' : 'python'}
                                theme="vs-dark"
                                value={files[activeIdx].code}
                                onChange={v => setFiles(fs =>
                                    fs.map((f, i) => i === activeIdx ? { ...f, code: v || '' } : f)
                                )}
                            />
                        </div>

                        {/* output section */}
                        <div className="cp-output" ref={outputRef}>
                            <h4>Output:</h4>
                            {error && <pre className="error">{error}</pre>}
                            {!error && (
                                isHTML(output)
                                    ? <div className="cp-graph" dangerouslySetInnerHTML={{ __html: output }} />
                                    : <pre>{output || '(no output)'}</pre>
                            )}
                        </div>

                        {/* terminal windows (max 3) */}
                        <div className="terminals">
                            {terminals.map(t => (
                                <div className="terminal-window" key={t.id}>
                                    <div className="term-header">
                                        <span>Terminal</span>
                                        <span className="term-close" onClick={() => removeTerminal(t.id)}>×</span>
                                    </div>
                                    <div className="terminal-body-wrapper">
                                        <pre className="term-output">{t.output}</pre>
                                        <textarea
                                            className="terminal-body"
                                            value={t.input}
                                            onChange={e => updateTerminalInput(t.id, e.target.value)}
                                            onKeyDown={e => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault(); runTerminal(t.id);
                                                }
                                            }}
                                            placeholder="Type Python command…"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
