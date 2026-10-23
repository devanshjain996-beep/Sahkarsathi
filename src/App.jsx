import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import HomePage from "./pages/HomePage";
import AuthPage from "./components/auth/AuthPage";
import CustomerDashboard from "./components/dashboard/customer/CustomerDashboard";
import WorkerDashboard from "./components/dashboard/worker/WorkerDashboard";
import SupervisorDashboard from "./components/dashboard/supervisor/SupervisorDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<AuthPage defaultMode="signin" />} />
          <Route path="/signup" element={<AuthPage defaultMode="signup" />} />

          {/* Role-Protected Dashboards */}
          <Route
            path="/customer/dashboard"
            element={
              <ProtectedRoute allowedRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/worker/dashboard"
            element={
              <ProtectedRoute allowedRole="worker">
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/supervisor/dashboard"
            element={
              <ProtectedRoute allowedRole="supervisor">
                <SupervisorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback Catch-All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
