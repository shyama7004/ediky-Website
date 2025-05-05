import { Routes, Route, Navigate, useParams } from "react-router-dom";
import DocsSidebar from "../docViewer/DocsSidebar";
import HighlightableText from "../docViewer/HighlightableText";
import CodePlayground from "../docViewer/CodePlayground";
import SpeechReader from "../docViewer/SpeechReader";
import "../docViewer/docs.css";
import "./DocsPage.css";

// main component to render the docs page with sidebar and content
export default function DocsPage() {
  // get current section and topic from the url (default to machine-learning/index)
  const { section = "machine-learning", topic = "index" } = useParams();

  return (
    <div className="docs-layout">
      {/* left sidebar with navigation */}
      <DocsSidebar />

      {/* main content area */}
      <main className="docs-main">
        <div className="docs-main-content">
          {/* shows the markdown/text content */}
          <HighlightableText section={section} topic={topic} />

          {/* code editor component with pyodide support */}
          <CodePlayground />

          {/* optional screen reader for accessibility */}
          <SpeechReader />
        </div>
      </main>
    </div>
  );
}

// route definitions for the docs section of the app
export function DocsRoutes() {
  return (
    <Routes>
      {/* redirect root docs path to machine-learning/index */}
      <Route index element={<Navigate to="machine-learning/index" replace />} />

      {/* nested route for section and topic */}
      <Route path=":section">
        <Route index element={<DocsPage />} />
        <Route path=":topic" element={<DocsPage />} />
      </Route>

      {/* catch-all route fallback */}
      <Route path="*" element={<Navigate to="machine-learning/index" replace />} />
    </Routes>
  );
}
