import React, { useState } from 'react';
import './App.css';

export default function SupportIA() {
  const [messages, setMessages] = useState([
    { sender: 'ia', text: 'Bonjour ! Je suis l’assistant IA, disponible 24h/24. Posez vos questions sur le site, l’hébergement, les bots, ou demandez un remboursement.' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    // Simule une réponse IA (à remplacer par une vraie API plus tard)
    setTimeout(() => {
      let response = "Je vais analyser votre demande...";
      if (input.toLowerCase().includes('remboursement')) {
        response = "Pour un remboursement, indiquez votre numéro de commande et je vous guide.";
      } else if (input.toLowerCase().includes('bot')) {
        response = "Combien de bots souhaitez-vous héberger et de quel type ? Je peux vous conseiller un plan adapté.";
      } else if (input.toLowerCase().includes('problème')) {
        response = "Décrivez votre problème, je vais vous aider à le résoudre.";
      } else if (input.toLowerCase().includes('plan')) {
        response = "Je peux vous proposer différents plans selon vos besoins. Détaillez votre usage.";
      }
      setMessages(msgs => [...msgs, { sender: 'ia', text: response }]);
    }, 1200);
    setInput('');
  };

  return (
    <div className="futur-bg">
      <div className="futur-box" style={{ maxWidth: 500 }}>
        <h2>Support IA 24h/24</h2>
        <div style={{ height: 300, overflowY: 'auto', marginBottom: 20, background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: 10 }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ textAlign: msg.sender === 'ia' ? 'left' : 'right', margin: '8px 0' }}>
              <span style={{ color: msg.sender === 'ia' ? '#ff003c' : '#fff', fontWeight: msg.sender === 'ia' ? 'bold' : 'normal' }}>{msg.sender === 'ia' ? 'IA' : 'Vous'}:</span> <span>{msg.text}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="futur-input" style={{ flex: 1 }} value={input} onChange={e => setInput(e.target.value)} placeholder="Votre question..." onKeyDown={e => e.key === 'Enter' && handleSend()} />
          <button className="futur-btn" onClick={handleSend}>Envoyer</button>
        </div>
      </div>
    </div>
  );
}
