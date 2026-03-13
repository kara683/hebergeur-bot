import React, { useState } from 'react';

export default function PaypalGiftCard() {
  const [giftCode, setGiftCode] = useState('');
  const [result, setResult] = useState(null);

  const handleGiftCardSubmit = async () => {
    // Exemple d'appel à une API backend
    try {
      const response = await fetch('/api/validate-giftcard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: giftCode })
      });
      const data = await response.json();
      setResult(data.message);
    } catch (err) {
      setResult('Erreur lors de la validation.');
    }
  };

  return (
    <div>
      <h2>Payer avec une carte cadeau PayPal</h2>
      <input
        type="text"
        value={giftCode}
        onChange={e => setGiftCode(e.target.value)}
        placeholder="Code carte cadeau PayPal"
      />
      <button onClick={handleGiftCardSubmit}>Valider</button>
      {result && <div>{result}</div>}
    </div>
  );
}
