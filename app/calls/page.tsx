"use client";

import { useEffect, useState } from 'react';

interface CallEntry {
  callSid: string;
  to: string;
  status: string;
  startedAt: string;
}

export default function CallsPage() {
  const [calls, setCalls] = useState<CallEntry[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/call/history');
        if (res.ok) {
          const data = await res.json();
          setCalls(data);
        }
      } catch (err) {
        console.error('Error fetching call history', err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Call History</h1>
      <table style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Phone</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Status</th>
            <th style={{ border: '1px solid #ccc', padding: '0.5rem', textAlign: 'left' }}>Started</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call) => (
            <tr key={call.callSid}>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{call.to}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{call.status}</td>
              <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{new Date(call.startedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
