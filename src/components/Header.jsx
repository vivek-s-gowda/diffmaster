// day-06-diffmaster/src/components/Header.jsx
import { THEMES } from '../themes.js';

export function Header({
  activeMode,
  onModeChange,
  activeTheme,
  onThemeChange,
  activePreset,
  onPresetSelect,
  onExportPatch,
  onCopyPatch
}) {
  return (
    <header className="glass-header" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          boxShadow: '0 4px 16px var(--glow)',
          animation: 'pulseGlow 4s infinite alternate'
        }}>
          ⚡
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              DiffMaster
            </h1>
            <span style={{ fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(13, 148, 136, 0.25)', color: 'var(--secondary)', border: '1px solid var(--border)', fontWeight: 700 }}>
              v2.0
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Visual Diff, Structural JSON & 3-Way Merge Studio</p>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '10px', border: '1px solid var(--border)', gap: '4px' }}>
        <button
          className={`btn-secondary ${activeMode === 'code' ? 'active' : ''}`}
          onClick={() => onModeChange('code')}
          style={{ padding: '6px 14px', fontSize: '0.85rem' }}
        >
          <span>📄</span>
          <span>Code Diff</span>
        </button>
        <button
          className={`btn-secondary ${activeMode === 'json' ? 'active' : ''}`}
          onClick={() => onModeChange('json')}
          style={{ padding: '6px 14px', fontSize: '0.85rem' }}
        >
          <span>🌳</span>
          <span>JSON Semantic</span>
        </button>
        <button
          className={`btn-secondary ${activeMode === 'merge' ? 'active' : ''}`}
          onClick={() => onModeChange('merge')}
          style={{ padding: '6px 14px', fontSize: '0.85rem' }}
        >
          <span>🔀</span>
          <span>3-Way Merge</span>
        </button>
      </div>

      {/* Preset Selector & Theme Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        {/* Preset Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>PRESET:</span>
          <select
            value={activePreset}
            onChange={(e) => onPresetSelect(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border)',
              color: '#e2e8f0',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '0.8rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="javascript" style={{ background: '#0f172a' }}>React 19 Refactor</option>
            <option value="json" style={{ background: '#0f172a' }}>JSON API Drift</option>
            <option value="merge" style={{ background: '#0f172a' }}>Env Merge Conflict</option>
          </select>
        </div>

        {/* Theme Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => onThemeChange(t.id)}
              title={t.name}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: t.primary,
                border: activeTheme === t.id ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.2)',
                boxShadow: activeTheme === t.id ? `0 0 10px ${t.glow}` : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: activeTheme === t.id ? 'scale(1.15)' : 'scale(1)'
              }}
            />
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary" onClick={onCopyPatch} style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            📋 Copy
          </button>
          <button className="btn-primary" onClick={onExportPatch} style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
            💾 Export .patch
          </button>
        </div>
      </div>
    </header>
  );
}
