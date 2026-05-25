import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBasket } from '../context/BasketContext'
import { useAuth } from '../context/AuthContext'
import { createOrder } from '../api/orderApi'
import { formatPrice } from '../Helpers/formatPrice'

export default function CheckoutPage() {
    const { items, updateQuantity, removeItem, clear, totalPrice } = useBasket()
    const { user } = useAuth()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleOrder = async () => {
        if (items.length === 0 || submitting) return

        setSubmitting(true)
        setError(null)
        setSuccess(null)

        try {
            const payload = {
                items: items.map((item) => ({
                    menuItemId: item.id,
                    quantity: item.quantity
                })),
                totalPrice
            }

            if (user?.email) {
                payload.customerEmail = user.email
            }

            await createOrder(payload)
            clear()
            setSuccess('Din order är mottagen.')
        } catch (err) {
            const status = err?.response?.status
            setError(status === 401 ? 'Du behöver logga in för att beställa.' : 'Kunde inte skapa order.')
        } finally {
            setSubmitting(false)
        }
    }

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .cart-hero { background: #1a1208; color: #f5edd8; padding: 3rem 2rem 2.5rem; text-align: center; border-radius: 12px; margin-bottom: 2.5rem; }
        .cart-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.75rem; }
        .cart-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 400; font-style: italic; }
        .cart-body { max-width: 720px; margin: 0 auto; }
        .empty-cart { text-align: center; color: rgba(245,237,216,0.5); padding: 3rem 1rem; font-size: 14px; }
        .menu-link { display: inline-block; margin-top: 1rem; color: #c9a96e; text-decoration: none; font-size: 13px; }
        .cart-item { background: #1a1208; border: 0.5px solid rgba(200,169,81,0.2); border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1rem; }
        .cart-item-header { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .cart-item-name { font-family: 'Playfair Display', serif; font-size: 1.05rem; color: #f5edd8; }
        .cart-item-price { font-size: 14px; color: #c9a96e; }
        .cart-item-actions { display: flex; align-items: center; gap: 10px; margin-top: 0.75rem; }
        .qty-btn { background: rgba(201,169,110,0.2); border: 1px solid rgba(201,169,110,0.35); color: #f5edd8; border-radius: 6px; width: 28px; height: 28px; font-size: 14px; cursor: pointer; }
        .qty-btn:hover { background: rgba(201,169,110,0.35); }
        .qty-value { min-width: 28px; text-align: center; font-size: 13px; color: rgba(245,237,216,0.8); }
        .remove-btn { margin-left: auto; background: transparent; border: none; color: rgba(240,149,149,0.9); font-size: 12px; cursor: pointer; }
        .remove-btn:hover { color: #f09595; }
        .summary { background: #1a1208; border: 0.5px solid rgba(200,169,81,0.2); border-radius: 12px; padding: 1.25rem; margin-top: 2rem; }
        .summary-row { display: flex; justify-content: space-between; color: #f5edd8; font-size: 14px; margin-bottom: 1rem; }
        .order-btn { width: 100%; background: #b8860b; color: #140d06; border: none; padding: 0.85rem 1rem; border-radius: 30px; font-size: 14px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.2s; }
        .order-btn:hover { background: #c9a96e; transform: translateY(-1px); }
        .order-btn:disabled { background: rgba(201,169,110,0.25); color: rgba(245,237,216,0.4); cursor: not-allowed; transform: none; }
        .message { margin-top: 1rem; font-size: 13px; text-align: center; }
        .message.error { color: #f09595; }
        .message.success { color: #7ec87e; }
    `

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
                        Varukorgen är tom.
                        <div>
                            <Link to="/menu-items" className="menu-link">Till menyn</Link>
                        </div>
                    </div>
                ) : (
                    <>
                        {items.map((item) => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-header">
                                    <div className="cart-item-name">{item.name}</div>
                                    <div className="cart-item-price">{formatPrice(item.price)}</div>
                                </div>
                                <div className="cart-item-actions">
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        −
                                    </button>
                                    <div className="qty-value">{item.quantity}</div>
                                    <button
                                        className="qty-btn"
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                                        Ta bort
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="summary">
                            <div className="summary-row">
                                <span>Totalt</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            <button className="order-btn" onClick={handleOrder} disabled={submitting}>
                                {submitting ? 'Skickar order...' : 'Beställ'}
                            </button>
                            {error && <div className="message error">{error}</div>}
                            {success && <div className="message success">{success}</div>}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
