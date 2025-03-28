// src/services/api.js
import axios from 'axios';
import config from '../config';

// Create axios instance with base URL
const api = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Authentication services
export const authService = {
    register: (userData) => api.post('/auth/register', userData),
    login: (email, password) => {
        const formData = new FormData();
        formData.append('username', email); // FastAPI OAuth2PasswordRequestForm expects 'username'
        formData.append('password', password);
        return api.post('/auth/login', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    getGithubLoginUrl: () => api.get('/auth/github/login'),
    getGoogleLoginUrl: () => api.get('/auth/google/login'),
    getCurrentUser: () => api.get('/auth/me'),
};

// Websites services
export const websiteService = {
    getWebsites: () => api.get('/websites'),
    getWebsite: (id) => api.get(`/websites/${id}`),
    createWebsite: (websiteData) => api.post('/websites', websiteData),
    updateWebsite: (id, websiteData) => api.put(`/websites/${id}`, websiteData),
    deleteWebsite: (id) => api.delete(`/websites/${id}`),
};

// Dashboard services
export const dashboardService = {
    getSummary: () => api.get('/dashboard/summary'),
};

export default api;