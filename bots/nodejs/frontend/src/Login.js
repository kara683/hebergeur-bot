import React, { useState } from 'react';
import './App.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    // Ajoute ta logique de connexion ici
  };

  return (
    <div className="futur-bg">
      <div className="glass-box">
        <h2>Connexion</h2>
        <form className="form" onSubmit={handleLogin}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" required />
          <button className="login-btn" type="submit">Se connecter</button>
        </form>
        {error && <div className="error-msg">{error}</div>}
      </div>
    </div>
  );
}
