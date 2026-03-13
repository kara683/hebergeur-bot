import React, { useState } from 'react';

export default function Welcome() {
  const [code, setCode] = useState('');

  const handleCodeVerify = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_URL}/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginData.email, code })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Code validé, accès autorisé.");
        setCodeSent(false);
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
    </div>
  );
}
