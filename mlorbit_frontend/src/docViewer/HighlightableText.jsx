import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { onAuthStateChanged } from 'firebase/auth'; // firebase authentication
import { collection, getDocs, addDoc, deleteDoc, doc, } from 'firebase/firestore';
import { auth, db } from '../login/firebaseConfig'; // auth and database config
import { FiRotateCcw as FiUndo, FiRotateCw as FiRedo } from 'react-icons/fi';
import './HighlightableText.css';

// helper: convert hex color to RGB components
function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m
    ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
    : [255, 235, 59]; // fallback yellow
}

// helper: find all text nodes touched by a selection range
function getSelectedTextNodes(rootRange, container) {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
  const nodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (rootRange.intersectsNode(node)) {
      let start = 0, end = node.textContent.length;
      if (node === rootRange.startContainer) start = rootRange.startOffset;
      if (node === rootRange.endContainer) end = rootRange.endOffset;
      if (start < end) nodes.push({ node, start, end });
    }
  }
  return nodes;
}

export default function HighlightableText({ section, topic = 'index' }) {
  // markdown state
  const [md, setMd] = useState('');
  // auth state
  const [user, setUser] = useState(null);
  // highlight data
  const [highlights, setHighlights] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  // toolbar controls
  const [color, setColor] = useState('#ffeb3b');
  const [thickness, setThickness] = useState(2);
  const [opacity, setOpacity] = useState(0.4);
  const [toolbarPos, setToolbarPos] = useState({ top: 120, left: 120 });
  const [dragging, setDragging] = useState(false);
  const [minimized, setMinimized] = useState(true);

  // refs
  const dragOffset = useRef({ x: 0, y: 0 });
  const containerRef = useRef();

  // load markdown
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/docs/${section}/${topic}.md`)
      .then(r => r.ok ? r.text() : Promise.reject())
      .then(setMd)
      .catch(() => setMd('# 404 – Document not found'));
  }, [section, topic]);

  // monitor auth changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u));
    return unsub;
  }, []);

  // fetch highlights from Firestore and replay in DOM
  useEffect(() => {
    if (!user) return;
    (async () => {
      const snap = await getDocs(collection(db, 'users', user.uid, 'highlights'));
      const list = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .filter(h => h.section === section && h.topic === topic);
      setHighlights(list);
      list.forEach(replayOne); // inject into DOM
    })();
  }, [user, section, topic]);

  // highlight a single piece of saved text in the DOM
  function replayOne(h) {
    const root = containerRef.current;
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const idx = node.textContent.indexOf(h.text);
      if (idx >= 0) {
        const range = document.createRange();
        range.setStart(node, idx);
        range.setEnd(node, idx + h.text.length);
        const span = document.createElement('span');
        span.className = 'ht-highlight';
        const [r, g, b] = hexToRgb(h.color);
        span.style.backgroundColor = `rgba(${r},${g},${b},${h.opacity})`;
        span.style.padding = `${h.thickness}px 0`;
        range.surroundContents(span);
        break;
      }
    }
  }

  // removes all highlight spans from the DOM
  function clearUI() {
    const root = containerRef.current;
    root.querySelectorAll('span.ht-highlight').forEach(span => {
      const parent = span.parentNode;
      parent.replaceChild(document.createTextNode(span.textContent), span);
      parent.normalize();
    });
  }

  // save current state for undo
  function snapshot() {
    setUndoStack(us => [...us, highlights.map(h => ({ ...h }))]);
    setRedoStack([]); // clear redo on new change
  }

  // apply new highlight based on current selection
  const handleHighlight = async () => {
    if (!user) return alert('Please log in.');
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const rootRange = sel.getRangeAt(0);
    const text = sel.toString().trim();
    if (!text) return;

    snapshot();
    const nodes = getSelectedTextNodes(rootRange, containerRef.current);
    nodes.forEach(({ node, start, end }) => {
      const range = document.createRange();
      range.setStart(node, start);
      range.setEnd(node, end);
      const span = document.createElement('span');
      span.className = 'ht-highlight';
      const [r, g, b] = hexToRgb(color);
      span.style.backgroundColor = `rgba(${r},${g},${b},${opacity})`;
      span.style.padding = `${thickness}px 0`;
      range.surroundContents(span);
    });

    sel.removeAllRanges();

    const ref = await addDoc(
      collection(db, 'users', user.uid, 'highlights'),
      { section, topic, text, color, thickness, opacity }
    );
    setHighlights(hs => [
      ...hs,
      { id: ref.id, section, topic, text, color, thickness, opacity }
    ]);
  };

  // delete all highlights from Firestore and UI
  const handleClearAll = async () => {
    if (!user || !highlights.length) return;
    snapshot();
    await Promise.all(
      highlights.map(h =>
        deleteDoc(doc(db, 'users', user.uid, 'highlights', h.id))
      )
    );
    setHighlights([]);
    clearUI();
  };

  // undo last highlight change
  const handleUndo = () => {
    if (!undoStack.length) return;
    const prev = undoStack[undoStack.length - 1];
    setUndoStack(us => us.slice(0, -1));
    setRedoStack(rs => [...rs, highlights]);
    setHighlights(prev);
    clearUI();
    prev.forEach(replayOne);
  };

  // redo last undone change
  const handleRedo = () => {
    if (!redoStack.length) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack(rs => rs.slice(0, -1));
    setUndoStack(us => [...us, highlights]);
    setHighlights(next);
    clearUI();
    next.forEach(replayOne);
  };

  // enable toolbar dragging
  useEffect(() => {
    function onMove(e) {
      setToolbarPos({
        left: e.clientX - dragOffset.current.x,
        top: e.clientY - dragOffset.current.y,
      });
    }
    function onUp() {
      setDragging(false);
    }
    if (dragging) {
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  return (
    <>
      {/* floating toolbar */}
      {!minimized && (
        <div
          className="ht-toolbar"
          style={toolbarPos}
          onMouseDown={e => {
            setDragging(true);
            dragOffset.current = {
              x: e.clientX - toolbarPos.left,
              y: e.clientY - toolbarPos.top,
            };
          }}
        >
          <label>
            Color <input type="color" value={color}
              onChange={e => setColor(e.target.value)} className="ht-color" />
          </label>
          <label>
            Thickness <input type="range" min="0" max="10"
              value={thickness}
              onChange={e => setThickness(+e.target.value)}
              className="ht-thickness"
            />
          </label>
          <label>
            Opacity <input type="range" min="0.1" max="1" step="0.1"
              value={opacity}
              onChange={e => setOpacity(+e.target.value)}
              className="ht-opacity"
            />
          </label>
          <button className="ht-btn" onClick={handleHighlight}>Highlight</button>
          <button className="ht-btn clear-btn" onClick={handleClearAll}>
            Clear All
          </button>
          <button className="ht-btn icon-btn" onClick={handleUndo}>
            <FiUndo />
          </button>
          <button className="ht-btn icon-btn" onClick={handleRedo}>
            <FiRedo />
          </button>
          <button className="ht-btn minimize-btn" onClick={() => setMinimized(true)}>
            Minimize
          </button>
        </div>
      )}

      {/* pill for minimized toolbar */}
      {minimized && (
        <div className="ht-minimized-pill" onClick={() => setMinimized(false)}>
          Highlighter
        </div>
      )}

      {/* markdown content area */}
      <div className="ht-content" ref={containerRef}>
        <ReactMarkdown>{md}</ReactMarkdown>
      </div>
    </>
  );
}
