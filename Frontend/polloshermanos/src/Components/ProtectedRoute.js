import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                <Component {...props} isAuthenticated={isAuthenticated}/>
            }
        />
    );
};

export default ProtectedRoute;