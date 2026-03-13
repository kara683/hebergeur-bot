import wolfLogo from './assets/wolfbot-logo.png';
import './App.css';
import Dashboard from './Dashboard';
import Servers from './Servers';
import { useState } from 'react';
import PaypalSubscription from './PaypalSubscription';

function App() {
  const [page, setPage] = useState('home');
  if (page === 'dashboard') return <Dashboard />;
  if (page === 'servers') return <Servers />;
  return (
    <div className="App" style={{ minHeight: '100vh', background: '#7a1c1c', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img src={wolfLogo} alt="Wolf Bot Logo" style={{ width: '350px', maxWidth: '90vw', marginBottom: '30px' }} />
      <h1 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px', fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '2px' }}>Wolf Bot</h1>
      <button style={{ padding: '15px 40px', fontSize: '1.2rem', borderRadius: '8px', background: '#fff', color: '#7a1c1c', border: 'none', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', marginBottom: '15px' }}
        onClick={() => setPage('dashboard')}>
        Accéder au dashboard
      </button>
      <button style={{ padding: '15px 40px', fontSize: '1.2rem', borderRadius: '8px', background: '#fff', color: '#7a1c1c', border: 'none', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', marginBottom: '15px' }}
        onClick={() => setPage('servers')}>
        Gestion VPS & Cloud
      </button>
      <div style={{ marginTop: '30px' }}>
        <PaypalSubscription />
      </div>
    </div>
  );
}

export default App;
