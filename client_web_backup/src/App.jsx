import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentRegisterPage from './pages/StudentRegisterPage';
import StudentLoginPage from './pages/StudentLoginPage';
import StudentDashboard from './pages/StudentDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar" style={{ backgroundColor: '#1a1a1a', padding: '15px 30px', display: 'flex', justifyContent: 'space-between' }}>
          <div className="nav-brand">
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '24px', fontWeight: 'bold' }}>EduChain</Link>
          </div>
          <div className="nav-links" style={{ display: 'flex', gap: '20px' }}>
            <Link to="/student/login" style={{ color: 'white', textDecoration: 'none' }}>Student Login</Link>
            <Link to="/student/register" style={{ color: 'white', textDecoration: 'none' }}>Student Register</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Welcome to EduChain Kenya</h1>
                <p>The centralized educational registry system.</p>
                <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
                  <Link to="/student/login" style={{ padding: '10px 20px', backgroundColor: '#4361ee', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>I am a Student</Link>
                  {/* Agency flow to be added later */}
                  <div style={{ padding: '10px 20px', backgroundColor: '#e0e0e0', color: '#666', borderRadius: '5px', cursor: 'not-allowed' }}>Agency Portal (Coming Soon)</div>
                </div>
              </div>
            } />
            <Route path="/student/register" element={<StudentRegisterPage />} />
            <Route path="/student/login" element={<StudentLoginPage />} />
            <Route path="/student/dashboard" element={<StudentDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;