import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './App.css';

const stripePromise = loadStripe('pk_test_your_public_key'); // Remplacez par votre clé Stripe

export default function Subscription() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(1000);
  const [error, setError] = useState('');
  // ...existing code...

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await fetch("http://localhost:5000/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amount,
        currency: "eur",
        email: email
      })
    });
    const data = await res.json();
    if (data.clientSecret) {
      // Redirige vers Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: data.clientSecret
      });
      if (result.error) {
        setError(result.error.message);
      }
    } else {
      setError("Erreur Stripe: " + (data.message || ""));
    }
  };

  return (
    <div className="futur-bg">
      <div className="futur-box">
        <h2>Abonnement Stripe</h2>
        <input className="futur-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input className="futur-input" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="Montant" />
        <button className="futur-btn" onClick={handlePayment}>Payer</button>
        {error && <div className="error-msg">{error}</div>}
      </div>
    </div>
  );
}
