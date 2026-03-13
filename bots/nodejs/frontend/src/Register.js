import React, { useState } from 'react';
import './App.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Inscription réussie, vérifiez votre email.');
        setUsername(''); setEmail(''); setPassword('');
      } else {
        setError(data.message || 'Erreur lors de l’inscription.');
      }
    } catch (err) {
      setError('Erreur serveur.');
    }
  };

  return (
    <div className="futur-bg">
      <div className="glass-box">
        <h2>Créer un compte</h2>
        <form className="form" onSubmit={handleRegister}>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Pseudo" required />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" required />
          <button className="register-btn" type="submit">S’inscrire</button>
        </form>
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
      </div>
    </div>
  );
}
