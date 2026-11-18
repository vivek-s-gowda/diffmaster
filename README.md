# DiffMaster — Visual Diff & 3-Way Merge Studio ⚡

> **Day 6 / 30 App Challenge** · Built with React 19, TypeScript, and the **Nordic Glacier** dynamic theme.

DiffMaster is a developer studio for comparing code, detecting semantic JSON payload drift, resolving 3-way Git merge conflicts, and exporting standard Git patch files.

---

## ✨ Features

- **Side-by-Side Split & Unified Code Diff**:
  - Longest Common Subsequence (LCS) matrix computation with backtrack alignment.
  - Word-level inline token highlighting for modified lines.
  - Line number gutters and toggleable whitespace ignore & word wrap.
- **Structural Semantic JSON Diffing**:
  - Recursively flattens complex nested JSON hierarchies.
  - Highlights additions, removals, and detects type mutations (e.g. `number` ➔ `string`).
  - Filter chips: All, Added, Removed, Modified, Type Changed.
- **Interactive 3-Way Git Merge Conflict Studio**:
  - 3 simultaneous source panes: Base (Ancestor), Current (Ours / Local), Incoming (Theirs / Remote).
  - Visual conflict cards with quick action buttons: **Accept Current (Ours)**, **Accept Incoming (Theirs)**, or **Accept Both**.
  - Live output generation with Git conflict markers (`<<<<<<< CURRENT`, `=======`, `>>>>>>> INCOMING`) for unresolved hunks.
- **Git Patch Export**:
  - 1-click generation and download of valid standard `.patch` files (`diffmaster-changes.patch`).
- **Dynamic Theming Suite (Nordic Glacier)**:
  - Signature **Nordic Glacier** palette (Polar Teal `#0d9488`, Ice Cyan `#a5f3fc`, Arctic Blue `#38bdf8`, Deep Navy `#0a1017`).
  - 3 switchable palettes: Emerald Matrix, Obsidian Sunset, Cyber Synthwave.
- **Firebase Hosting Deploy Ready**:
  - Pre-configured `firebase.json` and `.firebaserc` with 1-year immutable caching on static assets.

---

## 🏗️ Architecture

```
day-06-diffmaster/
├── .firebaserc                # Firebase project configuration
├── firebase.json              # Firebase Hosting SPA & caching rules
├── index.html                 # React 19 mount point
├── package.json               # Scripts & metadata
├── tsconfig.json              # TypeScript compilation config
├── dist/                      # Compiled browser ES modules
├── linkedin/
│   ├── POST.md                # Ready-to-publish LinkedIn post
│   └── snapshots/             # 4x 16:9 high-resolution Chromium snapshots
│       ├── 01_hero_overview.png
│       ├── 02_core_workflow.png
│       ├── 03_feature_deepdive.png
│       └── 04_export_results.png
├── src/
│   ├── App.jsx                # Root React 19 orchestrator
│   ├── diffEngine.js          # LCS matrix & token diffing
│   ├── jsonDiff.js            # Semantic JSON flattening & type drift
│   ├── sampleData.js          # Preloaded test datasets
│   ├── style.css              # Glassmorphism, animations & diff theme
│   ├── themes.js              # Theme configurations
│   ├── threeWayMerge.js       # 3-way merge conflict detection
│   └── components/
│       ├── DiffControls.jsx   # View mode & formatting toggles
│       ├── Header.jsx         # Clean commercial header (No Day badges)
│       ├── JsonSemanticDiff.jsx # JSON tree drift inspector
│       ├── SideBySideDiff.jsx # Split pane diff with token highlights
│       ├── ThreeWayMerge.jsx  # Interactive conflict resolver
│       ├── Toast.jsx          # Notification toast
│       └── UnifiedDiff.jsx    # Standard unified patch view
├── tests/
│   ├── diffEngine.test.js     # 3 unit tests for LCS & patches
│   ├── jsonDiff.test.js       # 4 unit tests for structural JSON
│   └── threeWayMerge.test.js  # 3 unit tests for 3-way merge
└── vendor/
    └── react.min.js           # React 19 + ReactDOM standalone bundle
```

---

## 🚀 Quick Start

### 1. Run Unit Tests
```bash
npm test
```

### 2. Build React Modules
```bash
npm run build
```

### 3. Local Development Server
```bash
npm start
# Open http://localhost:3006
```

### 4. Deploy to Firebase
```bash
npm run deploy
```

---

## 🧪 Test Coverage

10 automated tests using Node.js native test runner (`node --test tests/*.test.js`):
- `DiffEngine`: Line additions, deletions, token highlighting, Git patch generation.
- `JsonDiffer`: Key additions, deletions, value modifications, type coercion detection, invalid JSON handling.
- `ThreeWayMerger`: Clean non-conflicting merges, conflict detection, resolution modes (`current`, `incoming`, `both`).

---

## 👤 Author

**sgowdavivek** — `<sgowdavivek@gmail.com>`
