"use client";
import { useState } from 'react';

export default function NewCallPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [objective, setObjective] = useState('');
  const [context, setContext] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch('/api/calls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, objective, context }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Call created successfully');
        setPhoneNumber('');
        setObjective('');
        setContext('');
      } else {
        setMessage(data.error || 'Error creating call');
      }
    } catch (err) {
      setMessage('Error creating call');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">New Call</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Objective</label>
          <textarea
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Context</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Create Call
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
