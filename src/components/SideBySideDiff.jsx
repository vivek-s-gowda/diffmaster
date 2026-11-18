// day-06-diffmaster/src/components/SideBySideDiff.jsx

export function SideBySideDiff({
  diffData,
  leftLabel,
  rightLabel,
  leftText,
  rightText,
  onLeftChange,
  onRightChange,
  wordWrap
}) {
  const sideBySide = diffData?.sideBySide || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Editable input areas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--secondary)' }}>
              👈 Original / Left Pane ({leftLabel || 'Base'})
            </span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Editable</span>
          </div>
          <textarea
            value={leftText}
            onChange={(e) => onLeftChange(e.target.value)}
            rows={5}
            placeholder="Paste original code here..."
            style={{
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
            }}
          />
        </div>

        <div className="glass-panel" style={{ padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)' }}>
              👉 Modified / Right Pane ({rightLabel || 'Target'})
            </span>
            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Editable</span>
          </div>
          <textarea
            value={rightText}
            onChange={(e) => onRightChange(e.target.value)}
            rows={5}
            placeholder="Paste modified code here..."
            style={{
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
            }}
          />
        </div>
      </div>

      {/* Synchronized Side-by-Side Diff Table */}
      <div className="diff-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: 'rgba(15,23,42,0.95)', borderBottom: '1px solid var(--border)', padding: '8px 16px', fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8' }}>
          <div>ORIGINAL ({leftLabel || 'File A'})</div>
          <div>MODIFIED ({rightLabel || 'File B'})</div>
        </div>

        <div className="split-pane-wrapper">
          {/* Left Column */}
          <div className="split-pane font-mono" style={{ borderRight: '1px solid var(--border)' }}>
            {sideBySide.map((row, idx) => {
              const item = row.left;
              if (!item) {
                // Empty spacer for additions on right
                return (
                  <div key={idx} className="diff-row" style={{ background: 'rgba(255,255,255,0.015)' }}>
                    <div className="diff-gutter">&nbsp;</div>
                    <div className="diff-content" style={{ color: '#475569' }}>&nbsp;</div>
                  </div>
                );
              }

              let lineClass = '';
              if (item.type === 'deleted') lineClass = 'line-deleted';
              else if (item.type === 'modified') lineClass = 'line-modified';

              return (
                <div key={idx} className={`diff-row ${lineClass}`}>
                  <div className="diff-gutter">{item.line}</div>
                  <div className="diff-content" style={{ whiteSpace: wordWrap ? 'pre-wrap' : 'pre' }}>
                    {item.type === 'modified' && item.tokens ? (
                      item.tokens.map((tok, tIdx) => (
                        <span
                          key={tIdx}
                          className={tok.type === 'deleted' ? 'token-deleted' : ''}
                        >
                          {tok.text}
                        </span>
                      ))
                    ) : (
                      <span>{item.text || ' '}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="split-pane font-mono">
            {sideBySide.map((row, idx) => {
              const item = row.right;
              if (!item) {
                // Empty spacer for deletions on left
                return (
                  <div key={idx} className="diff-row" style={{ background: 'rgba(255,255,255,0.015)' }}>
                    <div className="diff-gutter">&nbsp;</div>
                    <div className="diff-content" style={{ color: '#475569' }}>&nbsp;</div>
                  </div>
                );
              }

              let lineClass = '';
              if (item.type === 'added') lineClass = 'line-added';
              else if (item.type === 'modified') lineClass = 'line-modified';

              return (
                <div key={idx} className={`diff-row ${lineClass}`}>
                  <div className="diff-gutter">{item.line}</div>
                  <div className="diff-content" style={{ whiteSpace: wordWrap ? 'pre-wrap' : 'pre' }}>
                    {item.type === 'modified' && item.tokens ? (
                      item.tokens.map((tok, tIdx) => (
                        <span
                          key={tIdx}
                          className={tok.type === 'added' ? 'token-added' : ''}
                        >
                          {tok.text}
                        </span>
                      ))
                    ) : (
                      <span>{item.text || ' '}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
