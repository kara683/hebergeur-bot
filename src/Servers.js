import React, { useEffect, useState } from 'react';

function Servers() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/servers')
      .then(res => res.json())
      .then(result => {
        setServers(result.servers || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ padding: '40px', background: '#fff', minHeight: '100vh' }}>
      <h2 style={{ color: '#7a1c1c', fontSize: '2rem', marginBottom: '30px' }}>Gestion des VPS & Cloud</h2>
      <ul>
        {servers.length === 0 ? <li>Aucun serveur</li> : servers.map(server => (
          <li key={server.id} style={{ marginBottom: '15px' }}>
            <strong>{server.name}</strong> ({server.type}) —
            <span style={{ color: server.status === 'online' ? 'green' : 'red', fontWeight: 'bold' }}> {server.status}</span>
            <span style={{ marginLeft: '10px', fontSize: '0.9em' }}>CPU: {server.cpu}% | RAM: {server.ram}MB</span>
            <button style={{ marginLeft: '20px', padding: '6px 18px', borderRadius: '6px', background: '#7a1c1c', color: '#fff', border: 'none', cursor: 'pointer' }}>
              {server.status === 'online' ? 'Arrêter' : 'Démarrer'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Servers;
