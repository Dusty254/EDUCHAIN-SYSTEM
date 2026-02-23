import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();          
        navigate('/login'); 
    };
    return (
        <div className="layout">
            {/* Navigation Bar */}
            <nav className="navbar">
                {/* Brand/Logo- always visible */}
                <div className="nav-brand">
                    <Link to="/">EduBlockchain</Link>
                </div>
                
                {/* Show these links ONLY if user is logged in */}
                {user && (
                    <div className="nav-links">
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/data-records">Data Records</Link>
                        <Link to="/access-requests">Access Requests</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </nav>
            {/* Main content area - different for each page */}
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};
export default Layout;