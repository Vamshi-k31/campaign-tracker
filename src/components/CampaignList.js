import React from 'react';
import API from '../api';
import './style.css';

export default function CampaignList({ campaigns, onDelete, onStatusChange }) {
  const changeStatus = async (id, newStatus) => {
    try {
      const { data } = await API.patch(`/${id}/status`, { status: newStatus });
      onStatusChange(data);
    } catch (err) { console.error(err); }
  };

  const remove = async (id) => {
    if(!window.confirm('Delete campaign?')) return;
    await API.delete(`/${id}`);
    onDelete(id);
  };

  return (
    <table className="campaign-table">
      <thead><tr><th>Name</th><th>Client</th><th>Start</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        {campaigns.map(c => (
          <tr key={c._id}>
            <td>{c.name}</td>
            <td>{c.client}</td>
            <td>{new Date(c.startDate).toLocaleDateString()}</td>
            <td>
              <select value={c.status} onChange={e => changeStatus(c._id, e.target.value)}>
                <option>Active</option><option>Paused</option><option>Completed</option>
              </select>
            </td>
            <td>
              <button onClick={()=>remove(c._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
