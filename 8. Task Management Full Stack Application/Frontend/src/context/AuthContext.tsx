import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserDetailsDto } from '../types/task';
import { authService } from '../services/auth';

interface AuthContextType {
    user: UserDetailsDto | null;
    isAuthenticated: boolean;
    login: (token: string, refresh: string, user: UserDetailsDto) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (token: string, refresh: string, userDto: UserDetailsDto) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('user', JSON.stringify(userDto));
        setUser(userDto);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    if (loading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
