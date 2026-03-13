import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png';
import Subscription from './Subscription';
import Login from './Login';
import Welcome from './Welcome';
import SupportIA from './SupportIA';
import Don from './Don';
import Register from './Register';

function App() {
  return (
    <Router>
      <div className="futur-bg">
        <header className="glass-header">
          <img src={logo} alt="Logo Wolf" className="logo" />
          <h1>Bienvenue sur WolfBot</h1>
          <p>Site professionnel d’abonnement et gestion de bots</p>
        </header>
        <section className="glass-content">
          <Link to="/abonnement"><button className="futur-btn">S’abonner</button></Link>
          <Link to="/login"><button className="futur-btn">Connexion</button></Link>
          <Link to="/register"><button className="futur-btn">Créer un compte</button></Link>
          <Link to="/don"><button className="futur-btn" style={{ border: '2px solid #ff003c', fontSize: '1.2rem' }}>Faire un don</button></Link>
          <Link to="/support"><button className="futur-btn" style={{ border: '2px solid #ff003c', fontSize: '1.2rem' }}>Support IA 24h/24</button></Link>
        </section>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/abonnement" element={<Subscription />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/don" element={<Don />} />
          <Route path="/support" element={<SupportIA />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
