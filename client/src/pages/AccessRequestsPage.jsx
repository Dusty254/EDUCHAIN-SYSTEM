import React, { useState, useEffect } from 'react';
import { getAccessRequests, approveRequest, denyRequest } from '../services/api';
const AccessRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchRequests();
    }, []);
    const fetchRequests = async () => {
        try {
            const data = await getAccessRequests();
            setRequests(data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleApprove = async (id) => {
        try {
            await approveRequest(id);
            fetchRequests(); 
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };
    const handleDeny = async (id) => {
        try {
            await denyRequest(id);
            fetchRequests(); 
        } catch (error) {
            console.error('Error denying request:', error);
        }
    };
    if (loading) return <div>Loading...</div>;
    return (
        <div className="access-requests">
            <h1>Access Requests</h1>         
            {requests.length === 0 ? (
                <p>No pending access requests</p>
            ) : (
                <div className="requests-list">
                    {requests.map(request => (
                        <div key={request._id} className="request-card">
                            <h3>Request from: {request.requesterName}</h3>
                            <p>For record: {request.recordTitle}</p>
                            <p>Status: {request.status}</p>                          
                            {/* Show buttons only for pending requests */}
                            {request.status === 'pending' && (
                                <div className="request-actions">
                                    <button onClick={() => handleApprove(request._id)}>
                                        Approve
                                    </button>
                                    <button onClick={() => handleDeny(request._id)}>
                                        Deny
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default AccessRequestsPage;