import { useState } from 'react'
import { useMenuItems } from '../Hooks/useMenuItems'
import { useCategories } from '../Hooks/useCategories'
import { useBasket } from '../context/BasketContext'
import { formatPrice } from '../Helpers/formatPrice'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const CHEFS_PICKS = ['carbonara', 'risotto', 'bistecca', 'branzino', 'tiramis', 'tagliata', 'ossobuco', 'parmigiana', 'lasagne', 'cacio e pepe']

function isChefsPick(name = '') {
    return CHEFS_PICKS.some(k => name.toLowerCase().includes(k))
}

function getAllergens(name = '', description = '') {
    const text = (name + ' ' + (description || '')).toLowerCase()
    const allergens = []
    if (/pasta|pizza|spaghetti|penne|rigatoni|tagliatelle|fettuccine|lasagne|gnocchi|ravioli|tortellini|pappardelle|linguine|bruschetta|focaccia|tiramis|cannoli|calzone|carbonara/.test(text)) allergens.push('G')
    if (/carbonara|panna|crema|mozzarella|parmesan|ricotta|formaggi|burro|besciamella|tiramis|risotto|cream|mascarpone/.test(text)) allergens.push('L')
    if (/\bvegan\b|vegansk/.test(text)) allergens.push('V')
    return allergens
}

export default function MenuItemsPage() {
    const { menuItems, loading: loadingItems, error } = useMenuItems()
    const { categories, loading: loadingCats } = useCategories()
    const { addItem } = useBasket()
    const [activeTab, setActiveTab] = useState('alla')
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('default')
    const [openItem, setOpenItem] = useState(null)

    if (loadingItems || loadingCats) return (
        <Box display="flex" justifyContent="center" mt={8}>
            <CircularProgress sx={{ color: '#c9a96e' }} />
        </Box>
    )
    if (error) return (
        <Box sx={{ textAlign: 'center', mt: 8, color: '#f09595', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>
            {error}
        </Box>
    )

    let filtered = menuItems.filter(item => {
        const matchTab = activeTab === 'alla' || item.categoryId === activeTab
        const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.description?.toLowerCase().includes(search.toLowerCase())
        return matchTab && matchSearch
    })

    if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
    if (sort === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))

    const grouped = categories.map(cat => ({
        ...cat,
        items: filtered.filter(i => i.categoryId === cat.id)
    })).filter(cat => cat.items.length > 0)

    const toggleItem = (id) => setOpenItem(openItem === id ? null : id)

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .menu-hero { background: #1a1208; color: #f5edd8; padding: 3rem 2rem 2.5rem; text-align: center; position: relative; overflow: hidden; }
        .menu-hero::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,0.012) 40px, rgba(255,255,255,0.012) 41px); }
        .hero-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; opacity: 0.75; }
        .hero-title { font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 400; font-style: italic; color: #f5edd8; margin-bottom: 0.5rem; }
        .hero-sub { font-size: 14px; color: rgba(245,237,216,0.5); font-weight: 300; }
        .hero-divider { display: flex; align-items: center; gap: 12px; justify-content: center; margin: 1.25rem 0; color: #c9a96e; font-size: 10px; opacity: 0.6; }
        .hero-divider::before, .hero-divider::after { content: ''; width: 50px; height: 0.5px; background: #c9a96e; opacity: 0.5; }
        .menu-body { max-width: 720px; margin: 0 auto; padding: 0 1.5rem 3rem; }
        .menu-tabs { display: flex; gap: 0; overflow-x: auto; border-bottom: 0.5px solid rgba(200,169,81,0.2); margin-bottom: 1.25rem; padding-top: 1.5rem; scrollbar-width: none; }
        .menu-tabs::-webkit-scrollbar { display: none; }
        .menu-tab { background: none; border: none; cursor: pointer; padding: 0.6rem 1.25rem; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; color: rgba(245,237,216,0.5); white-space: nowrap; border-bottom: 2px solid transparent; transition: all 0.2s; }
        .menu-tab.active { color: #c9a96e; border-bottom: 2px solid #c9a96e; font-weight: 500; }
        .menu-tab:hover:not(.active) { color: #f5edd8; }
        .controls-row { display: flex; gap: 10px; margin-bottom: 1.5rem; align-items: center; }
        .search-input { flex: 1; background: rgba(255,255,255,0.05); border: 0.5px solid rgba(200,169,81,0.25); border-radius: 8px; padding: 0.5rem 0.75rem; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #f5edd8; outline: none; }
        .search-input::placeholder { color: rgba(245,237,216,0.3); }
        .search-input:focus { border-color: #c9a96e; }
        .sort-select { background: rgba(255,255,255,0.05); border: 0.5px solid rgba(200,169,81,0.25); border-radius: 8px; padding: 0.5rem 0.75rem; font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(245,237,216,0.7); outline: none; cursor: pointer; }
        .sort-select option { background: #1a1208; color: #f5edd8; }
        .sort-select:focus { border-color: #c9a96e; }
        .section-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 400; font-style: italic; color: #f5edd8; margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 0.5px solid rgba(200,169,81,0.2); display: flex; align-items: baseline; gap: 10px; }
        .section-count { font-family: 'DM Sans', sans-serif; font-size: 12px; font-style: normal; color: rgba(245,237,216,0.4); font-weight: 400; }
        .dish-row { display: flex; align-items: flex-start; gap: 1rem; padding: 1.25rem 0; border-bottom: 0.5px solid rgba(200,169,81,0.1); cursor: pointer; transition: background 0.15s; border-radius: 4px; }
        .dish-row.unavailable { opacity: 0.45; }
        .dish-row:last-child { border-bottom: none; }
        .dish-row:hover { background: rgba(200,169,81,0.05); }
        .dish-content { flex: 1; min-width: 0; }
        .dish-header { display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem; margin-bottom: 4px; flex-wrap: wrap; }
        .dish-name-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .dish-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 400; color: #f5edd8; }
        .chefs-badge { font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500; background: rgba(201,169,110,0.15); color: #c9a96e; border: 0.5px solid rgba(201,169,110,0.35); border-radius: 10px; padding: 2px 7px; letter-spacing: 0.03em; white-space: nowrap; }
        .allergen-badges { display: flex; gap: 3px; align-items: center; margin-left: 2px; }
        .allergen-badge { font-family: 'DM Sans', sans-serif; font-size: 9px; font-weight: 600; border-radius: 3px; padding: 1px 4px; line-height: 1.4; }
        .allergen-badge.G { background: rgba(210,140,60,0.15); color: rgba(210,140,60,0.75); border: 0.5px solid rgba(210,140,60,0.3); }
        .allergen-badge.L { background: rgba(100,160,210,0.12); color: rgba(100,160,210,0.7); border: 0.5px solid rgba(100,160,210,0.25); }
        .allergen-badge.V { background: rgba(100,180,100,0.12); color: rgba(100,200,100,0.7); border: 0.5px solid rgba(100,180,100,0.25); }
        .dish-price { font-size: 15px; font-weight: 500; color: #c9a96e; white-space: nowrap; }
        .dish-desc { font-size: 13px; color: rgba(245,237,216,0.55); line-height: 1.5; font-weight: 300; }
        .dish-actions { display: flex; align-items: center; gap: 10px; margin-top: 0.6rem; }
        .add-btn { background: #b8860b; color: #140d06; border: none; padding: 0.45rem 0.9rem; border-radius: 999px; font-size: 12px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
        .add-btn:hover { background: #c9a96e; transform: translateY(-1px); }
        .add-btn:disabled { background: rgba(100,100,100,0.2); color: rgba(245,237,216,0.3); cursor: not-allowed; transform: none; border: 0.5px solid rgba(255,255,255,0.08); }
        .unavail-tag { font-size: 10px; color: rgba(245,237,216,0.3); letter-spacing: 0.05em; border: 0.5px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 2px 8px; }
        .dish-arrow { font-size: 11px; color: rgba(245,237,216,0.3); margin-left: auto; flex-shrink: 0; transition: transform 0.2s; }
        .dish-arrow.open { transform: rotate(180deg); }
        .empty-state { text-align: center; padding: 3rem 1rem; color: rgba(245,237,216,0.4); font-size: 14px; }
        .allergen-legend { font-family: 'DM Sans', sans-serif; font-size: 11px; color: rgba(245,237,216,0.3); display: flex; gap: 12px; margin-bottom: 1.25rem; flex-wrap: wrap; }
        .allergen-legend span { display: flex; align-items: center; gap: 4px; }
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
                    <button className={`menu-tab ${activeTab === 'alla' ? 'active' : ''}`} onClick={() => setActiveTab('alla')}>
                        Alla rätter
                    </button>
                    {categories.map(cat => (
                        <button key={cat.id} className={`menu-tab ${activeTab === cat.id ? 'active' : ''}`} onClick={() => setActiveTab(cat.id)}>
                            {cat.name}
                        </button>
                    ))}
                </div>

                <div className="controls-row">
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Sök rätt..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="default">Sortera</option>
                        <option value="price-asc">Pris: Lågt → Högt</option>
                        <option value="price-desc">Pris: Högt → Lågt</option>
                        <option value="name">Alfabetisk</option>
                    </select>
                </div>

                <div className="allergen-legend">
                    <span><span className="allergen-badge G">G</span> Gluten</span>
                    <span><span className="allergen-badge L">L</span> Laktos</span>
                    <span><span className="allergen-badge V">V</span> Vegan</span>
                </div>

                {filtered.length === 0 && <div className="empty-state">Inga rätter matchar din sökning.</div>}

                {activeTab === 'alla' ? (
                    grouped.map(cat => (
                        <div key={cat.id} style={{ marginBottom: '2.5rem' }}>
                            <div className="section-title">
                                {cat.name} <span className="section-count">{cat.items.length} rätter</span>
                            </div>
                            {cat.items.map(item => (
                                <DishRow key={item.id} item={item} open={openItem === item.id} onToggle={() => toggleItem(item.id)} onAdd={() => addItem(item)} />
                            ))}
                        </div>
                    ))
                ) : (
                    filtered.map(item => (
                        <DishRow key={item.id} item={item} open={openItem === item.id} onToggle={() => toggleItem(item.id)} onAdd={() => addItem(item)} />
                    ))
                )}
            </div>
        </div>
    )
}

function DishRow({ item, open, onToggle, onAdd }) {
    const isAvailable = item.isAvailable !== false
    const chefsPick = isChefsPick(item.name)
    const allergens = getAllergens(item.name, item.description)

    return (
        <div className={`dish-row${isAvailable ? '' : ' unavailable'}`} onClick={onToggle}>
            <div className="dish-content">
                <div className="dish-header">
                    <div className="dish-name-row">
                        <span className="dish-name">{item.name}</span>
                        {chefsPick && <span className="chefs-badge">✦ Kockens val</span>}
                        {allergens.length > 0 && (
                            <span className="allergen-badges">
                                {allergens.map(a => <span key={a} className={`allergen-badge ${a}`}>{a}</span>)}
                            </span>
                        )}
                    </div>
                    <span className="dish-price">{formatPrice(item.price)}</span>
                </div>
                <div className="dish-desc">{item.description || 'Tillagad med färska italienska råvaror.'}</div>
                <div className="dish-actions">
                    <button
                        className="add-btn"
                        onClick={e => { e.stopPropagation(); if (isAvailable) onAdd() }}
                        disabled={!isAvailable}
                    >
                        {isAvailable ? 'Lägg i varukorg' : 'Ej tillgänglig'}
                    </button>
                    {!isAvailable && <span className="unavail-tag">Tillfälligt slut</span>}
                </div>
            </div>
            <span className={`dish-arrow${open ? ' open' : ''}`}>▼</span>
        </div>
    )
}
