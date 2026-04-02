import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProjects = () => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => { setProjects(data); setLoading(false); })
      .catch(err => console.error("API error", err));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if(!newTitle) return;
    
    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, description: newDesc || "No description provided", status: "Active" })
    }).then(res => res.json())
      .then(newProject => {
        setProjects([newProject, ...projects]);
        setNewTitle('');
        setNewDesc('');
      });
  };

  return (
    <div className="app-container" style={{ padding: '6rem 5% 2rem 5%' }}>
      <nav className="navbar">
        <div className="logo" onClick={() => navigate('/')}>Aura.</div>
        <button style={{ background: 'transparent', color: '#94a3b8', border:'1px solid var(--glass-border)', padding: '0.5rem 1.5rem', borderRadius: '50px', cursor: 'pointer', transition: 'all 0.3s ease' }} onClick={() => navigate('/')}>Return Home</button>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', animation: 'fadeIn 0.5s ease-out' }}>
          Database Interaction<span style={{color:'var(--accent-primary)'}}>.</span>
        </h2>
        
        <div className="feature-card" style={{ marginBottom: '3rem', padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Add New Record</h3>
          <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              style={{ padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px', fontSize: '1rem' }}
              placeholder="Record Title (e.g., Integrate Azure Pipeline)" 
              value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required 
            />
            <input 
              style={{ padding: '1rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px', fontSize: '1rem' }}
              placeholder="Description" 
              value={newDesc} onChange={(e) => setNewDesc(e.target.value)} 
            />
            <button type="submit" className="cta-button" style={{ padding: '0.8rem 2rem', fontSize: '1rem', width: 'fit-content', marginTop: '0.5rem' }}>
              Save to Database
            </button>
          </form>
        </div>

        <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>Live Project Data</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {loading ? <p style={{color: 'var(--text-secondary)'}}>Querying MongoDB cluster...</p> : projects.map((proj, index) => (
            <div key={proj._id} style={{ padding: '1.5rem', background: 'rgba(15,17,26,0.5)', border: '1px solid var(--glass-border)', borderRadius: '8px', borderLeft: '4px solid var(--accent-secondary)', animation: `fadeIn ${0.5 + index * 0.1}s ease-out` }}>
              <h4 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}>
                {proj.title} 
                <span style={{fontSize:'0.75rem', padding:'4px 10px', background:'rgba(99, 102, 241, 0.2)', color: 'var(--accent-secondary)', borderRadius:'12px', marginLeft:'12px', fontWeight: 'bold'}}>{proj.status}</span>
              </h4>
              <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>{proj.description}</p>
            </div>
          ))}
          {!loading && projects.length === 0 && <p style={{color: 'var(--text-secondary)'}}>No records found in database.</p>}
        </div>
      </div>
    </div>
  )
}
