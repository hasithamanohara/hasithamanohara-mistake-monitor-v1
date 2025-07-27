import { useContext } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white h-screen p-4">
        <h2>Dashboard</h2>
        <nav>
          {user.role === 'admin' && <NavLink to="supervisors" className="block py-2">Supervisors</NavLink>}
          <NavLink to="employees" className="block py-2">Employees</NavLink>
          <NavLink to="mistakes" className="block py-2">Mistakes</NavLink>
          <NavLink to="analytics" className="block py-2">Analytics</NavLink>
        </nav>
        <button onClick={logout} className="mt-4 bg-red-500 p-2">Logout</button>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;