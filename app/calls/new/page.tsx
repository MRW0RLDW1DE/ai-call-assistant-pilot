"use client";
import { useState } from 'react';

export default function NewCallPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [scenario, setScenario] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch('/api/call/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, scenario }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Call initiated successfully');
        setPhoneNumber('');
        setScenario('');
      } else {
        setMessage(data.error || 'Error initiating call');
      }
    } catch (err) {
      setMessage('Error initiating call');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">New Call</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Enter phone number"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Scenario</label>
          <input
            type="text"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full"
            placeholder="Enter call scenario"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Start Call
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
