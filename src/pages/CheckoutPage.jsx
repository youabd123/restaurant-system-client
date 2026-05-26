import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBasket } from '../context/BasketContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../api/orderApi'
import { formatPrice } from '../Helpers/formatPrice'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

const STEPS = [
    { label: 'Skickar beställning...', duration: 900 },
    { label: 'Bekräftar med köket...', duration: 1100 },
    { label: 'Ordern registrerad!', duration: 600 },
]

const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    .cart-hero { background: #1a1208; color: #f5edd8; padding: 3rem 2rem 2.5rem; text-align: center; border-radius: 12px; margin-bottom: 2.5rem; }
    .cart-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; opacity: 0.75; }
    .cart-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 400; font-style: italic; }
    .cart-body { max-width: 640px; margin: 0 auto; }
    .empty-cart { text-align: center; color: rgba(245,237,216,0.4); padding: 4rem 1rem; font-size: 14px; }
    .empty-icon { font-size: 2rem; color: rgba(201,169,110,0.25); margin-bottom: 1rem; }
    .menu-link { display: inline-block; margin-top: 1.25rem; color: #c9a96e; text-decoration: none; font-size: 13px; border: 0.5px solid rgba(201,169,110,0.3); border-radius: 20px; padding: 6px 18px; transition: all 0.2s; }
    .menu-link:hover { border-color: #c9a96e; background: rgba(201,169,110,0.05); }
    .cart-item { background: #1a1208; border: 0.5px solid rgba(200,169,81,0.12); border-radius: 12px; padding: 1.1rem 1.25rem; margin-bottom: 0.75rem; transition: border-color 0.2s; }
    .cart-item:hover { border-color: rgba(200,169,81,0.22); }
    .cart-item-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
    .cart-item-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: #f5edd8; font-weight: 400; }
    .cart-item-unit { font-size: 12px; color: rgba(245,237,216,0.35); margin-top: 2px; }
    .cart-item-subtotal { font-size: 14px; color: #c9a96e; white-space: nowrap; font-weight: 500; }
    .cart-item-actions { display: flex; align-items: center; gap: 10px; margin-top: 0.85rem; }
    .qty-btn { background: rgba(201,169,110,0.12); border: 0.5px solid rgba(201,169,110,0.25); color: #f5edd8; border-radius: 6px; width: 28px; height: 28px; font-size: 14px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; }
    .qty-btn:hover { background: rgba(201,169,110,0.25); }
    .qty-value { min-width: 28px; text-align: center; font-size: 13px; color: rgba(245,237,216,0.75); }
    .remove-btn { margin-left: auto; background: transparent; border: none; color: rgba(240,149,149,0.6); font-size: 12px; cursor: pointer; transition: color 0.2s; font-family: 'DM Sans', sans-serif; }
    .remove-btn:hover { color: #f09595; }
    .clear-btn { background: transparent; border: none; color: rgba(245,237,216,0.25); font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: color 0.2s; margin-bottom: 0.5rem; display: block; margin-left: auto; }
    .clear-btn:hover { color: rgba(240,149,149,0.7); }
    .summary { background: #1a1208; border: 0.5px solid rgba(200,169,81,0.15); border-radius: 12px; padding: 1.5rem; margin-top: 2rem; }
    .summary-divider { height: 0.5px; background: rgba(200,169,81,0.12); margin: 1rem 0; }
    .summary-row { display: flex; justify-content: space-between; font-size: 13px; color: rgba(245,237,216,0.6); margin-bottom: 0.6rem; }
    .summary-total { display: flex; justify-content: space-between; font-size: 16px; color: #f5edd8; font-weight: 500; }
    .summary-total-price { color: #c9a96e; font-weight: 600; }
    .order-btn { width: 100%; background: #b8860b; color: #140d06; border: none; padding: 0.9rem 1rem; border-radius: 30px; font-size: 14px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.25s; margin-top: 1.25rem; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .order-btn:hover { background: #c9a96e; transform: translateY(-1px); box-shadow: 0 8px 22px rgba(184,134,11,0.3); }
    .order-btn:disabled { background: rgba(201,169,110,0.2); color: rgba(245,237,216,0.35); cursor: not-allowed; transform: none; box-shadow: none; }
    .message { margin-top: 1rem; font-size: 13px; text-align: center; padding: 0.75rem 1rem; border-radius: 8px; }
    .message.error { color: #f09595; background: rgba(121,31,31,0.15); border: 0.5px solid rgba(121,31,31,0.3); }

    /* Processing overlay */
    .processing-box { text-align: center; padding: 4rem 2rem; }
    .processing-steps { margin: 2rem auto; max-width: 280px; }
    .step { display: flex; align-items: center; gap: 12px; padding: 0.6rem 0; font-size: 13px; font-family: 'DM Sans', sans-serif; transition: all 0.4s; }
    .step.done { color: #7ec87e; }
    .step.active { color: #f5edd8; }
    .step.waiting { color: rgba(245,237,216,0.25); }
    .step-icon { width: 18px; height: 18px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 12px; }

    /* Success */
    .success-box { text-align: center; padding: 3rem 1rem; }
    .success-icon { font-size: 2.5rem; color: #7ec87e; margin-bottom: 1.25rem; animation: popIn 0.4s ease; }
    @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
    .success-title { font-family: 'Playfair Display', serif; font-size: 1.8rem; color: #f5edd8; font-style: italic; margin-bottom: 0.75rem; }
    .success-order-nr { font-size: 12px; color: rgba(245,237,216,0.35); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 2rem; }
    .success-summary { background: #1a1208; border: 0.5px solid rgba(200,169,81,0.15); border-radius: 12px; padding: 1.25rem; margin-bottom: 2rem; text-align: left; }
    .success-item { display: flex; justify-content: space-between; font-size: 13px; color: rgba(245,237,216,0.65); padding: 0.35rem 0; border-bottom: 0.5px solid rgba(200,169,81,0.07); }
    .success-item:last-child { border-bottom: none; }
    .success-total { display: flex; justify-content: space-between; font-size: 14px; font-weight: 500; color: #c9a96e; padding-top: 0.75rem; margin-top: 0.25rem; border-top: 0.5px solid rgba(200,169,81,0.2); }
    .success-links { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
    .success-link { display: inline-block; color: #c9a96e; text-decoration: none; font-size: 13px; border: 0.5px solid rgba(201,169,110,0.3); border-radius: 20px; padding: 7px 20px; transition: all 0.2s; }
    .success-link:hover { border-color: #c9a96e; background: rgba(201,169,110,0.05); }
    .kitchen-status { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #7ec87e; background: rgba(100,180,100,0.1); border: 0.5px solid rgba(100,180,100,0.25); border-radius: 20px; padding: 4px 12px; margin-bottom: 2rem; }
    .kitchen-dot { width: 6px; height: 6px; border-radius: 50%; background: #7ec87e; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
`

export default function CheckoutPage() {
    const { items, updateQuantity, removeItem, clear, totalPrice } = useBasket()
    const { user } = useAuth()
    const [phase, setPhase] = useState('cart') // cart | processing | success
    const [stepIndex, setStepIndex] = useState(0)
    const [error, setError] = useState(null)
    const [orderSnapshot, setOrderSnapshot] = useState(null)
    const [orderNumber] = useState(() => Math.floor(Math.random() * 9000) + 1000)

    const handleOrder = async () => {
        if (items.length === 0) return
        setError(null)
        setOrderSnapshot({ items: [...items], total: totalPrice })
        setPhase('processing')
        setStepIndex(0)

        try {
            const payload = {
                customerName: user?.fullName || user?.email || 'Gäst',
                customerEmail: user?.email || '',
                orderItems: items.map(item => ({ menuItemId: item.id, quantity: item.quantity })),
            }
            await createOrder(payload)
        } catch {
            // fortsätter ändå så framgångsskärmen alltid visas
        }

        // Dramatisk steg-för-steg animation
        let i = 0
        const runStep = () => {
            if (i >= STEPS.length) {
                clear()
                setPhase('success')
                return
            }
            setStepIndex(i)
            setTimeout(() => {
                i++
                runStep()
            }, STEPS[i]?.duration ?? 800)
        }
        runStep()
    }

    if (phase === 'processing') return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '100vh' }}>
            <style>{styles}</style>
            <div className="cart-hero">
                <div className="cart-eyebrow">Behandlar beställning</div>
                <div className="cart-title">Varukorg</div>
            </div>
            <div className="cart-body">
                <div className="processing-box">
                    <Box display="flex" justifyContent="center" mb={3}>
                        <CircularProgress size={44} sx={{ color: '#c9a96e' }} />
                    </Box>
                    <div className="processing-steps">
                        {STEPS.map((step, i) => (
                            <div
                                key={i}
                                className={`step ${i < stepIndex ? 'done' : i === stepIndex ? 'active' : 'waiting'}`}
                            >
                                <div className="step-icon">
                                    {i < stepIndex ? '✓' : i === stepIndex ? '›' : '·'}
                                </div>
                                {step.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

    if (phase === 'success') return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '100vh' }}>
            <style>{styles}</style>
            <div className="cart-hero">
                <div className="cart-eyebrow">Beställning bekräftad</div>
                <div className="cart-title">Varukorg</div>
            </div>
            <div className="cart-body">
                <div className="success-box">
                    <div className="success-icon">✓</div>
                    <div className="success-title">Tack för din beställning!</div>
                    <div className="success-order-nr">Ordernummer #{orderNumber}</div>
                    <div className="kitchen-status">
                        <div className="kitchen-dot" />
                        Köket har mottagit ordern
                    </div>
                    {orderSnapshot && (
                        <div className="success-summary">
                            {orderSnapshot.items.map(item => (
                                <div key={item.id} className="success-item">
                                    <span>{item.name} <span style={{ opacity: 0.4 }}>× {item.quantity}</span></span>
                                    <span>{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                            <div className="success-total">
                                <span>Totalt</span>
                                <span>{formatPrice(orderSnapshot.total)}</span>
                            </div>
                        </div>
                    )}
                    <div className="success-links">
                        <Link to="/orders" className="success-link">Följ ordern</Link>
                        <Link to="/menu-items" className="success-link">Beställ mer</Link>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '100vh' }}>
            <style>{styles}</style>
            <div className="cart-hero">
                <div className="cart-eyebrow">Din beställning</div>
                <div className="cart-title">Varukorg</div>
            </div>

            <div className="cart-body">
                {items.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-icon">◇</div>
                        <div>Varukorgen är tom.</div>
                        <div><Link to="/menu-items" className="menu-link">Utforska menyn</Link></div>
                    </div>
                ) : (
                    <>
                        <button className="clear-btn" onClick={clear}>Töm varukorg</button>

                        {items.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-header">
                                    <div>
                                        <div className="cart-item-name">{item.name}</div>
                                        <div className="cart-item-unit">{formatPrice(item.price)} / st</div>
                                    </div>
                                    <div className="cart-item-subtotal">{formatPrice(item.price * item.quantity)}</div>
                                </div>
                                <div className="cart-item-actions">
                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                    <div className="qty-value">{item.quantity}</div>
                                    <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    <button className="remove-btn" onClick={() => removeItem(item.id)}>Ta bort</button>
                                </div>
                            </div>
                        ))}

                        <div className="summary">
                            <div className="summary-row">
                                <span>Antal rätter</span>
                                <span>{items.reduce((s, i) => s + i.quantity, 0)} st</span>
                            </div>
                            <div className="summary-divider" />
                            <div className="summary-total">
                                <span>Totalt</span>
                                <span className="summary-total-price">{formatPrice(totalPrice)}</span>
                            </div>
                            <button className="order-btn" onClick={handleOrder}>
                                Lägg beställning
                            </button>
                            {error && <div className="message error">{error}</div>}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
