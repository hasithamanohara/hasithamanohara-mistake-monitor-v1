import { useState, useEffect } from 'react';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, searchEmployees } from '../services/employeeService';
import { toast } from 'react-toastify';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ name: '', employeeId: '', position: '', shift: '' });
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const { data } = await getEmployees();
      setEmployees(data);
    } catch (error) {
      toast.error('Error fetching employees');
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return fetchEmployees();
    try {
      const { data } = await searchEmployees(searchQuery);
      setEmployees(data);
    } catch (error) {
      toast.error('Error searching');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateEmployee(editingId, formData);
        toast.success('Updated');
      } else {
        await createEmployee(formData);
        toast.success('Created');
      }
      fetchEmployees();
      setFormData({ name: '', employeeId: '', position: '', shift: '' });
      setEditingId(null);
    } catch (error) {
      toast.error('Error');
    }
  };

  const handleEdit = (emp) => {
    setFormData({ name: emp.name, employeeId: emp.employeeId, position: emp.position, shift: emp.shift });
    setEditingId(emp._id);
  };

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    toast.success('Deleted');
    fetchEmployees();
  };

  return (
    <div>
      <h1>Manage Employees</h1>
      <input type="text" placeholder="Search by name or ID" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border p-2" />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2">Search</button>
      <form onSubmit={handleSubmit} className="mt-4">
        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2" />
        <input type="text" placeholder="Employee ID" value={formData.employeeId} onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })} className="border p-2" />
        <input type="text" placeholder="Position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="border p-2" />
        <input type="text" placeholder="Shift" value={formData.shift} onChange={(e) => setFormData({ ...formData, shift: e.target.value })} className="border p-2" />
        <button type="submit" className="bg-green-500 text-white p-2">{editingId ? 'Update' : 'Create'}</button>
      </form>
      <table className="mt-4 w-full border">
        <thead><tr><th>Name</th><th>ID</th><th>Position</th><th>Shift</th><th>Actions</th></tr></thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.employeeId}</td>
              <td>{emp.position}</td>
              <td>{emp.shift}</td>
              <td>
                <button onClick={() => handleEdit(emp)} className="bg-blue-500 text-white p-1">Edit</button>
                <button onClick={() => handleDelete(emp._id)} className="bg-red-500 text-white p-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEmployees;