import React, { createContext, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated ] = useState(false);
    const history = useHistory();

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        history.push('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
