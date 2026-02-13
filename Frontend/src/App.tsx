import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Forms
import CaseReportForm from './pages/forms/CaseReportForm';
import WaterQualityForm from './pages/forms/WaterQualityForm';

// Visualizations
import HeatmapView from './pages/visualizations/HeatmapView';
import PredictionPage from './pages/predictions/PredictionPage';
import AlertsPanel from './pages/alerts/AlertsPanel';
import ReportsPage from './pages/reports/ReportsPage';

// Extras
import AwarenessPortal from './pages/awareness/AwarenessPortal';
import UserManagement from './pages/admin/UserManagement';

// Dashboards
import AdminDashboard from './pages/dashboards/AdminDashboard';
import OfficerDashboard from './pages/dashboards/HealthOfficerDashboard';
import WorkerDashboard from './pages/dashboards/WorkerDashboard';
import PublicDashboard from './pages/dashboards/PublicDashboard';
import ClinicDashboard from './pages/dashboards/ClinicDashboard';

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
    <p className="text-gray-600 mb-8">You do not have permission to view this page.</p>
    <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Go Back</a>
  </div>
);

// Component to redirect based on role
const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  switch (user.role) {
    case 'admin': return <Navigate to="/admin" replace />;
    case 'health_officer': return <Navigate to="/officer" replace />;
    case 'asha_worker': return <Navigate to="/worker" replace />;
    case 'clinic_staff': return <Navigate to="/clinic" replace />;
    case 'public': return <Navigate to="/public" replace />;
    default: return <Navigate to="/public" replace />;
  }
};

import MainLayout from './layouts/MainLayout';
import { Outlet } from 'react-router-dom';

const AppLayout = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes with Layout */}
          <Route element={<AppLayout />}>
            <Route path="/public/*" element={
              <ProtectedRoute allowedRoles={['public', 'admin', 'health_officer', 'asha_worker', 'clinic_staff']}>
                <Routes>
                  <Route path="/" element={<PublicDashboard />} />
                  <Route path="awareness" element={<AwarenessPortal />} />
                </Routes>
              </ProtectedRoute>
            } />

            <Route path="/admin/*" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="settings" element={<div className="p-4">System Settings (Coming Soon)</div>} />
                </Routes>
              </ProtectedRoute>
            } />

            <Route path="/officer/*" element={
              <ProtectedRoute allowedRoles={['health_officer', 'admin']}>
                <Routes>
                  <Route path="/" element={<OfficerDashboard />} />
                  <Route path="maps" element={<HeatmapView />} />
                  <Route path="predictions" element={<PredictionPage />} />
                  <Route path="alerts" element={<AlertsPanel />} />
                  <Route path="reports" element={<ReportsPage />} />
                </Routes>
              </ProtectedRoute>
            } />

            <Route path="/worker/*" element={
              <ProtectedRoute allowedRoles={['asha_worker', 'admin']}>
                <Routes>
                  <Route path="/" element={<WorkerDashboard />} />
                  <Route path="report-case" element={<CaseReportForm />} />
                  <Route path="water-quality" element={<WaterQualityForm />} />
                  <Route path="history" element={<div className="p-4">Submission History (Coming Soon)</div>} />
                </Routes>
              </ProtectedRoute>
            } />

            <Route path="/clinic/*" element={
              <ProtectedRoute allowedRoles={['clinic_staff', 'admin']}>
                <ClinicDashboard />
              </ProtectedRoute>
            } />
          </Route>

          {/* Root Redirect */}
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
