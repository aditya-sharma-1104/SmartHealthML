import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    headers: {
        "Content-Type": "application/json"
    }
});

// Add interceptor to include token in requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('smart_health_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
