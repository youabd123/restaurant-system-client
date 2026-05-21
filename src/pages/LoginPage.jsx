import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
  "https://localhost:7134/api/Auth/login",
  {
    email,
    password,
  }
);


      // ⭐ Spara token och användarnamn
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.fullName);

      // ⭐ Redirect
      navigate("/");
    } catch (err) {
      setError("Fel email eller lösenord");
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Logga in</button>
      </form>
    </div>
  );
}

