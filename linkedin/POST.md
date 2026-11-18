# Day 6 of 30: Building a Dev Tool Every Single Day 🚀

Ever tried comparing two complex JSON payloads or debugging a Git merge conflict in terminal vimdiff while in the middle of an urgent release? 

One missing comma or subtle type coercion (`count: 42` becoming `count: "42"`) can slip past traditional line diffs and cause subtle production bugs.

For **Day 6 / 30**, I built **DiffMaster** — a visual diff and 3-way merge studio built with **React 19**, Longest Common Subsequence (LCS) line & token diffing, structural JSON drift detection, and an interactive Git conflict resolver.

Here is what's packed inside:
• ⚡ **Synchronous Side-by-Side & Unified Diffs**: Line-by-line diffing with inline character/word token highlights for modified lines so you see *exact* word-level edits instantly.
• 🌳 **Semantic Structural JSON Diffing**: Flattens nested JSON payloads to catch key additions, deletions, value changes, and dangerous type shifts (e.g., `string` ➔ `boolean`).
• 🔀 **3-Way Git Merge Conflict Studio**: Compares Base, Current (Ours), and Incoming (Theirs) side-by-side. Provides 1-click conflict cards to accept Ours, accept Theirs, or combine Both with live preview of the resolved file.
• 💾 **One-Click Git Patch Exporter**: Generates standard unified Git `.patch` files ready to apply via `git apply diffmaster-changes.patch`.
• 🎨 **Nordic Glacier Dynamic Palette**: Features a distinct glacial aesthetic (polar teal `#0d9488`, ice cyan `#a5f3fc`, arctic blue, deep navy) plus 3 switchable palettes (Emerald Matrix, Obsidian Sunset, Cyber Synthwave).
• ☁️ **1-Click Firebase Hosting Ready**: Out-of-the-box `firebase.json` and `.firebaserc` with optimized static caching and SPA routing.

### ⚙️ Under The Hood
• **Modular React 19 Architecture**: Completely broken down into dedicated components (`Header`, `DiffControls`, `SideBySideDiff`, `UnifiedDiff`, `JsonSemanticDiff`, `ThreeWayMerge`, `Toast`).
• **10/10 Automated Tests**: 100% green test suite testing LCS line backtracking, tokenization, JSON flattening, type comparison, and 3-way conflict resolution using Node.js's native test runner (`node --test`).
• **Self-Contained Git Versioning**: Git repository initialized cleanly inside the folder before writing code.
• **Zero Monoliths & Zero Day Labels**: Clean commercial product design without clutter.

Check out the 4 snapshots below showing the Side-by-Side Code Diff, Unified Patch View, Semantic JSON Drift Inspector, and the 3-Way Merge Conflict Resolver!

👉 For developers: When you hit a gnarly merge conflict or schema drift, do you resolve it inside VS Code, terminal CLI tools, or a dedicated GUI diff tool?

#buildinpublic #30daychallenge #softwareengineering #react #javascript #devtools #git #webdevelopment #coding #frontend
