const cards = [
    { icon: '🍝', title: 'Autentiska recept', desc: 'Traditionella toskanska rätter lagade från grunden varje dag' },
    { icon: '🫒', title: 'Färska råvaror', desc: 'Lokala och importerade ingredienser av högsta kvalitet' },
    { icon: '🍷', title: 'Italienska viner', desc: 'Noggrant utvalt vinsortiment direkt från italienska vingårdar' },
]

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
.home-hero { background: #1a1208; color: #f5edd8; padding: 5rem 2rem; text-align: center; border-radius: 12px; margin-bottom: 3rem; }
.home-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 1rem; }
.home-title { font-family: 'Playfair Display', serif; font-size: 3.5rem; font-weight: 700; margin-bottom: 0; }
.home-italic { font-family: 'Playfair Display', serif; font-size: 3.5rem; font-style: italic; color: #c9a96e; }
.home-divider { display: flex; align-items: center; gap: 12px; justify-content: center; margin: 1.5rem 0; color: #c9a96e; font-size: 18px; }
.home-divider::before, .home-divider::after { content: ''; width: 80px; height: 0.5px; background: #c9a96e; opacity: 0.5; }
.home-sub { font-size: 15px; color: rgba(245,237,216,0.6); font-weight: 300; max-width: 400px; margin: 0 auto 2.5rem; line-height: 1.8; }
.home-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.btn-primary { background: #c9a96e; color: #1a1208; border: none; padding: 0.75rem 2rem; border-radius: 30px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; cursor: pointer; text-decoration: none; transition: background 0.2s; }
.btn-primary:hover { background: #b8935a; }
.btn-outline { background: transparent; color: #f5edd8; border: 0.5px solid rgba(245,237,216,0.4); padding: 0.75rem 2rem; border-radius: 30px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; cursor: pointer; text-decoration: none; transition: border-color 0.2s; }
.btn-outline:hover { border-color: #c9a96e; color: #c9a96e; }
.info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
.info-card { background: #1a1208; border: 0.5px solid rgba(200,169,81,0.3); border-radius: 12px; padding: 2rem; text-align: center; }
.info-icon { font-size: 2rem; margin-bottom: 0.75rem; }
.info-title { font-family: 'Playfair Display', serif; font-size: 1.1rem; margin-bottom: 0.5rem; color: #f5edd8; }
.info-desc { font-size: 13px; color: rgba(245,237,216,0.6); font-weight: 300; line-height: 1.6; }
`

export default function HomePage() {
    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{styles}</style>
            <div className="home-hero">
                <div className="home-eyebrow">Göteborg · Sedan 1987</div>
                <div className="home-title">Trattoria</div>
                <div className="home-italic">Bella</div>
                <div className="home-divider">✦</div>
                <div className="home-sub">Autentiskt kök från Toscana — tillagat med kärlek varje dag</div>
                <div className="home-btns">
                    <a href="/menu-items" className="btn-primary">Se menyn</a>
                    <a href="/categories" className="btn-outline">Kategorier</a>
                </div>
            </div>
            <div className="info-grid">
                {cards.map((card) => (
                    <div key={card.title} className="info-card">
                        <div className="info-icon">{card.icon}</div>
                        <div className="info-title">{card.title}</div>
                        <div className="info-desc">{card.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}