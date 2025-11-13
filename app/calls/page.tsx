"use client";
import { useEffect, useState } from 'react';

interface Call {
  id: number;
  phoneNumber: string;
  objective: string;
  context: string;
  status: string;
  createdAt: string;
}

export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const res = await fetch('/api/calls');
        if (res.ok) {
          const data = await res.json();
          setCalls(data);
        }
      } catch (err) {
        console.error('Error fetching calls', err);
      }
    };
    fetchCalls();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Call History</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left">Phone</th>
            <th className="border px-2 py-1 text-left">Objective</th>
            <th className="border px-2 py-1 text-left">Status</th>
            <th className="border px-2 py-1 text-left">Created</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call) => (
            <tr key={call.id}>
              <td className="border px-2 py-1">{call.phoneNumber}</td>
              <td className="border px-2 py-1">{call.objective.slice(0, 50)}...</td>
              <td className="border px-2 py-1">{call.status}</td>
              <td className="border px-2 py-1">{new Date(call.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
