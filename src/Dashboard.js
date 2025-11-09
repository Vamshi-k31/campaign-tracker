/*import React, { useEffect, useState } from 'react';
import API from './api';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import './App.css';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Dashboard from "./Dashboard";

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState('');

  /*const fetchCampaigns = async () => {
    const url = search ? `/?search=${encodeURIComponent(search)}` : '/';
    const { data } = await API.get(url);
    setCampaigns(data);
  };*///
 /* const fetchCampaigns = async (searchTerm = '') => {
  try {
    const endpoint = searchTerm ? `/?search=${encodeURIComponent(searchTerm)}` : '/';
    const { data } = await API.get(endpoint);
    setCampaigns(data);
  } catch (err) {
    console.error('Error fetching campaigns:', err);
  }
};


  useEffect(() => { fetchCampaigns(); }, [search]);

  const add = (c) => setCampaigns(prev => [c, ...prev]);
  const del = (id) => setCampaigns(prev => prev.filter(x => x._id !== id));
  const update = (updated) => setCampaigns(prev => prev.map(p => p._id === updated._id ? updated : p));

  const summary = campaigns.reduce((acc, c) => { acc[c.status] = (acc[c.status]||0)+1; return acc; }, {});

  return (
    
    <div className="container">
      <h1>Campaign Tracker</h1>
      
<div class="search-container">
  <input type="text" class="search-input" placeholder="Type name and client" />
  <button class="search-button">search</button>
</div>
<div>Active: {summary['Active']||0} | Paused: {summary['Paused']||0} | Completed: {summary['Completed']||0}</div>

      <div className="top">
        <CampaignForm onAdd={add}/>
        
      </div>
      <CampaignList campaigns={campaigns} onDelete={del} onStatusChange={update}/>
    </div>
    
  );
}

export default App;
*/


import React, { useEffect, useState } from 'react';
import API from './api';
import CampaignForm from './components/CampaignForm';
import CampaignList from './components/CampaignList';
import './App.css';

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState('');

  
  const fetchCampaigns = async (searchTerm = '') => {
    try {
      const endpoint = searchTerm ? `/?search=${encodeURIComponent(searchTerm)}` : '/';
      const { data } = await API.get(endpoint);
      setCampaigns(data);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
    }
  };


  useEffect(() => {
    const delay = setTimeout(() => {
      fetchCampaigns(search);
    }, 400); 
    return () => clearTimeout(delay);
  }, [search]);

  const add = (c) => setCampaigns(prev => [c, ...prev]);
  const del = (id) => setCampaigns(prev => prev.filter(x => x._id !== id));
  const update = (updated) => setCampaigns(prev => prev.map(p => p._id === updated._id ? updated : p));

  const summary = campaigns.reduce((acc, c) => { acc[c.status] = (acc[c.status] || 0) + 1; return acc; }, {});

  return (
    <div className="container">
      <h1>Campaign Tracker</h1>

    
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Type name or client"
          value={search}
          onChange={(e) => setSearch(e.target.value)}  // <-- key line
        />
        <button
          className="search-button"
          onClick={() => fetchCampaigns(search)}  // optional manual search trigger
        >
          Search
        </button>
      </div>

      <div>
        Active: {summary['Active'] || 0} | Paused: {summary['Paused'] || 0} | Completed: {summary['Completed'] || 0}
      </div>

      <div className="top">
        <CampaignForm onAdd={add} />
      </div>

      <CampaignList campaigns={campaigns} onDelete={del} onStatusChange={update} />
    </div>
  );
}

export default App;
