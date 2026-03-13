import React, { useState } from 'react';
import './App.css';
import { loadStripe } from '@stripe/stripe-js';

export default function Don() {
    React.useEffect(() => {
      if (window.paypal && document.getElementById('paypal-button-container')) {
        window.paypal.Buttons({
          style: { color: 'red', shape: 'pill', label: 'donate' },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{ amount: { value: amount.toString() } }]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(function(details) {
              setMessage('Merci pour votre don, ' + details.payer.name.given_name + ' !');
            });
          },
          onError: (err) => {
            setError('Erreur PayPal: ' + err);
          }
        }).render('#paypal-button-container');
      }
    }, [amount]);
  const [amount, setAmount] = useState(5);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const stripePromise = loadStripe('pk_test_your_public_key'); // Remplacez par votre clé Stripe

  const handleDonate = async () => {
    const stripe = await stripePromise;
    const res = await fetch("http://localhost:5000/api/create-donation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amount * 100, currency: "eur" })
    });
    const data = await res.json();
    if (data.clientSecret) {
      const result = await stripe.redirectToCheckout({ sessionId: data.clientSecret });
      if (result.error) {
        setError(result.error.message);
      }
    } else {
      setError("Erreur Stripe: " + (data.message || ""));
    }
  };

  return (
    <div className="futur-bg">
      <div className="futur-box" style={{ maxWidth: 400 }}>
        <h2>Faire un don</h2>
        <p>Vous pouvez soutenir le site et le projet en faisant un don, sans engagement ni abonnement.</p>
        <input className="futur-input" type="number" min="1" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="Montant (€)" />
        <button className="futur-btn" onClick={handleDonate}>Donner {amount} € avec Stripe</button>
        <div style={{ margin: '20px 0' }}>
          <div id="paypal-button-container"></div>
        </div>
        {error && <div className="error-msg" style={{ color: '#ff003c', fontWeight: 'bold' }}>{error}</div>}
      </div>
    </div>
  );
}
