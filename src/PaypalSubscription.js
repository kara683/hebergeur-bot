import React, { useEffect } from 'react';

function PaypalSubscription() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID&vault=true&intent=subscription";
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => {
      if (window.paypal) {
        window.paypal.Buttons({
          style: {
            layout: 'vertical',
            color: 'gold',
            shape: 'rect',
            label: 'subscribe',
            height: 45
          },
          createSubscription: function(data, actions) {
            return actions.subscription.create({
              'plan_id': 'YOUR_PLAN_ID'
            });
          },
          onApprove: function(data, actions) {
            alert('Abonnement validé ! ID : ' + data.subscriptionID);
            fetch('http://localhost:3001/api/paypal-subscription', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subscriptionID: data.subscriptionID, userID: 'USER_ID_EXEMPLE' })
            });
          }
        }).render('#paypal-button-container');
      }
    };
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ background: '#fff', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', maxWidth: '400px', margin: 'auto' }}>
      <h3 style={{ color: '#7a1c1c', fontSize: '1.6rem', marginBottom: '10px' }}>Abonnement Wolf Bot</h3>
      <p style={{ color: '#333', marginBottom: '18px' }}>Accédez à toutes les fonctionnalités premium, hébergez vos bots 24h/24, gérez vos serveurs et bénéficiez d’un support prioritaire.</p>
      <div id="paypal-button-container"></div>
    </div>
  );
}

export default PaypalSubscription;
