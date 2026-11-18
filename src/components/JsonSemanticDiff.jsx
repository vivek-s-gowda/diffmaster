// day-06-diffmaster/src/components/JsonSemanticDiff.jsx
import { useState } from 'react';
import { JsonDiffer } from '../jsonDiff.js';

export function JsonSemanticDiff({
  json1,
  json2,
  onJson1Change,
  onJson2Change,
  onPrettify
}) {
  const [filter, setFilter] = useState('all'); // 'all' | 'added' | 'removed' | 'modified' | 'type_changed'

  const diffResult = JsonDiffer.diff(json1, json2);

  const filteredChanges = (diffResult.changes || []).filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* JSON Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--secondary)' }}>
              Base JSON Schema / Payload
            </span>
            <button
              onClick={() => onPrettify('left')}
              className="btn-secondary"
              style={{ fontSize: '0.7rem', padding: '2px 8px' }}
            >
              Format JSON
            </button>
          </div>
          <textarea
            value={json1}
            onChange={(e) => onJson1Change(e.target.value)}
            rows={8}
            placeholder='{"key": "value"}'
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
              Updated Target JSON Payload
            </span>
            <button
              onClick={() => onPrettify('right')}
              className="btn-secondary"
              style={{ fontSize: '0.7rem', padding: '2px 8px' }}
            >
              Format JSON
            </button>
          </div>
          <textarea
            value={json2}
            onChange={(e) => onJson2Change(e.target.value)}
            rows={8}
            placeholder='{"key": "new_value"}'
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

      {/* Filter and stats bar */}
      <div className="glass-panel" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>FILTER:</span>
          {['all', 'added', 'removed', 'modified', 'type_changed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn-secondary ${filter === f ? 'active' : ''}`}
              style={{ padding: '4px 10px', fontSize: '0.75rem', textTransform: 'capitalize' }}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>

        {diffResult.stats && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge-pill badge-added">+{diffResult.stats.added} Added</span>
            <span className="badge-pill badge-deleted">-{diffResult.stats.removed} Removed</span>
            <span className="badge-pill badge-modified">~{diffResult.stats.modified} Value Changed</span>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{diffResult.stats.totalKeys} keys</span>
          </div>
        )}
      </div>

      {/* Changes list */}
      <div className="glass-panel font-mono" style={{ padding: '12px', minHeight: '360px', maxHeight: '520px', overflowY: 'auto' }}>
        {diffResult.error ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#f43f5e', fontSize: '0.9rem' }}>
            ⚠️ {diffResult.error}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredChanges.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                No differences found matching active filter.
              </div>
            ) : (
              filteredChanges.map((change, idx) => {
                let badgeClass = 'badge-modified';
                let typeLabel = change.type.toUpperCase();

                if (change.type === 'added') badgeClass = 'badge-added';
                else if (change.type === 'removed') badgeClass = 'badge-deleted';
                else if (change.type === 'type_changed') badgeClass = 'badge-type';

                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '6px',
                      border: '1px solid var(--border)',
                      fontSize: '0.8rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                      <span className={`badge-pill ${badgeClass}`} style={{ fontSize: '0.65rem' }}>
                        {typeLabel}
                      </span>
                      <span style={{ fontWeight: 600, color: '#f8fafc' }}>
                        {change.key}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem' }}>
                      {change.type === 'added' && (
                        <span style={{ color: 'var(--diff-added)' }}>
                          {JSON.stringify(change.newVal)}
                        </span>
                      )}
                      {change.type === 'removed' && (
                        <span style={{ color: 'var(--diff-removed)', textDecoration: 'line-through' }}>
                          {JSON.stringify(change.oldVal)}
                        </span>
                      )}
                      {change.type === 'modified' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: 'var(--diff-removed)', textDecoration: 'line-through' }}>
                            {JSON.stringify(change.oldVal)}
                          </span>
                          <span style={{ color: '#64748b' }}>➔</span>
                          <span style={{ color: 'var(--diff-added)' }}>
                            {JSON.stringify(change.newVal)}
                          </span>
                        </div>
                      )}
                      {change.type === 'type_changed' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#c084fc', background: 'rgba(192, 132, 252, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                            {change.oldType}: {JSON.stringify(change.oldVal)}
                          </span>
                          <span style={{ color: '#64748b' }}>➔</span>
                          <span style={{ color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                            {change.newType}: {JSON.stringify(change.newVal)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
