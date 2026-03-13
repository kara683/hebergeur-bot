import React, { useState } from 'react';

const API_URL = "http://localhost:5000/api"; // adapte selon ton backend

export default function Welcome() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  // Supprime les hooks inutilisés pour éviter les warnings

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
    <div>
      <h2>Bienvenue</h2>
      <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Code de vérification" />
      <button onClick={handleCodeVerify}>Vérifier le code</button>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>{success}</div>}
    </div>
  );
}
