import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_your_public_key'); // Remplacez par votre clé Stripe

export default function Subscription() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(1000);

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
        alert(result.error.message);
      }
    } else {
      alert("Erreur Stripe: " + (data.message || ""));
    }
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
