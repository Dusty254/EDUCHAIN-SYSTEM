import React, { useState } from 'react';
import './App.css';
function App() {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
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