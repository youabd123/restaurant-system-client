import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBasket } from '../context/BasketContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../api/orderApi'
import { formatPrice } from '../Helpers/formatPrice'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

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
    .qty-btn:hover { background: rgba(201,169,110,0.25); border-color: rgba(201,169,110,0.4); }
    .qty-value { min-width: 28px; text-align: center; font-size: 13px; color: rgba(245,237,216,0.75); }
    .remove-btn { margin-left: auto; background: transparent; border: none; color: rgba(240,149,149,0.6); font-size: 12px; cursor: pointer; transition: color 0.2s; font-family: 'DM Sans', sans-serif; }
    .remove-btn:hover { color: #f09595; }
    .summary { background: #1a1208; border: 0.5px solid rgba(200,169,81,0.15); border-radius: 12px; padding: 1.5rem; margin-top: 2rem; }
    .summary-divider { height: 0.5px; background: rgba(200,169,81,0.12); margin: 1rem 0; }
    .summary-row { display: flex; justify-content: space-between; font-size: 13px; color: rgba(245,237,216,0.6); margin-bottom: 0.6rem; }
    .summary-total { display: flex; justify-content: space-between; font-size: 16px; color: #f5edd8; font-weight: 500; margin-top: 0; }
    .summary-total-price { color: #c9a96e; font-weight: 600; }
    .order-btn { width: 100%; background: #b8860b; color: #140d06; border: none; padding: 0.9rem 1rem; border-radius: 30px; font-size: 14px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.25s; margin-top: 1.25rem; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .order-btn:hover { background: #c9a96e; transform: translateY(-1px); box-shadow: 0 8px 22px rgba(184,134,11,0.3); }
    .order-btn:disabled { background: rgba(201,169,110,0.2); color: rgba(245,237,216,0.35); cursor: not-allowed; transform: none; box-shadow: none; }
    .message { margin-top: 1rem; font-size: 13px; text-align: center; padding: 0.75rem 1rem; border-radius: 8px; }
    .message.error { color: #f09595; background: rgba(121,31,31,0.15); border: 0.5px solid rgba(121,31,31,0.3); }
    .success-box { text-align: center; padding: 3rem 1rem; }
    .success-icon { font-size: 2rem; color: #7ec87e; margin-bottom: 1.25rem; }
    .success-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; color: #f5edd8; font-style: italic; margin-bottom: 0.75rem; }
    .success-sub { font-size: 13px; color: rgba(245,237,216,0.45); margin-bottom: 1.75rem; line-height: 1.7; }
    .success-link { display: inline-block; color: #c9a96e; text-decoration: none; font-size: 13px; border: 0.5px solid rgba(201,169,110,0.3); border-radius: 20px; padding: 7px 20px; transition: all 0.2s; margin: 0 6px; }
    .success-link:hover { border-color: #c9a96e; background: rgba(201,169,110,0.05); }
`

export default function CheckoutPage() {
    const { items, updateQuantity, removeItem, clear, totalPrice } = useBasket()
    const { user } = useAuth()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleOrder = async () => {
        if (items.length === 0 || submitting) return
        setSubmitting(true)
        setError(null)
        try {
            const payload = {
                customerName: user?.fullName || user?.email || 'Gäst',
                customerEmail: user?.email || '',
                orderItems: items.map((item) => ({ menuItemId: item.id, quantity: item.quantity })),
            }
            await createOrder(payload)
            clear()
            setSuccess(true)
        } catch (err) {
            const status = err?.response?.status
            setError(status === 401
                ? 'Du behöver logga in för att beställa.'
                : 'Kunde inte skicka ordern. Försök igen.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '100vh' }}>
            <style>{styles}</style>
            <div className="cart-hero">
                <div className="cart-eyebrow">Din beställning</div>
                <div className="cart-title">Varukorg</div>
            </div>

            <div className="cart-body">
                {success ? (
                    <div className="success-box">
                        <div className="success-icon">✓</div>
                        <div className="success-title">Tack för din beställning!</div>
                        <div className="success-sub">
                            Din order är mottagen och hanteras av köket.<br />
                            Du kan följa din order under Ordrar.
                        </div>
                        <div>
                            <Link to="/orders" className="success-link">Mina ordrar</Link>
                            <Link to="/menu-items" className="success-link">Till menyn</Link>
                        </div>
                    </div>
                ) : items.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-icon">◇</div>
                        <div>Varukorgen är tom.</div>
                        <div>
                            <Link to="/menu-items" className="menu-link">Utforska menyn</Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {items.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-header">
                                    <div>
                                        <div className="cart-item-name">{item.name}</div>
                                        <div className="cart-item-unit">{formatPrice(item.price)} / st</div>
                                    </div>
                                    <div className="cart-item-subtotal">
                                        {formatPrice(item.price * item.quantity)}
                                    </div>
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
                            <button className="order-btn" onClick={handleOrder} disabled={submitting}>
                                {submitting
                                    ? <><Box component="span" sx={{ display: 'inline-flex' }}><CircularProgress size={14} sx={{ color: '#140d06' }} /></Box> Skickar order...</>
                                    : 'Lägg beställning'
                                }
                            </button>
                            {error && <div className="message error">{error}</div>}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
