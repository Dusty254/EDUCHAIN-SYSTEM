import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginAgency } from '../services/api';
const LoginPage = () => {
    const [agencyId, setAgencyId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();        
        try {
            const response = await loginAgency(agencyId, password);          
            if (response.success) {
                setAuth(response.data);
                navigate('/dashboard');
            } else {
                setError(response.error);
            }
        } catch (err) {
            setError('An error occurred during login');
            console.error('Login error:', err);
        }
    };
    return (
        <div className="login-page">
            <h1>Kenya Higher Education Data Exchange</h1>           
            {/* Login Form */}
            <form onSubmit={handleSubmit}>
                {/* Agency ID Field */}
                <div>
                    <label htmlFor="agencyId">Agency ID</label>
                    <input
                        type="text"
                        id="agencyId"
                        value={agencyId}
                        onChange={(e) => setAgencyId(e.target.value)}
                        required
                    />
                </div>                
                {/* Password Field */}
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>                
                {/* Error Message (if any) */}
                {error && <p className="error">{error}</p>}
                {/* Submit Button */}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};
export default LoginPage;