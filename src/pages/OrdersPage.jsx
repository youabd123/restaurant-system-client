import { useState } from 'react'
import { useOrders } from '../Hooks/useOrders'
import { updateOrder } from '../api/orderApi'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../Helpers/formatPrice'
import { formatDate } from '../Helpers/formatDate'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const statusColor = {
    Pending:   { bg: 'rgba(200,169,81,0.15)',  color: '#c9a96e', border: 'rgba(200,169,81,0.4)' },
    Confirmed: { bg: 'rgba(100,180,100,0.15)', color: '#7ec87e', border: 'rgba(100,180,100,0.4)' },
    Completed: { bg: 'rgba(100,180,100,0.2)',  color: '#5db85d', border: 'rgba(100,180,100,0.5)' },
    Cancelled: { bg: 'rgba(220,80,80,0.15)',   color: '#e08080', border: 'rgba(220,80,80,0.4)' },
}

const STATUSES = ['Pending', 'Confirmed', 'Completed', 'Cancelled']

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
.ord-hero { background: #1a1208; color: #f5edd8; padding: 3rem 2rem 2.5rem; text-align: center; border-radius: 12px; margin-bottom: 2.5rem; }
.ord-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; }
.ord-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 700; }
.ord-table { width: 100%; border-collapse: collapse; background: #1a1208; border-radius: 12px; overflow: hidden; border: 0.5px solid rgba(200,169,81,0.3); }
.ord-table th { background: #120d05; font-size: 11px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #c9a96e; padding: 0.85rem 1.25rem; text-align: left; border-bottom: 0.5px solid rgba(200,169,81,0.2); }
.ord-table td { padding: 1rem 1.25rem; border-bottom: 0.5px solid rgba(200,169,81,0.1); font-size: 14px; color: #f5edd8; vertical-align: middle; }
.ord-table tr:last-child td { border-bottom: none; }
.ord-table tbody tr:hover td { background: rgba(200,169,81,0.04); }
.status-badge { display: inline-block; font-size: 11px; font-weight: 500; padding: 3px 10px; border-radius: 20px; border: 0.5px solid; }
.filter-row { display: flex; gap: 8px; margin-bottom: 1.5rem; flex-wrap: wrap; }
.filter-btn { background: none; border: 0.5px solid rgba(200,169,81,0.2); border-radius: 20px; color: rgba(245,237,216,0.5); font-size: 12px; font-family: 'DM Sans', sans-serif; padding: 4px 14px; cursor: pointer; transition: all 0.2s; }
.filter-btn.active, .filter-btn:hover { border-color: #c9a96e; color: #c9a96e; background: rgba(200,169,81,0.06); }
.expand-btn { background: none; border: none; cursor: pointer; color: rgba(245,237,216,0.3); font-size: 11px; padding: 2px 6px; border-radius: 4px; transition: color 0.2s; }
.expand-btn:hover { color: #c9a96e; }
.items-inner { padding: 0.75rem 1.25rem 1rem 2rem; background: #120d05; }
.item-line { display: flex; justify-content: space-between; padding: 0.35rem 0; border-bottom: 0.5px solid rgba(200,169,81,0.07); font-size: 12px; color: rgba(245,237,216,0.65); }
.item-line:last-child { border-bottom: none; }
.item-total { display: flex; justify-content: flex-end; padding-top: 0.5rem; font-size: 12px; font-weight: 500; color: #c9a96e; }
.status-select { background: transparent; border: 0.5px solid rgba(200,169,81,0.3); border-radius: 6px; color: #c9a96e; font-size: 12px; font-family: 'DM Sans', sans-serif; padding: 3px 6px; cursor: pointer; outline: none; }
.status-select option { background: #1a1208; color: #f5edd8; }
.empty { text-align: center; padding: 3rem; color: rgba(245,237,216,0.4); font-size: 14px; }
`

export default function OrdersPage() {
    const { orders, setOrders, loading, error } = useOrders()
    const { user } = useAuth()
    const isAdmin = user?.roles?.includes('Admin')

    const [expandedId, setExpandedId] = useState(null)
    const [statusFilter, setStatusFilter] = useState('Alla')
    const [updatingId, setUpdatingId] = useState(null)

    const handleStatusChange = async (orderId, newStatus) => {
        setUpdatingId(orderId)
        try {
            await updateOrder(orderId, { id: orderId, status: newStatus })
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
        } catch {
            // tyst fel
        } finally {
            setUpdatingId(null)
        }
    }

    const filtered = statusFilter === 'Alla'
        ? orders
        : orders.filter(o => o.status === statusFilter)

    if (loading) return (
        <Box display="flex" justifyContent="center" mt={8}>
            <CircularProgress sx={{ color: '#c9a96e' }} />
        </Box>
    )

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <style>{styles}</style>
            <div className="ord-hero">
                <div className="ord-eyebrow">{isAdmin ? 'Admin · Orderhantering' : 'Min orderhistorik'}</div>
                <div className="ord-title">Ordrar</div>
            </div>

            <div className="filter-row">
                {['Alla', ...STATUSES].map(s => (
                    <button
                        key={s}
                        className={`filter-btn ${statusFilter === s ? 'active' : ''}`}
                        onClick={() => setStatusFilter(s)}
                    >
                        {s} {s !== 'Alla' && <span style={{ opacity: 0.45 }}>({orders.filter(o => o.status === s).length})</span>}
                    </button>
                ))}
            </div>

            {error && <div className="empty">{error}</div>}
            {!error && filtered.length === 0 && <div className="empty">Inga ordrar hittades.</div>}

            {!error && filtered.length > 0 && (
                <table className="ord-table">
                    <thead>
                        <tr>
                            <th style={{ width: 32 }}></th>
                            <th>#</th>
                            <th>Kund</th>
                            <th>E-post</th>
                            <th>Datum</th>
                            <th>Rätter</th>
                            <th>Totalt</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(order => {
                            const isOpen = expandedId === order.id
                            const total = order.orderItems?.reduce((s, i) => s + i.quantity * i.unitPrice, 0) ?? 0
                            const s = statusColor[order.status] || { bg: 'rgba(255,255,255,0.05)', color: '#f5edd8', border: 'rgba(255,255,255,0.2)' }

                            return (
                                <>
                                    <tr key={order.id}>
                                        <td>
                                            <button className="expand-btn" onClick={() => setExpandedId(isOpen ? null : order.id)}>
                                                {isOpen ? '▲' : '▼'}
                                            </button>
                                        </td>
                                        <td style={{ color: 'rgba(245,237,216,0.35)', fontSize: 12 }}>#{order.id}</td>
                                        <td>{order.customerName}</td>
                                        <td style={{ color: 'rgba(245,237,216,0.55)' }}>{order.customerEmail}</td>
                                        <td style={{ color: 'rgba(245,237,216,0.55)', fontSize: 12 }}>{formatDate(order.createdAt)}</td>
                                        <td style={{ color: 'rgba(245,237,216,0.55)', fontSize: 12 }}>{order.orderItems?.length ?? 0} st</td>
                                        <td style={{ color: '#c9a96e', fontSize: 13 }}>{formatPrice(total)}</td>
                                        <td>
                                            {isAdmin ? (
                                                <select
                                                    className="status-select"
                                                    value={order.status}
                                                    disabled={updatingId === order.id}
                                                    onChange={e => handleStatusChange(order.id, e.target.value)}
                                                >
                                                    {STATUSES.map(st => <option key={st} value={st}>{st}</option>)}
                                                </select>
                                            ) : (
                                                <span className="status-badge" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                                                    {order.status}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                    {isOpen && (
                                        <tr key={`${order.id}-items`}>
                                            <td colSpan={8} style={{ padding: 0, borderBottom: '0.5px solid rgba(200,169,81,0.1)' }}>
                                                <div className="items-inner">
                                                    {order.orderItems?.length > 0 ? (
                                                        <>
                                                            {order.orderItems.map(item => (
                                                                <div key={item.id} className="item-line">
                                                                    <span>{item.menuItemName} <span style={{ opacity: 0.45 }}>× {item.quantity}</span></span>
                                                                    <span>{formatPrice(item.unitPrice * item.quantity)}</span>
                                                                </div>
                                                            ))}
                                                            <div className="item-total">Totalt: {formatPrice(total)}</div>
                                                        </>
                                                    ) : (
                                                        <div style={{ fontSize: 12, color: 'rgba(245,237,216,0.3)' }}>Inga rätter.</div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}
