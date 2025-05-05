import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./MarkdownContent.css"; // scoped styles for markdown view

export default function MarkdownContent({ section, topic = "index" }) {
    // holds loaded markdown content
    const [md, setMd] = useState("# Loading…");

    // fetch markdown file on section/topic change
    useEffect(() => {
        const url = `${process.env.PUBLIC_URL}/docs/${section}/${topic}.md`;

        fetch(url)
            .then(r => (r.ok ? r.text() : Promise.reject(`404: ${url}`)))
            .then(setMd)
            .catch(e => setMd(`# 404 – Document not found\n\n\`${e.toString()}\``));
    }, [section, topic]);

    return (
        <div className="markdown-container">
            <div className="markdown-body">
                {/* render the markdown content */}
                <ReactMarkdown>{md}</ReactMarkdown>
            </div>
        </div>
    );
}
