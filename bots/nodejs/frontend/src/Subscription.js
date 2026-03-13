const stripePromise = loadStripe('pk_test_your_public_key'); // Remplacez par votre clé Stripe

// PayPal
const PAYPAL_CLIENT_ID = 'sb'; // Remplacez par votre client ID PayPal

const plans = [
  { label: '1 mois', price: 10 },
  { label: '3 mois', price: 25 },
  { label: '5 mois', price: 55 },
  { label: '7 mois', price: 70 },
  { label: '1 an', price: 100 }
];

const options = [
  { label: '+10 Go stockage', price: 2 },
  { label: '+1 CPU', price: 5 },
  { label: '+2 Go RAM', price: 3 },
  { label: 'Support premium', price: 4 }
];

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const total = selectedPlan.price + selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  const [email, setEmail] = useState("");

  const handleStripePayment = async () => {
    const stripe = await stripePromise;
    const res = await fetch("http://localhost:5000/api/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: total * 100,
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

  const handlePayPalPayment = () => {
    // Redirection vers PayPal Checkout
    const url = `https://www.paypal.com/checkoutnow?client-id=${PAYPAL_CLIENT_ID}&amount=${total}&currency=EUR`;
    window.location.href = url;
  };

  return (
    <div className="page-bg">
      <h2>Choisissez votre abonnement</h2>
      <div className="plans">
        {plans.map((plan) => (
          <div
            key={plan.label}
            className={`plan-card${selectedPlan.label === plan.label ? ' selected' : ''}`}
            onClick={() => setSelectedPlan(plan)}
          >
            <h3>{plan.label}</h3>
            <p>{plan.price} €</p>
          </div>
        ))}
      </div>
      <div className="options">
        <h4>Options supplémentaires</h4>
        {options.map((opt) => (
          <label key={opt.label} className="option-label">
            <input
              type="checkbox"
              checked={selectedOptions.includes(opt)}
              onChange={() => handleOptionChange(opt)}
            />
            {opt.label} (+{opt.price} €)
          </label>
        ))}
      </div>
      <div className="total-price">
        <strong>Total : {total} €</strong>
      </div>
      <div style={{ margin: '20px 0' }}>
        <input
          type="email"
          placeholder="Votre email pour le reçu Stripe"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', width: '100%', marginBottom: '10px' }}
        />
      </div>
      <div className="pay-buttons">
        <button className="subscribe-btn" onClick={handleStripePayment}>Payer par Stripe</button>
        <button className="login-btn" onClick={handlePayPalPayment}>Payer par PayPal</button>
      </div>
    </div>
  );
}

export default Subscription;
