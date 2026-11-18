// day-06-diffmaster/src/components/ThreeWayMerge.jsx
import { ThreeWayMerger } from '../threeWayMerge.js';
export function ThreeWayMerge({ baseText, currentText, incomingText, onBaseChange, onCurrentChange, onIncomingChange, mergeHunks, onResolveConflict, onCopyResolved }) {
    const resolvedText = ThreeWayMerger.resolveMergedText(mergeHunks);
    const unresolvedCount = mergeHunks.filter(h => h.type === 'conflict' && h.resolution === 'unresolved').length;
    return (React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' } },
            React.createElement("div", { className: "glass-panel", style: { padding: '12px' } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                    React.createElement("span", { style: { fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8' } }, "Base (Common Ancestor)")),
                React.createElement("textarea", { value: baseText, onChange: (e) => onBaseChange(e.target.value), rows: 5, style: {
                        width: '100%',
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        color: '#94a3b8',
                        padding: '8px 10px',
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        resize: 'vertical',
                        outline: 'none'
                    } })),
            React.createElement("div", { className: "glass-panel", style: { padding: '12px' } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                    React.createElement("span", { style: { fontSize: '0.78rem', fontWeight: 600, color: 'var(--secondary)' } }, "Current (Ours / Local)")),
                React.createElement("textarea", { value: currentText, onChange: (e) => onCurrentChange(e.target.value), rows: 5, style: {
                        width: '100%',
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        color: '#e2e8f0',
                        padding: '8px 10px',
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        resize: 'vertical',
                        outline: 'none'
                    } })),
            React.createElement("div", { className: "glass-panel", style: { padding: '12px' } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                    React.createElement("span", { style: { fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary)' } }, "Incoming (Theirs / Remote)")),
                React.createElement("textarea", { value: incomingText, onChange: (e) => onIncomingChange(e.target.value), rows: 5, style: {
                        width: '100%',
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        color: '#e2e8f0',
                        padding: '8px 10px',
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        resize: 'vertical',
                        outline: 'none'
                    } }))),
        React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' } },
            React.createElement("div", { className: "glass-panel", style: { padding: '16px' } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
                    React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                        React.createElement("span", { style: { fontWeight: 700, fontSize: '0.9rem' } }, "Conflict Resolution Workspace"),
                        unresolvedCount > 0 ? (React.createElement("span", { className: "badge-pill badge-deleted" },
                            unresolvedCount,
                            " Unresolved")) : (React.createElement("span", { className: "badge-pill badge-added" }, "All Conflicts Resolved")))),
                React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto' } }, mergeHunks.filter(h => h.type === 'conflict').length === 0 ? (React.createElement("div", { style: { padding: '32px', textAlign: 'center', color: '#10b981', fontSize: '0.9rem' } }, "\u2705 Clean 3-way merge! No conflicting changes detected.")) : (mergeHunks.map((hunk, idx) => {
                    if (hunk.type !== 'conflict')
                        return null;
                    return (React.createElement("div", { key: hunk.id || idx, className: "conflict-card" },
                        React.createElement("div", { className: "conflict-header" },
                            React.createElement("span", null,
                                "Conflict #",
                                hunk.id),
                            React.createElement("span", { style: {
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    background: hunk.resolution === 'unresolved' ? 'rgba(239,68,68,0.4)' : 'rgba(16,185,129,0.3)',
                                    color: hunk.resolution === 'unresolved' ? '#fecdd3' : '#a7f3d0'
                                } }, hunk.resolution === 'unresolved' ? '⚠️ UNRESOLVED' : `RESOLVED (${hunk.resolution.toUpperCase()})`)),
                        React.createElement("div", { style: { padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' } },
                            React.createElement("div", { className: "font-mono", style: { fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' } },
                                React.createElement("div", { style: { background: 'rgba(56, 189, 248, 0.1)', padding: '6px 10px', borderRadius: '4px', borderLeft: '3px solid #38bdf8' } },
                                    React.createElement("span", { style: { color: '#38bdf8', fontWeight: 600 } }, "CURRENT (Ours): "),
                                    React.createElement("span", null, hunk.current || '(empty)')),
                                React.createElement("div", { style: { background: 'rgba(255, 255, 255, 0.04)', padding: '6px 10px', borderRadius: '4px', borderLeft: '3px solid #64748b' } },
                                    React.createElement("span", { style: { color: '#94a3b8', fontWeight: 600 } }, "BASE: "),
                                    React.createElement("span", null, hunk.base || '(empty)')),
                                React.createElement("div", { style: { background: 'rgba(13, 148, 136, 0.1)', padding: '6px 10px', borderRadius: '4px', borderLeft: '3px solid #0d9488' } },
                                    React.createElement("span", { style: { color: 'var(--secondary)', fontWeight: 600 } }, "INCOMING (Theirs): "),
                                    React.createElement("span", null, hunk.incoming || '(empty)'))),
                            React.createElement("div", { style: { display: 'flex', gap: '8px', marginTop: '4px' } },
                                React.createElement("button", { onClick: () => onResolveConflict(hunk.id, 'current'), className: `btn-secondary ${hunk.resolution === 'current' ? 'active' : ''}`, style: { flex: 1, fontSize: '0.75rem', justifyContent: 'center' } }, "Accept Current (Ours)"),
                                React.createElement("button", { onClick: () => onResolveConflict(hunk.id, 'incoming'), className: `btn-secondary ${hunk.resolution === 'incoming' ? 'active' : ''}`, style: { flex: 1, fontSize: '0.75rem', justifyContent: 'center' } }, "Accept Incoming (Theirs)"),
                                React.createElement("button", { onClick: () => onResolveConflict(hunk.id, 'both'), className: `btn-secondary ${hunk.resolution === 'both' ? 'active' : ''}`, style: { flex: 1, fontSize: '0.75rem', justifyContent: 'center' } }, "Accept Both")))));
                })))),
            React.createElement("div", { className: "glass-panel", style: { padding: '16px', display: 'flex', flexDirection: 'column' } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' } },
                    React.createElement("span", { style: { fontWeight: 700, fontSize: '0.9rem' } }, "Resolved Output"),
                    React.createElement("button", { onClick: () => onCopyResolved(resolvedText), className: "btn-primary", style: { fontSize: '0.75rem', padding: '4px 10px' } }, "\uD83D\uDCCB Copy Result")),
                React.createElement("pre", { className: "font-mono", style: {
                        flex: 1,
                        background: '#070b10',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        padding: '12px',
                        fontSize: '0.75rem',
                        lineHeight: '1.6',
                        overflowY: 'auto',
                        maxHeight: '380px',
                        color: '#34d399',
                        whiteSpace: 'pre-wrap'
                    } }, resolvedText)))));
}
