import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [data, setData] = useState({ bots: [], incidents: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/status')
      .then(res => res.json())
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100vh' }}>
      <h2 style={{ color: '#7a1c1c', fontSize: '2rem', marginBottom: '30px' }}>Dashboard Wolf Bot</h2>
      <h3>Bots surveillés</h3>
      <ul>
        {data.bots.map(bot => (
          <li key={bot.id} style={{ marginBottom: '10px' }}>
            <strong>{bot.name}</strong> ({bot.type}) —
            <span style={{ color: bot.status === 'online' ? 'green' : 'red', fontWeight: 'bold' }}> {bot.status}</span>
            {bot.error && <span style={{ color: 'red', marginLeft: '10px' }}>Erreur: {bot.error}</span>}
            <span style={{ marginLeft: '10px', fontSize: '0.9em' }}>Dernier redémarrage: {new Date(bot.lastRestart).toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <h3>Historique des incidents</h3>
      <ul>
        {data.incidents.length === 0 ? <li>Aucun incident</li> : data.incidents.slice(-10).reverse().map((incident, idx) => (
          <li key={idx} style={{ marginBottom: '8px' }}>
            <strong>Bot #{incident.botId}</strong> — {incident.action} <span style={{ color: 'gray', fontSize: '0.9em' }}>({new Date(incident.time).toLocaleString()})</span>
            {incident.error && <span style={{ color: 'red', marginLeft: '10px' }}>Erreur: {incident.error}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
