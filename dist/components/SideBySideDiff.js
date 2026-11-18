// day-06-diffmaster/src/components/SideBySideDiff.jsx
export function SideBySideDiff({ diffData, leftLabel, rightLabel, leftText, rightText, onLeftChange, onRightChange, wordWrap }) {
    const sideBySide = diffData?.sideBySide || [];
    return (React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
        React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } },
            React.createElement("div", { className: "glass-panel", style: { padding: '12px' } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                    React.createElement("span", { style: { fontSize: '0.8rem', fontWeight: 600, color: 'var(--secondary)' } },
                        "\uD83D\uDC48 Original / Left Pane (",
                        leftLabel || 'Base',
                        ")"),
                    React.createElement("span", { style: { fontSize: '0.7rem', color: '#64748b' } }, "Editable")),
                React.createElement("textarea", { value: leftText, onChange: (e) => onLeftChange(e.target.value), rows: 5, placeholder: "Paste original code here...", style: {
                        width: '100%',
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        color: '#e2e8f0',
                        padding: '8px 10px',
                        fontFamily: 'monospace',
                        fontSize: '0.78rem',
                        resize: 'vertical',
                        outline: 'none'
                    } })),
            React.createElement("div", { className: "glass-panel", style: { padding: '12px' } },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' } },
                    React.createElement("span", { style: { fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' } },
                        "\uD83D\uDC49 Modified / Right Pane (",
                        rightLabel || 'Target',
                        ")"),
                    React.createElement("span", { style: { fontSize: '0.7rem', color: '#64748b' } }, "Editable")),
                React.createElement("textarea", { value: rightText, onChange: (e) => onRightChange(e.target.value), rows: 5, placeholder: "Paste modified code here...", style: {
                        width: '100%',
                        background: 'rgba(0,0,0,0.4)',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        color: '#e2e8f0',
                        padding: '8px 10px',
                        fontFamily: 'monospace',
                        fontSize: '0.78rem',
                        resize: 'vertical',
                        outline: 'none'
                    } }))),
        React.createElement("div", { className: "diff-container" },
            React.createElement("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(15,23,42,0.95)', borderBottom: '1px solid var(--border)', padding: '8px 16px', fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8' } },
                React.createElement("div", null,
                    "ORIGINAL (",
                    leftLabel || 'File A',
                    ")"),
                React.createElement("div", null,
                    "MODIFIED (",
                    rightLabel || 'File B',
                    ")")),
            React.createElement("div", { className: "split-pane-wrapper" },
                React.createElement("div", { className: "split-pane font-mono", style: { borderRight: '1px solid var(--border)' } }, sideBySide.map((row, idx) => {
                    const item = row.left;
                    if (!item) {
                        // Empty spacer for additions on right
                        return (React.createElement("div", { key: idx, className: "diff-row", style: { background: 'rgba(255,255,255,0.015)' } },
                            React.createElement("div", { className: "diff-gutter" }, "\u00A0"),
                            React.createElement("div", { className: "diff-content", style: { color: '#475569' } }, "\u00A0")));
                    }
                    let lineClass = '';
                    if (item.type === 'deleted')
                        lineClass = 'line-deleted';
                    else if (item.type === 'modified')
                        lineClass = 'line-modified';
                    return (React.createElement("div", { key: idx, className: `diff-row ${lineClass}` },
                        React.createElement("div", { className: "diff-gutter" }, item.line),
                        React.createElement("div", { className: "diff-content", style: { whiteSpace: wordWrap ? 'pre-wrap' : 'pre' } }, item.type === 'modified' && item.tokens ? (item.tokens.map((tok, tIdx) => (React.createElement("span", { key: tIdx, className: tok.type === 'deleted' ? 'token-deleted' : '' }, tok.text)))) : (React.createElement("span", null, item.text || ' ')))));
                })),
                React.createElement("div", { className: "split-pane font-mono" }, sideBySide.map((row, idx) => {
                    const item = row.right;
                    if (!item) {
                        // Empty spacer for deletions on left
                        return (React.createElement("div", { key: idx, className: "diff-row", style: { background: 'rgba(255,255,255,0.015)' } },
                            React.createElement("div", { className: "diff-gutter" }, "\u00A0"),
                            React.createElement("div", { className: "diff-content", style: { color: '#475569' } }, "\u00A0")));
                    }
                    let lineClass = '';
                    if (item.type === 'added')
                        lineClass = 'line-added';
                    else if (item.type === 'modified')
                        lineClass = 'line-modified';
                    return (React.createElement("div", { key: idx, className: `diff-row ${lineClass}` },
                        React.createElement("div", { className: "diff-gutter" }, item.line),
                        React.createElement("div", { className: "diff-content", style: { whiteSpace: wordWrap ? 'pre-wrap' : 'pre' } }, item.type === 'modified' && item.tokens ? (item.tokens.map((tok, tIdx) => (React.createElement("span", { key: tIdx, className: tok.type === 'added' ? 'token-added' : '' }, tok.text)))) : (React.createElement("span", null, item.text || ' ')))));
                }))))));
}
