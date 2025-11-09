import React, { useState } from 'react';
import API from '../api';
import './style.css';

export default function CampaignForm({ onAdd }) {
  const [form, setForm] = useState({ name:'', client:'', startDate:'', status:'Active' });

  const submit = async (e) => {
    e.preventDefault();
    if(!form.name || !form.client || !form.startDate) return alert('Fill required');
    try {
      const { data } = await API.post('/', form);
      onAdd(data);
      setForm({ name:'', client:'', startDate:'', status:'Active' });
    } catch (err) { console.error(err); alert('Error adding campaign'); }
  };

 
return (
  <form onSubmit={submit} className="form">
    <div className="form-group">
      <label className="required">Campaign Name</label>
      <input
        type="text"
        placeholder="Enter Campaign Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
    </div>

    <div className="form-group">
      <label className="required">Client Name</label>
      <input
        type="text"
        placeholder="Enter Client Name"
        value={form.client}
        onChange={e => setForm({ ...form, client: e.target.value })}
        required
      />
    </div>

    <div className="form-group">
      <label>Start Date</label>
      <input
        type="date"
        value={form.startDate}
        onChange={e => setForm({ ...form, startDate: e.target.value })}
      />
    </div>

    <div className="form-group">
      <label>Status</label>
      <select
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
      >
        <option>Active</option>
        <option>Paused</option>
        <option>Completed</option>
      </select>
    </div>

    <button type="submit">Add Campaign</button>
  </form>
);}
