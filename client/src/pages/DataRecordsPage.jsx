import React, { useState, useEffect } from 'react';
import { getDataRecords, createDataRecord } from '../services/api';
const DataRecordsPage = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newRecord, setNewRecord] = useState({
        title: '',
        description: '',
        data: ''
    });
    useEffect(() => {
        fetchRecords();
    }, []);
    const fetchRecords = async () => {
        try {
            const data = await getDataRecords();
            setRecords(data);
        } catch (error) {
            console.error('Error fetching records:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDataRecord(newRecord);
            setShowForm(false);
            setNewRecord({ title: '', description: '', data: '' });
            fetchRecords(); 
        } catch (error) {
            console.error('Error creating record:', error);
        }
    };
    if (loading) return <div>Loading...</div>;
    return (
        <div className="data-records">
            <h1>Data Records</h1>           
            {/* Toggle form button */}
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add New Record'}
            </button>
            {/* Create new record form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="record-form">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newRecord.title}
                        onChange={(e) => setNewRecord({...newRecord, title: e.target.value})}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={newRecord.description}
                        onChange={(e) => setNewRecord({...newRecord, description: e.target.value})}
                        required
                    />
                    <textarea
                        placeholder="Data (JSON)"
                        value={newRecord.data}
                        onChange={(e) => setNewRecord({...newRecord, data: e.target.value})}
                        required
                    />
                    <button type="submit">Create Record</button>
                </form>
            )}
            {/* Display records list */}
            <div className="records-list">
                {records.map(record => (
                    <div key={record._id} className="record-card">
                        <h3>{record.title}</h3>
                        <p>{record.description}</p>
                        <small>Created: {new Date(record.createdAt).toLocaleDateString()}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default DataRecordsPage;