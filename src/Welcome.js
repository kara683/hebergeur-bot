import React, { useState } from 'react';

export default function Welcome() {
  const [code, setCode] = useState('');

  const handleCodeVerify = () => {
    // ... logique de vérification du code ...
  };

  return (
    <div>
      <h2>Bienvenue</h2>
      <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Code de vérification" />
      <button onClick={handleCodeVerify}>Vérifier le code</button>
    </div>
  );
}
