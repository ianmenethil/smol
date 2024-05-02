import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import LogViewer from './components/LogViewer';
import useAuth from './hooks/useAuth';
import './index.css';

const App: React.FC = () => {
  const { user, signIn, signOut } = useAuth();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch logs if user is authenticated
    if (user) {
      fetchLogs();
    }
  }, [user]);

  const fetchLogs = async () => {
    try {
      // Replace with your Flask API endpoint to fetch logs
      const response = await fetch('/api/logs', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error fetching logs');
      }
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    }
  };

  return (
    <div className="App">
      {!user ? (
        <LoginForm onSignIn={signIn} />
      ) : (
        <>
          <header>
            <h1>API Logs</h1>
            <button onClick={signOut}>Sign Out</button>
          </header>
          <main>
            <LogViewer logs={logs} />
          </main>
        </>
      )}
    </div>
  );
};

export default App;