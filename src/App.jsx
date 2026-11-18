// day-06-diffmaster/src/App.jsx
// Root Orchestrator for DiffMaster React 19 Studio

import { THEMES } from './themes.js';
import { SAMPLE_PRESETS } from './sampleData.js';
import { DiffEngine } from './diffEngine.js';
import { JsonDiffer } from './jsonDiff.js';
import { ThreeWayMerger } from './threeWayMerge.js';

import { Header } from './components/Header.js';
import { DiffControls } from './components/DiffControls.js';
import { SideBySideDiff } from './components/SideBySideDiff.js';
import { UnifiedDiff } from './components/UnifiedDiff.js';
import { JsonSemanticDiff } from './components/JsonSemanticDiff.js';
import { ThreeWayMerge } from './components/ThreeWayMerge.js';
import { Toast } from './components/Toast.js';

const { useState, useEffect, useMemo, useCallback } = window.React;

export function App() {
  const [activeTheme, setActiveTheme] = useState('nordic');
  const [activeMode, setActiveMode] = useState('code'); // 'code' | 'json' | 'merge'
  const [activePreset, setActivePreset] = useState('javascript');
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'unified'
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [wordWrap, setWordWrap] = useState(false);

  // Code Diff State
  const [leftCode, setLeftCode] = useState(SAMPLE_PRESETS.javascript.left);
  const [rightCode, setRightCode] = useState(SAMPLE_PRESETS.javascript.right);
  const [leftLabel, setLeftLabel] = useState('UserCard.js (Legacy)');
  const [rightLabel, setRightLabel] = useState('UserCard.jsx (React 19)');

  // JSON Diff State
  const [json1, setJson1] = useState(SAMPLE_PRESETS.json.left);
  const [json2, setJson2] = useState(SAMPLE_PRESETS.json.right);

  // 3-Way Merge State
  const [baseText, setBaseText] = useState(SAMPLE_PRESETS.merge.base);
  const [currentText, setCurrentText] = useState(SAMPLE_PRESETS.merge.current);
  const [incomingText, setIncomingText] = useState(SAMPLE_PRESETS.merge.incoming);
  const [mergeHunks, setMergeHunks] = useState(() =>
    ThreeWayMerger.merge(SAMPLE_PRESETS.merge.base, SAMPLE_PRESETS.merge.current, SAMPLE_PRESETS.merge.incoming).hunks
  );

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast({ message });
    setTimeout(() => setToast(null), 2500);
  }, []);

  // Sync theme CSS variables
  useEffect(() => {
    const themeObj = THEMES.find(t => t.id === activeTheme) || THEMES[0];
    const root = document.documentElement;
    root.style.setProperty('--primary', themeObj.primary);
    root.style.setProperty('--secondary', themeObj.secondary);
    root.style.setProperty('--tertiary', themeObj.tertiary);
    root.style.setProperty('--bg', themeObj.bg);
    root.style.setProperty('--card', themeObj.card);
    root.style.setProperty('--card-hover', themeObj.cardHover);
    root.style.setProperty('--border', themeObj.border);
    root.style.setProperty('--glow', themeObj.glow);
    root.style.setProperty('--glow-secondary', themeObj.glowSecondary);
    root.style.setProperty('--diff-added', themeObj.diffAdded);
    root.style.setProperty('--diff-added-bg', themeObj.diffAddedBg);
    root.style.setProperty('--diff-removed', themeObj.diffRemoved);
    root.style.setProperty('--diff-removed-bg', themeObj.diffRemovedBg);
    root.style.setProperty('--diff-modified', themeObj.diffModified);
    root.style.setProperty('--diff-modified-bg', themeObj.diffModifiedBg);
  }, [activeTheme]);

  // Hash listener for automated snapshots (#overview, #workflow, #deepdive, #export)
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash;
      if (hash === '#overview') {
        setActiveMode('code');
        setViewMode('split');
      } else if (hash === '#workflow') {
        setActiveMode('code');
        setViewMode('unified');
      } else if (hash === '#deepdive') {
        setActiveMode('json');
      } else if (hash === '#export') {
        setActiveMode('merge');
      }
    }
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Update merge hunks when base, current or incoming change
  useEffect(() => {
    const res = ThreeWayMerger.merge(baseText, currentText, incomingText);
    setMergeHunks(res.hunks);
  }, [baseText, currentText, incomingText]);

  // Code Diff calculation
  const codeDiffData = useMemo(() => {
    return DiffEngine.diffLines(leftCode, rightCode, { ignoreWhitespace });
  }, [leftCode, rightCode, ignoreWhitespace]);

  // Preset Handler
  const handlePresetChange = (presetKey) => {
    setActivePreset(presetKey);
    if (presetKey === 'javascript') {
      setActiveMode('code');
      setLeftCode(SAMPLE_PRESETS.javascript.left);
      setRightCode(SAMPLE_PRESETS.javascript.right);
      setLeftLabel(SAMPLE_PRESETS.javascript.leftLabel);
      setRightLabel(SAMPLE_PRESETS.javascript.rightLabel);
      showToast('Loaded React 19 Refactor Preset');
    } else if (presetKey === 'json') {
      setActiveMode('json');
      setJson1(SAMPLE_PRESETS.json.left);
      setJson2(SAMPLE_PRESETS.json.right);
      showToast('Loaded JSON API Payload Drift Preset');
    } else if (presetKey === 'merge') {
      setActiveMode('merge');
      setBaseText(SAMPLE_PRESETS.merge.base);
      setCurrentText(SAMPLE_PRESETS.merge.current);
      setIncomingText(SAMPLE_PRESETS.merge.incoming);
      showToast('Loaded Git Merge Conflict Preset');
    }
  };

  // Conflict Resolution Handler
  const handleResolveConflict = (conflictId, choice) => {
    setMergeHunks(prevHunks =>
      prevHunks.map(h => {
        if (h.id === conflictId) {
          return { ...h, resolution: choice };
        }
        return h;
      })
    );
    showToast(`Conflict resolved with [${choice.toUpperCase()}]`);
  };

  // Export Patch
  const handleExportPatch = () => {
    const patch = DiffEngine.toGitPatch('UserCard.jsx', leftCode, rightCode);
    const blob = new Blob([patch], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diffmaster-changes.patch';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded diffmaster-changes.patch');
  };

  // Copy Patch
  const handleCopyPatch = () => {
    let content = '';
    if (activeMode === 'code') {
      content = DiffEngine.toGitPatch('UserCard.jsx', leftCode, rightCode);
    } else if (activeMode === 'json') {
      content = JSON.stringify(JsonDiffer.diff(json1, json2), null, 2);
    } else {
      content = ThreeWayMerger.resolveMergedText(mergeHunks);
    }

    navigator.clipboard?.writeText(content).then(() => {
      showToast('Copied output to clipboard!');
    }).catch(() => {
      showToast('Failed to copy to clipboard');
    });
  };

  // JSON Prettify
  const handlePrettify = (target) => {
    try {
      if (target === 'left') {
        const obj = JSON.parse(json1);
        setJson1(JSON.stringify(obj, null, 2));
      } else {
        const obj = JSON.parse(json2);
        setJson2(JSON.stringify(obj, null, 2));
      }
      showToast('JSON Formatted Cleanly');
    } catch {
      showToast('Cannot format invalid JSON');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top Header */}
      <Header
        activeMode={activeMode}
        onModeChange={setActiveMode}
        activeTheme={activeTheme}
        onThemeChange={setActiveTheme}
        activePreset={activePreset}
        onPresetSelect={handlePresetChange}
        onExportPatch={handleExportPatch}
        onCopyPatch={handleCopyPatch}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
        {/* Code Diff Mode */}
        {activeMode === 'code' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <DiffControls
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              ignoreWhitespace={ignoreWhitespace}
              onToggleWhitespace={() => setIgnoreWhitespace(v => !v)}
              wordWrap={wordWrap}
              onToggleWordWrap={() => setWordWrap(v => !v)}
              stats={codeDiffData.stats}
            />

            {viewMode === 'split' ? (
              <SideBySideDiff
                diffData={codeDiffData}
                leftLabel={leftLabel}
                rightLabel={rightLabel}
                leftText={leftCode}
                rightText={rightCode}
                onLeftChange={setLeftCode}
                onRightChange={setRightCode}
                wordWrap={wordWrap}
              />
            ) : (
              <UnifiedDiff
                diffData={codeDiffData}
                wordWrap={wordWrap}
              />
            )}
          </div>
        )}

        {/* JSON Semantic Diff Mode */}
        {activeMode === 'json' && (
          <JsonSemanticDiff
            json1={json1}
            json2={json2}
            onJson1Change={setJson1}
            onJson2Change={setJson2}
            onPrettify={handlePrettify}
          />
        )}

        {/* 3-Way Merge Mode */}
        {activeMode === 'merge' && (
          <ThreeWayMerge
            baseText={baseText}
            currentText={currentText}
            incomingText={incomingText}
            onBaseChange={setBaseText}
            onCurrentChange={setCurrentText}
            onIncomingChange={setIncomingText}
            mergeHunks={mergeHunks}
            onResolveConflict={handleResolveConflict}
            onCopyResolved={(text) => {
              navigator.clipboard?.writeText(text);
              showToast('Resolved merge output copied!');
            }}
          />
        )}
      </main>

      <Toast toast={toast} />
    </div>
  );
}

// Mount React 19 Application
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = window.ReactDOM.createRoot(rootEl);
  root.render(window.React.createElement(App));
}
