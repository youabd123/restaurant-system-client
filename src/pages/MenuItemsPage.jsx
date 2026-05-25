import { useState } from 'react'
import { useMenuItems } from '../hooks/useMenuItems'
import { useCategories } from '../hooks/useCategories'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export default function MenuItemsPage() {
    const { menuItems, loading: loadingItems, error } = useMenuItems()
    const { categories, loading: loadingCats } = useCategories()
    const [activeTab, setActiveTab] = useState('alla')
    const [search, setSearch] = useState('')
    const [openItem, setOpenItem] = useState(null)

    if (loadingItems || loadingCats) return (
        <Box display="flex" justifyContent="center" mt={8}><CircularProgress sx={{ color: '#c9a96e' }} /></Box>
    )
    if (error) return <p style={{ color: '#f09595', textAlign: 'center' }}>{error}</p>

    const filtered = menuItems.filter(item => {
        const matchTab = activeTab === 'alla' || item.categoryId === activeTab
        const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.description?.toLowerCase().includes(search.toLowerCase())
        return matchTab && matchSearch
    })

    const grouped = categories.map(cat => ({
        ...cat,
        items: filtered.filter(i => i.categoryId === cat.id)
    })).filter(cat => cat.items.length > 0)

    const toggleItem = (id) => setOpenItem(openItem === id ? null : id)

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .menu-hero { background: #1a1208; color: #f5edd8; padding: 3rem 2rem 2.5rem; text-align: center; position: relative; overflow: hidden; }
        .menu-hero::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px); }
        .hero-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; }
        .hero-title { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 400; font-style: italic; color: #f5edd8; margin-bottom: 0.5rem; }
        .hero-sub { font-size: 14px; color: rgba(245,237,216,0.6); font-weight: 300; }
        .hero-divider { display: flex; align-items: center; gap: 12px; justify-content: center; margin: 1.25rem 0; color: #c9a96e; font-size: 18px; }
        .hero-divider::before, .hero-divider::after { content: ''; width: 60px; height: 0.5px; background: #c9a96e; opacity: 0.6; }
        .menu-body { max-width: 720px; margin: 0 auto; padding: 0 1.5rem 3rem; }
        .menu-tabs { display: flex; gap: 0; overflow-x: auto; border-bottom: 0.5px solid rgba(200,169,81,0.2); margin-bottom: 2rem; padding-top: 1.5rem; scrollbar-width: none; }
        .menu-tabs::-webkit-scrollbar { display: none; }
        .menu-tab { background: none; border: none; cursor: pointer; padding: 0.6rem 1.25rem; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; color: rgba(245,237,216,0.5); white-space: nowrap; border-bottom: 2px solid transparent; transition: all 0.2s; }
        .menu-tab.active { color: #c9a96e; border-bottom: 2px solid #c9a96e; font-weight: 500; }
        .menu-tab:hover:not(.active) { color: #f5edd8; }
        .search-row { display: flex; gap: 10px; margin-bottom: 1.5rem; }
        .search-input { flex: 1; background: rgba(255,255,255,0.05); border: 0.5px solid rgba(200,169,81,0.25); border-radius: 8px; padding: 0.5rem 0.75rem; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #f5edd8; outline: none; }
        .search-input::placeholder { color: rgba(245,237,216,0.3); }
        .search-input:focus { border-color: #c9a96e; }
        .section-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 400; font-style: italic; color: #f5edd8; margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 0.5px solid rgba(200,169,81,0.2); display: flex; align-items: baseline; gap: 10px; }
        .section-count { font-family: 'DM Sans', sans-serif; font-size: 12px; font-style: normal; color: rgba(245,237,216,0.4); font-weight: 400; }
        .dish-row { display: flex; align-items: flex-start; gap: 1rem; padding: 1.25rem 0; border-bottom: 0.5px solid rgba(200,169,81,0.1); cursor: pointer; transition: background 0.15s; border-radius: 4px; }
        .dish-row:last-child { border-bottom: none; }
        .dish-row:hover { background: rgba(200,169,81,0.05); }
        .dish-content { flex: 1; min-width: 0; }
        .dish-header { display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem; margin-bottom: 4px; }
        .dish-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 400; color: #f5edd8; }
        .dish-price { font-size: 15px; font-weight: 500; color: #c9a96e; white-space: nowrap; }
        .dish-desc { font-size: 13px; color: rgba(245,237,216,0.55); line-height: 1.5; font-weight: 300; }
        .dish-expanded { background: rgba(255,255,255,0.04); border-radius: 8px; padding: 1rem; margin-top: 0.75rem; font-size: 13px; color: rgba(245,237,216,0.6); border: 0.5px solid rgba(200,169,81,0.15); }
        .dish-arrow { font-size: 11px; color: rgba(245,237,216,0.3); margin-left: auto; flex-shrink: 0; transition: transform 0.2s; }
        .dish-arrow.open { transform: rotate(180deg); }
        .empty-state { text-align: center; padding: 3rem 1rem; color: rgba(245,237,216,0.4); font-size: 14px; }
    `

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', background: '#1a1208' }}>
            <style>{styles}</style>
            <div className="menu-hero">
                <div className="hero-eyebrow">Autentisk italiensk matupplevelse</div>
                <h1 className="hero-title">Il Menu</h1>
                <div className="hero-divider">✦</div>
                <div className="hero-sub">Utforska våra italienska delikatesser</div>
            </div>
            <div className="menu-body">
                <div className="menu-tabs">
                    <button className={`menu-tab ${activeTab === 'alla' ? 'active' : ''}`} onClick={() => setActiveTab('alla')}>Alla rätter</button>
                    {categories.map(cat => (
                        <button key={cat.id} className={`menu-tab ${activeTab === cat.id ? 'active' : ''}`} onClick={() => setActiveTab(cat.id)}>
                            {cat.name}
                        </button>
                    ))}
                </div>
                <div className="search-row">
                    <input className="search-input" type="text" placeholder="Sök rätt..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                {filtered.length === 0 && <div className="empty-state">Inga rätter matchar din sökning.</div>}
                {activeTab === 'alla' ? (
                    grouped.map(cat => (
                        <div key={cat.id} style={{ marginBottom: '2.5rem' }}>
                            <div className="section-title">
                                {cat.name} <span className="section-count">{cat.items.length} rätter</span>
                            </div>
                            <div>
                                {cat.items.map(item => (
                                    <DishRow key={item.id} item={item} open={openItem === item.id} onToggle={() => toggleItem(item.id)} />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        {filtered.map(item => (
                            <DishRow key={item.id} item={item} open={openItem === item.id} onToggle={() => toggleItem(item.id)} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

function DishRow({ item, open, onToggle }) {
    return (
        <div className="dish-row" onClick={onToggle}>
            <div className="dish-content">
                <div className="dish-header">
                    <span className="dish-name">{item.name}</span>
                    <span className="dish-price">{Number(item.price).toFixed(2)} kr</span>
                </div>
                <div className="dish-desc">{item.description || 'Tillagad med färska italienska råvaror.'}</div>
                {open && (
                    <div className="dish-expanded">
                        <strong style={{ color: '#c9a96e' }}>Kategori:</strong> {item.categoryId}<br />
                        <strong style={{ color: '#c9a96e' }}>Tillgänglig:</strong> {item.isAvailable ? 'Ja' : 'Nej'}
                    </div>
                )}
            </div>
            <span className={`dish-arrow ${open ? 'open' : ''}`}>▼</span>
        </div>
    )
}