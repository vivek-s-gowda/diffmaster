// day-06-diffmaster/src/components/DiffControls.jsx

export function DiffControls({
  viewMode,
  onViewModeChange,
  ignoreWhitespace,
  onToggleWhitespace,
  wordWrap,
  onToggleWordWrap,
  stats
}) {
  return (
    <div className="diff-header-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
        {/* View mode toggle */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '2px', border: '1px solid var(--border)' }}>
          <button
            onClick={() => onViewModeChange('split')}
            style={{
              padding: '4px 10px',
              fontSize: '0.78rem',
              fontWeight: 600,
              background: viewMode === 'split' ? 'var(--primary)' : 'transparent',
              color: viewMode === 'split' ? '#041316' : '#94a3b8',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => onViewModeChange('unified')}
            style={{
              padding: '4px 10px',
              fontSize: '0.78rem',
              fontWeight: 600,
              background: viewMode === 'unified' ? 'var(--primary)' : 'transparent',
              color: viewMode === 'unified' ? '#041316' : '#94a3b8',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Unified
          </button>
        </div>

        {/* Whitespace toggle */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#94a3b8', cursor: 'pointer', userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={ignoreWhitespace}
            onChange={onToggleWhitespace}
            style={{ accentColor: 'var(--primary)' }}
          />
          <span>Ignore Whitespace</span>
        </label>

        {/* Word wrap toggle */}
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#94a3b8', cursor: 'pointer', userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={wordWrap}
            onChange={onToggleWordWrap}
            style={{ accentColor: 'var(--primary)' }}
          />
          <span>Word Wrap</span>
        </label>
      </div>

      {/* Summary stats */}
      {stats && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge-pill badge-added">
            +{stats.additions || 0} additions
          </span>
          <span className="badge-pill badge-deleted">
            -{stats.deletions || 0} deletions
          </span>
          <span className="badge-pill badge-modified">
            ~{stats.modifications || 0} modified
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {stats.totalLines || 0} lines analyzed
          </span>
        </div>
      )}
    </div>
  );
}
