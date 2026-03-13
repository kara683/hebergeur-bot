import React, { useState } from 'react';
import './App.css';

const API_URL = "http://localhost:5000/api"; // adapte selon ton backend

export default function Welcome() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCodeVerify = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Code validé, accès autorisé.");
      } else {
        setError(data.message || "Code incorrect.");
      }
    } catch (err) {
      setError("Erreur serveur.");
    }
  };

  return (
    <div className="futur-bg">
      <div className="glass-box">
        <h2>Bienvenue</h2>
        <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Code de vérification" />
        <button className="futur-btn" onClick={handleCodeVerify}>Vérifier le code</button>
        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}
      </div>
    </div>
  );
}
