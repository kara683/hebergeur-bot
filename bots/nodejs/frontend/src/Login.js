import React from 'react';
import './App.css';

function Login() {
  return (
    <div className="page-bg">
      <h2>Connexion</h2>
      <form className="form">
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Mot de passe" required />
        <button className="login-btn" type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
