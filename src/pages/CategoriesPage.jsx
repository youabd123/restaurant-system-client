import { useCategories } from '../Hooks/useCategories'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const icons = ['🍕', '🍝', '🥗', '🍞', '🥩', '🍮', '🥤', '🍷']

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
.cat-hero { background: #1a1208; color: #f5edd8; padding: 3rem 2rem 2.5rem; text-align: center; border-radius: 12px; margin-bottom: 2.5rem; }
.cat-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; }
.cat-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 700; }
.cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.25rem; }
.cat-card { background: #1a1208; border: 0.5px solid rgba(200,169,81,0.3); border-radius: 12px; padding: 2rem 1.5rem; transition: box-shadow 0.2s, transform 0.2s; }
.cat-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.3); transform: translateY(-2px); }
.cat-icon { font-size: 2.5rem; margin-bottom: 1rem; }
.cat-name { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 400; color: #f5edd8; margin-bottom: 0.4rem; }
.cat-desc { font-size: 13px; color: rgba(245,237,216,0.6); font-weight: 300; line-height: 1.6; }
`

export default function CategoriesPage() {
    const { categories, loading, error } = useCategories()

    if (loading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress sx={{ color: '#c9a96e' }} /></Box>
    if (error) return <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{styles}</style>
            <div className="cat-hero">
                <div className="cat-eyebrow">Vårt sortiment</div>
                <div className="cat-title">Kategorier</div>
            </div>
            <div className="cat-grid">
                {categories.map((cat, i) => (
                    <div key={cat.id} className="cat-card">
                        <div className="cat-icon">{icons[i % icons.length]}</div>
                        <div className="cat-name">{cat.name}</div>
                        <div className="cat-desc">{cat.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}