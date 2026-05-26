import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../api/categoryApi'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const gradients = [
    'linear-gradient(135deg, #1a1208 0%, #221508 100%)',
    'linear-gradient(135deg, #1a1208 0%, #1e1710 100%)',
    'linear-gradient(135deg, #1a1208 0%, #1c1a0e 100%)',
    'linear-gradient(135deg, #1a1208 0%, #201208 100%)',
]

export default function CategoriesPage() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getCategories()
            .then((res) => setCategories(res.data))
            .catch(() => setError('Kunde inte hämta kategorier.'))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return (
        <Box display="flex" justifyContent="center" mt={8}>
            <CircularProgress sx={{ color: '#c9a96e' }} />
        </Box>
    )

    if (error) return (
        <Box sx={{ textAlign: 'center', mt: 8, color: '#f09595', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>
            {error}
        </Box>
    )

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .cat-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
        }

        .cat-grid .cat-card:nth-child(1) { grid-column: span 2; }
        .cat-grid .cat-card:nth-child(4) { grid-column: span 2; }
        .cat-grid .cat-card:nth-child(7) { grid-column: span 2; }

        @media (max-width: 700px) {
            .cat-grid { grid-template-columns: 1fr; }
            .cat-grid .cat-card:nth-child(n) { grid-column: span 1; }
        }

        .cat-card {
            position: relative;
            border-radius: 10px;
            padding: 1rem 1.1rem;
            border: 0.5px solid rgba(201,169,110,0.1);
            cursor: pointer;
            transition: all 0.35s cubic-bezier(0.25,0.8,0.25,1);
            overflow: hidden;
            min-height: 90px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .cat-card::before {
            content: '';
            position: absolute;
            inset: 0;
            background: radial-gradient(ellipse at top right, rgba(201,169,110,0.06) 0%, transparent 65%);
            pointer-events: none;
        }

        .cat-card:hover {
            border-color: rgba(201,169,110,0.3);
            transform: translateY(-3px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.4);
        }

        .cat-card:hover .cat-link { opacity: 1; transform: translateX(0); }
        .cat-card:hover .cat-divider { width: 36px; }
        .cat-card:hover .cat-ornament { color: rgba(201,169,110,0.09); }

        .cat-number {
            font-family: 'Playfair Display', serif;
            font-size: 10px;
            color: rgba(201,169,110,0.35);
            letter-spacing: 0.2em;
            margin-bottom: 0.5rem;
        }

        .cat-name {
            font-family: 'Playfair Display', serif;
            font-size: 1rem;
            font-weight: 400;
            color: #f5edd8;
            line-height: 1.3;
        }

        .cat-divider {
            width: 22px;
            height: 0.5px;
            background: rgba(201,169,110,0.35);
            margin: 0.4rem 0;
            transition: width 0.3s;
        }

        .cat-desc {
            font-family: 'DM Sans', sans-serif;
            font-size: 11px;
            color: rgba(245,237,216,0.38);
            font-weight: 300;
            line-height: 1.5;
        }

        .cat-link {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-family: 'DM Sans', sans-serif;
            font-size: 11px;
            color: #c9a96e;
            margin-top: 0.5rem;
            opacity: 0;
            transform: translateX(-6px);
            transition: all 0.3s;
            letter-spacing: 0.05em;
        }

        .cat-ornament {
            position: absolute;
            bottom: 10px;
            right: 14px;
            font-size: 20px;
            color: rgba(201,169,110,0.05);
            font-family: 'Playfair Display', serif;
            font-style: italic;
            pointer-events: none;
            transition: color 0.3s;
        }
    `

    return (
        <Box sx={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{styles}</style>

            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '2rem',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    color: '#f5edd8',
                    mb: 1,
                }}>
                    Kategorier
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 40, height: '0.5px', bgcolor: 'rgba(201,169,110,0.3)' }} />
                    <Box sx={{ color: '#c9a96e', fontSize: '9px', opacity: 0.5 }}>✦</Box>
                    <Box sx={{ width: 40, height: '0.5px', bgcolor: 'rgba(201,169,110,0.3)' }} />
                </Box>
            </Box>

            <div className="cat-grid">
                {categories.map((cat, index) => (
                    <div
                        key={cat.id}
                        className="cat-card"
                        style={{ background: gradients[index % gradients.length] }}
                        onClick={() => navigate('/menu-items')}
                    >
                        <div className="cat-number">
                            {String(index + 1).padStart(2, '0')}
                        </div>
                        <div>
                            <div className="cat-name">{cat.name}</div>
                            <div className="cat-divider" />
                            <div className="cat-desc">
                                {cat.description || 'Traditionellt tillagade råvaror av högsta kvalitet.'}
                            </div>
                            <div className="cat-link">Se rätter →</div>
                        </div>
                        <div className="cat-ornament">✦</div>
                    </div>
                ))}
            </div>
        </Box>
    )
}