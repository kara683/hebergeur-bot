import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png';
import Subscription from './Subscription';
import Login from './Login';
import Welcome from './Welcome';
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
        </section>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/abonnement" element={<Subscription />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
