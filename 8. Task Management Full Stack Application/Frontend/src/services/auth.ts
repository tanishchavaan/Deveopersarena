import { axiosInstance } from './api';

export const authService = {
    async login(email: string, password: string) {
        const response = await axiosInstance.post('/auth/login', { email, password });
        return response.data;
    },

    async register(name: string, email: string, password: string) {
        const response = await axiosInstance.post('/auth/register', { name, email, password });
        return response.data;
    },

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
};
