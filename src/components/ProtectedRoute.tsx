import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../service/authService/AuthService';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateAuth = async () => {
      const valid = await authService.validateToken();
      setIsAuthenticated(valid);
      setIsValidating(false);
    };
    validateAuth();
  }, []);

  if (isValidating) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;