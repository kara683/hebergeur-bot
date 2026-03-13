import React, { useState } from 'react';
import './App.css';

function Welcome({ onAuth }) {
  const [showRegister, setShowRegister] = useState(false);
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [forgotMode, setForgotMode] = useState(false);
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetReady, setResetReady] = useState(false);
  const API_URL = "http://localhost:5000/api";

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Inscription réussie !");
      } else {
        setError(data.message || "Erreur lors de l’inscription.");
      }
    } catch (err) {
      setError("Erreur serveur.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Connexion réussie !");
        setCodeSent(true);
        setSuccess("Code envoyé par email. Veuillez le saisir.");
      } else {
        setError(data.message || "Identifiants invalides.");
      }
    } catch (err) {
      setError("Erreur serveur.");
    }
  };

  return (
    <div className="welcome-bg">
      <div className="welcome-box">
        <h1>Bienvenue sur Wolf Bot !</h1>
        <div className="switch-auth">
          <button onClick={() => { setShowRegister(false); setForgotMode(false); }} className={!showRegister ? 'active' : ''}>Connexion</button>
          <button onClick={() => { setShowRegister(true); setForgotMode(false); }} className={showRegister ? 'active' : ''}>Créer un compte</button>
        </div>
        {forgotMode ? (
          !resetCodeSent && !resetReady ? (
            <form className="form" onSubmit={async e => {
              e.preventDefault();
              setError("");
              setSuccess("");
              const res = await fetch(`${API_URL}/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginData.email })
              });
              const data = await res.json();
              if (res.ok) {
                setResetCodeSent(true);
                setSuccess("Code envoyé par email. Veuillez le saisir.");
              } else {
                setError(data.message || "Erreur.");
              }
            }}>
              <input name="email" type="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
              <button type="submit" className="login-btn">Envoyer le code</button>
            </form>
          ) : !resetReady ? (
            <form className="form" onSubmit={async e => {
              e.preventDefault();
              setError("");
              setSuccess("");
              const res = await fetch(`${API_URL}/verify-reset-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginData.email, code: resetCode })
              });
              const data = await res.json();
              if (res.ok) {
                setSuccess("Code validé, saisissez un nouveau mot de passe.");
                setResetReady(true);
              } else {
                setError(data.message || "Code incorrect.");
              }
            }}>
              <input
                type="text"
                placeholder="Code reçu par email"
                value={resetCode}
                onChange={e => setResetCode(e.target.value)}
              />
              <button type="submit" className="login-btn">Valider le code</button>
            </form>
          ) : (
            <form className="form" onSubmit={async e => {
              e.preventDefault();
              setError("");
              setSuccess("");
              const res = await fetch(`${API_URL}/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: loginData.email, newPassword })
              });
              const data = await res.json();
              if (res.ok) {
                setSuccess("Mot de passe modifié. Vérifiez votre email.");
                setForgotMode(false);
                setResetCodeSent(false);
                setResetReady(false);
                setNewPassword("");
                setResetCode("");
              } else {
                setError(data.message || "Erreur.");
              }
            }}>
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <button type="submit" className="login-btn">Changer le mot de passe</button>
            </form>
          )
        ) : (!codeSent ? (
          <form className="form" onSubmit={handleLogin}>
            <input name="email" type="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
            <input name="password" type="password" placeholder="Mot de passe" value={loginData.password} onChange={handleLoginChange} required />
            <button className="login-btn" type="submit">Se connecter</button>
            <button type="button" className="login-btn" style={{ marginTop: 10, background: '#555' }} onClick={() => { setForgotMode(true); setError(""); setSuccess(""); }}>Mot de passe oublié ?</button>
          </form>
        ) : (
          <form className="form" onSubmit={handleCodeVerify}>
            <input
              type="text"
              placeholder="Code reçu par email"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <button type="submit" className="login-btn">Valider le code</button>
          </form>
        )
      )
    }
    {error && <div style={{ color: "#c00", marginTop: 10 }}>{error}</div>}
    {success && <div style={{ color: "#0a0", marginTop: 10 }}>{success}</div>}
  </div>
 </div>
 );
}

export default Welcome;
