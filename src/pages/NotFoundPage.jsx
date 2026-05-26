import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div style={{
            fontFamily: "'DM Sans', sans-serif",
            textAlign: 'center',
            padding: '5rem 2rem',
            minHeight: '60vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400;500&display=swap');`}</style>

            <div style={{ fontSize: '3rem', color: 'rgba(201,169,110,0.2)', marginBottom: '1.5rem' }}>✦</div>

            <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '5rem',
                fontWeight: 400,
                color: 'rgba(201,169,110,0.3)',
                margin: 0,
                lineHeight: 1,
            }}>
                404
            </h1>

            <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.4rem',
                fontStyle: 'italic',
                color: '#f5edd8',
                margin: '1.25rem 0 0.5rem',
            }}>
                Sidan hittades inte
            </p>

            <p style={{ fontSize: '13px', color: 'rgba(245,237,216,0.4)', marginBottom: '2.5rem' }}>
                Det verkar som att du har gått vilse i köket.
            </p>

            <Link
                to="/"
                style={{
                    color: '#c9a96e',
                    textDecoration: 'none',
                    fontSize: '13px',
                    border: '0.5px solid rgba(201,169,110,0.3)',
                    borderRadius: '20px',
                    padding: '7px 22px',
                    transition: 'all 0.2s',
                }}
            >
                Tillbaka till startsidan
            </Link>
        </div>
    )
}
