import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_your_public_key'); // Remplace par ta clé Stripe

export default function Subscription() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(1000);

  const handlePayment = async () => {
    // ... logique Stripe ...
  };

  return (
    <div>
      <h2>Abonnement Stripe</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="Montant" />
      <button onClick={handlePayment}>Payer</button>
    </div>
  );
}
