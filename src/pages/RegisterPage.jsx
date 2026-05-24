import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register as registerApi } from '../api/authApi'

export default function RegisterPage() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            await registerApi({ fullName, email, password })
            navigate('/login')
        } catch {
            setError('Registrering misslyckades')
        }
    }

    const styles = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .auth-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #FDF6EE; }
        .auth-box { background: #1a1208; border: 0.5px solid rgba(200,169,81,0.3); border-radius: 16px; padding: 3rem 2.5rem; width: 100%; max-width: 400px; }
        .auth-title { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 700; color: #f5edd8; margin-bottom: 0.25rem; }
        .auth-sub { font-size: 13px; color: rgba(245,237,216,0.5); margin-bottom: 2rem; }
        .auth-label { font-size: 12px; font-weight: 500; color: rgba(245,237,216,0.6); letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 6px; display: block; }
        .auth-input { width: 100%; background: rgba(255,255,255,0.05); border: 0.5px solid rgba(200,169,81,0.25); border-radius: 8px; padding: 0.65rem 0.9rem; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #f5edd8; outline: none; box-sizing: border-box; margin-bottom: 1.25rem; }
        .auth-input:focus { border-color: #c9a96e; }
        .auth-input::placeholder { color: rgba(245,237,216,0.3); }
        .auth-btn { width: 100%; background: #c9a96e; color: #1a1208; border: none; padding: 0.75rem; border-radius: 30px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; cursor: pointer; transition: background 0.2s; margin-top: 0.5rem; }
        .auth-btn:hover { background: #b8935a; }
        .auth-link { display: block; text-align: center; margin-top: 1rem; font-size: 13px; color: rgba(245,237,216,0.5); text-decoration: none; }
        .auth-link span { color: #c9a96e; font-weight: 500; }
        .auth-error { background: rgba(220,80,80,0.15); border: 0.5px solid rgba(220,80,80,0.4); border-radius: 8px; padding: 0.65rem 0.9rem; font-size: 13px; color: #e08080; margin-bottom: 1.25rem; }
        .auth-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.5rem; }
    `

    return (
        <div>
            <style>{styles}</style>
            <div className="auth-wrap">
                <div className="auth-box">
                    <div className="auth-eyebrow">Skapa konto</div>
                    <div className="auth-title">Registrera</div>
                    <div className="auth-sub">Fyll i dina uppgifter för att komma igång</div>
                    {error && <div className="auth-error">{error}</div>}
                    <label className="auth-label">Namn</label>
                    <input className="auth-input" type="text" placeholder="Ditt namn" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <label className="auth-label">E-postadress</label>
                    <input className="auth-input" type="email" placeholder="din@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="auth-label">Lösenord</label>
                    <input className="auth-input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="auth-btn" onClick={handleSubmit}>Registrera</button>
                    <a href="/login" className="auth-link">Har du redan ett konto? <span>Logga in</span></a>
                </div>
            </div>
        </div>
    )
}