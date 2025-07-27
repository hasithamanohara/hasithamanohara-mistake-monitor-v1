import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import DashboardHome from './services/dashboardHome';
import ManageSupervisors from './screens/ManageSupervisors';
import ManageEmployees from './screens/ManageEmployees';
import ManageMistakes from './screens/ManageMistakes';
import Analytics from './screens/Analytics';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />}>
        <Route index element={<DashboardHome />} />
        {user?.role === 'admin' && <Route path="supervisors" element={<ManageSupervisors />} />}
        <Route path="employees" element={<ManageEmployees />} />
        <Route path="mistakes" element={<ManageMistakes />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;