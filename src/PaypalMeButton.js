import React from 'react';

export default function PaypalMeButton() {
  return (
    <div>
      <h2>Payer via PayPal.me</h2>
      <a
        href="https://paypal.me/kararkt"
        target="_blank"
        rel="noopener noreferrer"
        style={{ padding: '10px 20px', background: '#0070ba', color: '#fff', borderRadius: 5, textDecoration: 'none' }}
      >
        Payer sur PayPal
      </a>
    </div>
  );
}
