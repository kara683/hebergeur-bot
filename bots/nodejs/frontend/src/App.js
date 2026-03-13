import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png';
import Subscription from './Subscription';
import Login from './Login';
  import Welcome from './Welcome';

function App() {
  return (
    <Router>
      <div className="main-bg">
        <header className="header">
          <img src={logo} alt="Logo Wolf" className="logo" />
          <h1>Bienvenue sur WolfBot</h1>
          <p>Site professionnel d’abonnement et gestion de bots</p>
        </header>
        <section className="content">
          <Link to="/abonnement"><button className="subscribe-btn">S’abonner</button></Link>
          <Link to="/login"><button className="login-btn">Connexion</button></Link>
        </section>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/abonnement" element={<Subscription />} />
            <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
