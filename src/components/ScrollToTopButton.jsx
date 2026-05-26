import { useState, useEffect } from 'react'

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Tillbaka upp"
            style={{
                position: 'fixed',
                bottom: 32,
                right: 32,
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: '#b8860b',
                color: '#140d06',
                border: 'none',
                cursor: 'pointer',
                zIndex: 2000,
                fontSize: '20px',
                fontWeight: 700,
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease, background 0.2s',
                pointerEvents: visible ? 'auto' : 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c9a96e' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#b8860b' }}
        >
            ↑
        </button>
    )
}
