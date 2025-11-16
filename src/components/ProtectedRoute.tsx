import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import authService from "../service/authService/AuthService";

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
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
      >
        <div className="text-center">
          <div
            className="spinner-border"
            style={{
              width: "4rem",
              height: "4rem",
              color: "navy",
              borderWidth: "0.4rem",
            }}
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3" style={{ color: "navy", fontWeight: "600" }}>
            Loading...
          </h4>
          <p className="text-muted">
            Please wait while we verify your credentials
          </p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
