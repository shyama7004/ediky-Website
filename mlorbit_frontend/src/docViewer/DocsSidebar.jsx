import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import sections from './sections.json'; // contains sidebar section and topic structure
import './DocsSidebar.css';
import {
    FiChevronLeft,
    FiChevronRight,
    FiChevronDown,
    FiChevronUp,
} from 'react-icons/fi';

export default function DocsSidebar() {
    // get current section from URL
    const { section: currentSection } = useParams();

    // collapsed = sidebar minimized to pill
    const [collapsed, setCollapsed] = useState(false);

    // holds which sections are expanded
    const [expandedSections, setExpandedSections] = useState(new Set());

    // toggle sidebar open/close
    const toggleCollapse = () => setCollapsed(c => !c);

    // toggle a section's expand/collapse state
    const toggleSection = slug => {
        const next = new Set(expandedSections);
        next.has(slug) ? next.delete(slug) : next.add(slug);
        setExpandedSections(next);
    };

    // filter visible section(s) based on current route
    const visible = sections.filter(sec => sec.slug === currentSection);

    return (
        <aside className={`docs-sidebar ${collapsed ? 'collapsed' : ''}`}>
            {/* top part with toggle button */}
            <header className="sidebar-header">
                <div className="sidebar-header-box">
                    <button
                        className="toggle-btn"
                        onClick={toggleCollapse}
                        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
                        <span className="btn-label">{collapsed ? 'Open' : 'Close'}</span>
                    </button>
                </div>
            </header>

            {/* main nav only shown if sidebar is expanded */}
            {!collapsed && (
                <nav className="sidebar-nav">
                    {visible.map(sec => {
                        const open = expandedSections.has(sec.slug) || sec.slug === currentSection;
                        return (
                            <div key={sec.slug} className="section">
                                {/* section title row (expandable) */}
                                <div
                                    className={`section-title-row ${open ? 'open' : ''}`}
                                    onClick={() => toggleSection(sec.slug)}
                                    role="button"
                                    tabIndex={0}
                                    aria-expanded={open}
                                >
                                    <span className="section-label">{sec.label}</span>
                                    <span className="icon">
                                        {open ? <FiChevronUp /> : <FiChevronDown />}
                                    </span>
                                </div>

                                {/* topic links shown only if section is expanded */}
                                {open && (
                                    <ul className="topic-list">
                                        {sec.topics.map(t => (
                                            <li key={t.slug}>
                                                <NavLink
                                                    to={`/docs/${sec.slug}/${t.slug}`}
                                                    className={({ isActive }) => (isActive ? 'active' : '')}
                                                >
                                                    {t.label}
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </nav>
            )}
        </aside>
    );
}
