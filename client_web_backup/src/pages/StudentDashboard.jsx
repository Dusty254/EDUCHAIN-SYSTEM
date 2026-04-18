import React, { useEffect, useState } from 'react';

const StudentDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const token = localStorage.getItem('studentToken');
                if (!token) {
                    window.location.href = '/student/login';
                    return;
                }

                const response = await fetch('http://localhost:5000/api/v1/students/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Failed to fetch dashboard data');
                }

                setProfile(result.data.profile);
                setRecords(result.data.officialRecords);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('studentToken');
        window.location.href = '/student/login';
    };

    if (loading) return <div style={styles.centerBox}>Loading your official records...</div>;
    if (error) return <div style={styles.errorBox}>{error}</div>;

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <div style={styles.headerContent}>
                    <h1>Student Portal</h1>
                    <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
                </div>
            </header>

            <main style={styles.main}>
                {profile && (
                    <section style={styles.profileSection}>
                        <h2>My Details</h2>
                        <div style={styles.grid}>
                            <div style={styles.gridItem}><strong>Index Number:</strong> {profile.indexNumber}</div>
                            <div style={styles.gridItem}><strong>Email:</strong> {profile.email}</div>
                            <div style={styles.gridItem}><strong>Phone:</strong> {profile.phone}</div>
                        </div>
                    </section>
                )}

                <section style={styles.recordsSection}>
                    <h2>Official Records (Read-Only)</h2>
                    <p style={styles.infoText}>These records have been appended to your profile by authorized educational agencies.</p>

                    {records.length === 0 ? (
                        <div style={styles.emptyState}>
                            No official records have been appended to your profile yet. Agencies like KNEC or universities will upload them here.
                        </div>
                    ) : (
                        <div style={styles.recordList}>
                            {records.map((record) => (
                                <div key={record._id} style={styles.recordCard}>
                                    <div style={styles.recordHeader}>
                                        <h3 style={{ margin: 0, color: '#2b2d42' }}>{record.title}</h3>
                                        <span style={styles.badge}>{record.ownerAgencyId?.name || 'Unknown Agency'} ({record.ownerAgencyId?.type})</span>
                                    </div>
                                    <p style={{ color: '#666', marginTop: '5px' }}>{record.description}</p>

                                    <div style={styles.dataBox}>
                                        <h4>Attached Data:</h4>
                                        <pre style={{ margin: 0, overflowX: 'auto' }}>
                                            {JSON.stringify(record.data, null, 2)}
                                        </pre>
                                    </div>
                                    <div style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>
                                        Appended on: {new Date(record.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
    },
    centerBox: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px'
    },
    errorBox: {
        margin: '20px', padding: '15px', backgroundColor: '#ffebee', color: '#d32f2f', borderRadius: '4px'
    },
    header: {
        backgroundColor: '#4361ee', color: 'white', padding: '15px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    headerContent: {
        maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px'
    },
    logoutBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer'
    },
    main: {
        maxWidth: '1000px', margin: '30px auto', padding: '0 20px'
    },
    profileSection: {
        backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '30px'
    },
    grid: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px'
    },
    gridItem: {
        padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #eee'
    },
    recordsSection: {
        backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    infoText: {
        color: '#666', fontStyle: 'italic', marginBottom: '20px'
    },
    emptyState: {
        padding: '40px', textAlign: 'center', backgroundColor: '#f8f9fa', border: '1px dashed #ccc', borderRadius: '4px', color: '#666'
    },
    recordList: {
        display: 'flex', flexDirection: 'column', gap: '20px'
    },
    recordCard: {
        border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', backgroundColor: '#fff'
    },
    recordHeader: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px'
    },
    badge: {
        backgroundColor: '#edf2f7', color: '#4a5568', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold'
    },
    dataBox: {
        marginTop: '15px', backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '4px', border: '1px solid #eee'
    }
};

export default StudentDashboard;
