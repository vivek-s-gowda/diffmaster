// day-06-diffmaster/src/threeWayMerge.js
// 3-Way Merge conflict detection & resolution engine
export class ThreeWayMerger {
    static merge(baseText, currentText, incomingText) {
        const baseLines = (baseText || '').split('\n');
        const currentLines = (currentText || '').split('\n');
        const incomingLines = (incomingText || '').split('\n');
        const maxLen = Math.max(baseLines.length, currentLines.length, incomingLines.length);
        const hunks = [];
        let conflictCount = 0;
        for (let i = 0; i < maxLen; i++) {
            const b = baseLines[i] ?? null;
            const c = currentLines[i] ?? null;
            const inc = incomingLines[i] ?? null;
            if (c === inc) {
                // Both match or both made same change
                if (c !== null)
                    hunks.push({ type: 'clean', text: c });
            }
            else if (c === b && inc !== b) {
                // Only incoming changed
                if (inc !== null)
                    hunks.push({ type: 'incoming_clean', text: inc });
            }
            else if (inc === b && c !== b) {
                // Only current changed
                if (c !== null)
                    hunks.push({ type: 'current_clean', text: c });
            }
            else {
                // Both changed differently -> CONFLICT!
                conflictCount++;
                hunks.push({
                    type: 'conflict',
                    id: `conflict_${conflictCount}`,
                    current: c || '',
                    base: b || '',
                    incoming: inc || '',
                    resolution: 'unresolved' // 'current' | 'incoming' | 'both'
                });
            }
        }
        return {
            hasConflicts: conflictCount > 0,
            conflictCount,
            hunks
        };
    }
    static resolveMergedText(hunks) {
        const out = [];
        for (const h of hunks) {
            if (h.type !== 'conflict') {
                out.push(h.text);
            }
            else {
                if (h.resolution === 'current') {
                    out.push(h.current);
                }
                else if (h.resolution === 'incoming') {
                    out.push(h.incoming);
                }
                else if (h.resolution === 'both') {
                    out.push(h.current);
                    out.push(h.incoming);
                }
                else {
                    // Unresolved git conflict markers
                    out.push(`<<<<<<< CURRENT`);
                    out.push(h.current);
                    out.push(`=======`);
                    out.push(h.incoming);
                    out.push(`>>>>>>> INCOMING`);
                }
            }
        }
        return out.join('\n');
    }
}
