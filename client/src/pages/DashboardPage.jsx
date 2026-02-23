import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDataRecords } from '../services/api';
const DashboardPage = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalRecords: 0,
        pendingRequests: 0
    });
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const records = await getDataRecords();
                setStats(prev => ({
                    ...prev,
                    totalRecords: records.length
                }));
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        if (user) {
            fetchDashboardData();
        }
    }, [user]);
    return (
        <div className="dashboard">
            {/* Welcome message with user's name */}
            <h1>Welcome, {user?.name || 'Agency'}</h1>           
            {/* Statistics cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Records</h3>
                    <p>{stats.totalRecords}</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Requests</h3>
                    <p>{stats.pendingRequests}</p>
                </div>
            </div>
        </div>
    );
};
export default DashboardPage;