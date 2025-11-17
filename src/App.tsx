import React from "react";
// @ts-ignore: allow side-effect import of CSS without type declarations
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NavB from "./components/NavB";
import { BookConsole } from "./components/book/BookConsole";
import { MemberConsole } from "./components/member/MemberConsole";
import { StaffConsole } from "./components/staff/StaffConsole";
import { LendingConsole } from "./components/lending/LendingConsole";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <NavB />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book"
            element={
              <ProtectedRoute>
                <BookConsole />
              </ProtectedRoute>
            }
          />
          <Route
            path="/member"
            element={
              <ProtectedRoute>
                <MemberConsole />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff"
            element={
              <ProtectedRoute>
                <StaffConsole />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lending"
            element={
              <ProtectedRoute>
                <LendingConsole />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
