// day-06-diffmaster/src/components/UnifiedDiff.jsx

export function UnifiedDiff({ diffData, wordWrap }) {
  const rawDiff = diffData?.rawDiff || [];

  return (
    <div className="diff-container font-mono" style={{ minHeight: '480px', maxHeight: '640px', overflowY: 'auto' }}>
      <div style={{ padding: '8px 16px', background: 'rgba(15,23,42,0.95)', borderBottom: '1px solid var(--border)', fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8' }}>
        UNIFIED VIEW (GIT HUNK FORMAT)
      </div>

      <div style={{ padding: '8px 0', fontSize: '0.82rem', lineHeight: '1.6' }}>
        {rawDiff.map((item, idx) => {
          let lineClass = '';
          let prefix = ' ';
          let color = '#94a3b8';

          if (item.type === 'added') {
            lineClass = 'line-added';
            prefix = '+';
            color = 'var(--diff-added)';
          } else if (item.type === 'deleted') {
            lineClass = 'line-deleted';
            prefix = '-';
            color = 'var(--diff-removed)';
          }

          return (
            <div key={idx} className={`diff-row ${lineClass}`} style={{ display: 'flex' }}>
              <div className="diff-gutter" style={{ width: '36px', color: '#64748b' }}>
                {item.line1 || item.line2 || ' '}
              </div>
              <div style={{ width: '20px', textAlign: 'center', color, fontWeight: 700, userSelect: 'none' }}>
                {prefix}
              </div>
              <div className="diff-content" style={{ whiteSpace: wordWrap ? 'pre-wrap' : 'pre' }}>
                {item.text || ' '}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
