
const mockOrders = [
    { id: 1, customerName: 'Alessandro Rossi', customerEmail: 'a.rossi@gmail.com', status: 'Completed' },
    { id: 2, customerName: 'Sofia Andersson', customerEmail: 'sofia.a@hotmail.com', status: 'Confirmed' },
    { id: 3, customerName: 'Marco Bianchi', customerEmail: 'm.bianchi@gmail.com', status: 'Pending' },
    { id: 4, customerName: 'Emma Lindqvist', customerEmail: 'emma.l@gmail.com', status: 'Cancelled' },
    { id: 5, customerName: 'Luca Ferrari', customerEmail: 'luca.f@yahoo.com', status: 'Completed' },
]

const statusColor = {
    Pending: { bg: 'rgba(200,169,81,0.15)', color: '#c9a96e', border: 'rgba(200,169,81,0.4)' },
    Confirmed: { bg: 'rgba(100,180,100,0.15)', color: '#7ec87e', border: 'rgba(100,180,100,0.4)' },
    Cancelled: { bg: 'rgba(220,80,80,0.15)', color: '#e08080', border: 'rgba(220,80,80,0.4)' },
    Completed: { bg: 'rgba(100,180,100,0.2)', color: '#5db85d', border: 'rgba(100,180,100,0.5)' },
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
.ord-hero { background: #1a1208; color: #f5edd8; padding: 3rem 2rem 2.5rem; text-align: center; border-radius: 12px; margin-bottom: 2.5rem; }
.ord-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; }
.ord-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 700; }
.ord-table { width: 100%; border-collapse: collapse; background: #1a1208; border-radius: 12px; overflow: hidden; border: 0.5px solid rgba(200,169,81,0.3); }
.ord-table th { background: #120d05; font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #c9a96e; padding: 0.85rem 1.25rem; text-align: left; border-bottom: 0.5px solid rgba(200,169,81,0.2); }
.ord-table td { padding: 1rem 1.25rem; border-bottom: 0.5px solid rgba(200,169,81,0.1); font-size: 14px; color: #f5edd8; }
.ord-table tr:last-child td { border-bottom: none; }
.ord-table tr:hover td { background: rgba(200,169,81,0.05); }
.status-badge { display: inline-block; font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: 20px; border: 0.5px solid; }
`

export default function OrdersPage() {
    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{styles}</style>
            <div className="ord-hero">
                <div className="ord-eyebrow">Admin · Skyddad sida</div>
                <div className="ord-title">Ordrar</div>
            </div>
            <table className="ord-table">
                <thead>
                    <tr>
                        <th>Kund</th>
                        <th>E-post</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {mockOrders.map((order) => {
                        const s = statusColor[order.status] || { bg: 'rgba(255,255,255,0.05)', color: '#f5edd8', border: 'rgba(255,255,255,0.2)' }
                        return (
                            <tr key={order.id}>
                                <td>{order.customerName}</td>
                                <td style={{ color: 'rgba(245,237,216,0.6)' }}>{order.customerEmail}</td>
                                <td>
                                    <span className="status-badge" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}