import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated ] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            setIsAuthenticated(true);
            setUser(JSON.parse(user));
            setToken(token);
        }
    }, []);

    console.log('User data:', user);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        setToken(userData.token);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
