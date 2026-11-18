// day-06-diffmaster/src/components/Toast.jsx
export function Toast({ toast }) {
    if (!toast)
        return null;
    return (React.createElement("div", { style: {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            padding: '12px 20px',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--primary)',
            borderRadius: '10px',
            boxShadow: '0 8px 30px var(--glow)',
            color: '#f8fafc',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            zIndex: 9999,
            fontSize: '0.9rem',
            fontWeight: 600,
            animation: 'fadeIn 0.25s ease-out'
        } },
        React.createElement("span", { style: { fontSize: '1.2rem' } }, "\u2728"),
        React.createElement("span", null, toast.message)));
}
