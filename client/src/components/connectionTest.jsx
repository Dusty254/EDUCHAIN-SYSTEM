import React, { useState, useEffect } from 'react';
import { checkHealth, api } from '../services/api';
function ConnectionTest() {
  const [health, setHealth] = useState(null);
  const [agencies, setAgencies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    testConnection();
  }, []);
  const testConnection = async () => {
    setLoading(true);
    try {
      const healthData = await checkHealth();
      setHealth(healthData);
      const agenciesData = await api.getAgencies();
      setAgencies(agenciesData);     
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to connect to backend');
      console.error('Connection test error:', err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Backend Connection Test</h2>      
      {loading && (
        <div style={{ color: '#666', marginBottom: '20px' }}>
          Testing connection...
        </div>
      )}     
      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#ffeeee',
          borderRadius: '4px',
          border: '1px solid #ffcccc'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}     
      <div style={{ marginBottom: '30px' }}>
        <h3>Health Check:</h3>
        {health ? (
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(health, null, 2)}
          </pre>
        ) : (
          <p style={{ color: '#999' }}>No health data yet</p>
        )}
      </div>     
      <div style={{ marginBottom: '30px' }}>
        <h3>Agencies:</h3>
        {agencies ? (
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px',
            borderRadius: '4px',
            overflow: 'auto'
          }}>
            {JSON.stringify(agencies, null, 2)}
          </pre>
        ) : (
          <p style={{ color: '#999' }}>No agencies data yet</p>
        )}
      </div>
      <button 
        onClick={testConnection}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.5 : 1
        }}
      >
        {loading ? 'Testing...' : 'Test Connection Again'}
      </button>
    </div>
  );
}
export default ConnectionTest;