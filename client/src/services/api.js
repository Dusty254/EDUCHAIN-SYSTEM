import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);
export const loginAgency = async (agencyId, password) => {
    try {
        const response = await api.post('/agencies/login', { agencyId, password });
        if (response.data.success && response.data.data?.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.agency));
        }      
        return response.data;
    } catch (error) {
        if (error.response) {
            return {
                success: false,
                error: error.response.data?.error || 'Login failed',
                status: error.response.status
            };
        }
        return {
            success: false,
            error: 'Network error. Please check your connection.'
        };
    }
};
export const registerAgency = async (agencyData) => {
    try {
        const response = await api.post('/agencies/register', agencyData);      
        if (response.data.success && response.data.data?.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data));
        }       
        return response.data;
    } catch (error) {
        if (error.response) {
            return {
                success: false,
                error: error.response.data?.error || 'Registration failed',
                details: error.response.data?.details
            };
        }
        return {
            success: false,
            error: 'Network error. Please check your connection.'
        };
    }
};
export const getProfile = async () => {
    try {
        const response = await api.get('/agencies/profile');
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to get profile');
    }
};
export const updateProfile = async (profileData) => {
    try {
        const response = await api.put('/agencies/profile', profileData);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to update profile');
    }
};
export const changePassword = async (passwordData) => {
    try {
        const response = await api.post('/agencies/change-password', passwordData);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to change password');
    }
};
export const verifyAgency = async (agencyId) => {
    try {
        const response = await api.get(`/agencies/verify/${agencyId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to verify agency');
    }
};
export const getDataRecords = async () => {
    try {
        const response = await api.get('/data/records');
        return response.data;
    } catch (error) {
        console.error('Error fetching records:', error);
        throw error.response?.data || new Error('Failed to fetch records');
    }
};
export const getRecordById = async (id) => {
    try {
        const response = await api.get(`/data/records/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to fetch record');
    }
};
export const createDataRecord = async (recordData) => {
    try {
        const response = await api.post('/data/records', recordData);
        return response.data;
    } catch (error) {
        console.error('Error creating record:', error);
        throw error.response?.data || new Error('Failed to create record');
    }
};
export const updateRecord = async (id, recordData) => {
    try {
        const response = await api.put(`/data/records/${id}`, recordData);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to update record');
    }
};
export const deleteRecord = async (id) => {
    try {
        const response = await api.delete(`/data/records/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to delete record');
    }
};
export const shareRecord = async (id, shareData) => {
    try {
        const response = await api.post(`/data/records/${id}/share`, shareData);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to share record');
    }
};
export const getAccessRequests = async (params = {}) => {
    try {
        const response = await api.get('/access/requests', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching requests:', error);
        throw error.response?.data || new Error('Failed to fetch requests');
    }
};
export const getPendingRequests = async () => {
    try {
        const response = await api.get('/access/requests/pending');
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to fetch pending requests');
    }
};
export const createAccessRequest = async (requestData) => {
    try {
        const response = await api.post('/access/requests', requestData);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to create request');
    }
};
export const approveRequest = async (id) => {
    try {
        const response = await api.put(`/access/requests/${id}/approve`);
        return response.data;
    } catch (error) {
        console.error('Error approving request:', error);
        throw error.response?.data || new Error('Failed to approve request');
    }
};
export const denyRequest = async (id, reason) => {
    try {
        const response = await api.put(`/access/requests/${id}/deny`, { reason });
        return response.data;
    } catch (error) {
        console.error('Error denying request:', error);
        throw error.response?.data || new Error('Failed to deny request');
    }
};
export const getPermissions = async () => {
    try {
        const response = await api.get('/access/permissions');
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to get permissions');
    }
};
export const getAuditLogs = async () => {
    try {
        const response = await api.get('/audit/logs');
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to get audit logs');
    }
};
export const getAgencyLogs = async (agencyId) => {
    try {
        const response = await api.get(`/audit/logs/agency/${agencyId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to get agency logs');
    }
};
export const getRecordLogs = async (recordId) => {
    try {
        const response = await api.get(`/audit/logs/record/${recordId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to get record logs');
    }
};
export const getAuditStats = async () => {
    try {
        const response = await api.get('/audit/stats');
        return response.data;
    } catch (error) {
        throw error.response?.data || new Error('Failed to get audit stats');
    }
};
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
};
export default api;