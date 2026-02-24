import React, { useState, useEffect } from 'react';
import './App.css';
function App() {
  const [theme, setTheme] = useState('light');
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error:', err));
  }, []);
  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });
      const newUser = await response.json();
      setUsers([...users, newUser]);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className={`app ${theme}`}>
      <nav className="navbar">
        <div className="nav-brand">
          <a href="/">MyApp</a>
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <button onClick={toggleTheme}>
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
      </nav>
      <main className="main-content">
        {/* Add User Card */}
        <div className="card">
          <h2>Add User</h2>
          <form onSubmit={addUser}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">
              Add User
            </button>
          </form>
        </div>
        {/* Users List Card */}
        <div className="card">
          <h2>Users List</h2>
          {users.length === 0 ? (
            <p>No users yet. Add your first user!</p>
          ) : (
            <ul className="users-list">
              {users.map(user => (
                <li key={user.id || user._id}>
                  <strong>{user.name}</strong> - {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Welcome Card (preserved from your original) */}
        <div className="card">
          <h1>Welcome to My React App</h1>
          <p>Your app is working correctly!</p>
          <div className="button-group">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </main>
    </div>
  );
}
export default App;