import React, { useState, useEffect } from 'react';
import { LogEntry } from '../types/index';
import logService from '../services/logService';

const LogViewer: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const fetchedLogs = await logService.getLogs();
        setLogs(fetchedLogs);
      } catch (err) {
        setError('Failed to fetch logs');
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h2>API Request Logs</h2>
      {error && <div className="error">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Status</th>
            <th>Response Time (ms)</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.timestamp}</td>
              <td>{log.method}</td>
              <td>{log.endpoint}</td>
              <td>{log.status}</td>
              <td>{log.responseTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogViewer;