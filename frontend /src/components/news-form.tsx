'use client';
import { useState } from 'react';

export default function EventForm({ onSubmitted }: { onSubmitted: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [source, setSource] = useState('news');
  const [msg, setMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, location, source }),
    });
    setTitle('');
    setDescription('');
    setLocation('');
    setMsg(res.ok ? 'Event submitted!' : 'Error');
    onSubmitted();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
      <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" required />
      <select value={source} onChange={e => setSource(e.target.value)}>
        <option value="news">News</option>
        <option value="twitter">Twitter</option>
        <option value="sensor">Sensor</option>
      </select>
      <button type="submit">Submit Event</button>
      <p>{msg}</p>
    </form>
  );
}
