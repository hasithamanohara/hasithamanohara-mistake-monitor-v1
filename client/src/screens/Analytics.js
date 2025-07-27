import { useState, useEffect, useContext } from 'react';
import { getAnalytics, getAnalyticstypes, getAnalyticsShift } from '../services/analyticsService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [analyticsTypes, setAnalyticsTypes] = useState([]);
  const [analyticsShift, setAnalyticsShift] = useState([]); 
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [analyticsRes, typesRes, shiftRes] = await Promise.all([
        getAnalytics(),
        getAnalyticstypes(),
        getAnalyticsShift()
      ]);

      setAnalytics(analyticsRes.data);
      setAnalyticsTypes(typesRes.data || []); 
      setAnalyticsShift(shiftRes.data || []); 
    } catch (error) {
      toast.error('Error fetching analytics');
      console.error('Fetch error:', error);
    }
  };

  if (!analytics) return <div>Loading...</div>;

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div>
      <h1>Analytics</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>Total Employees: {analytics.totalEmployees}</div>
        {user.role === 'admin' && <div>Total Supervisors: {analytics.totalSupervisors}</div>}
        <div>Total Mistakes: {analytics.totalMistakes}</div>
        <div>Solved: {analytics.solvedMistakes} / Unsolved: {analytics.unsolvedMistakes}</div>
      </div>
      
      <div className="mt-4">
        <h2>Mistakes by Type</h2>
        {analyticsTypes.length > 0 ? (
          <BarChart width={500} height={300} data={analyticsTypes}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        ) : (
          <p>No type analytics available.</p>
        )}
      </div>
      
      <div className="mt-4">
        <h2>Mistakes by Shift</h2>
        {analyticsShift.length > 0 ? (
          <PieChart width={400} height={400}>
            <Pie
              data={analyticsShift}
              dataKey="count"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {analyticsShift.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <p>No shift analytics available.</p>
        )}
      </div>
    </div>
  );
};

export default Analytics;