import { useState, useEffect } from 'react';
import { getSupervisors, createSupervisor, updateSupervisor, deleteSupervisor } from '../services/userService';
import { toast } from 'react-toastify';

const ManageSupervisors = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const fetchSupervisors = async () => {
    try {
      const { data } = await getSupervisors();
      setSupervisors(data);
    } catch (error) {
      toast.error('Error fetching supervisors');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateSupervisor(editingId, formData);
        toast.success('Updated');
      } else {
        await createSupervisor(formData);
        toast.success('Created');
      }
      fetchSupervisors();
      setFormData({ username: '', password: '' });
      setEditingId(null);
    } catch (error) {
      toast.error('Error');
    }
  };

  const handleEdit = (sup) => {
    setFormData({ username: sup.username, password: '' });
    setEditingId(sup._id);
  };

  const handleDelete = async (id) => {
    await deleteSupervisor(id);
    toast.success('Deleted');
    fetchSupervisors();
  };

  return (
    <div>
      <h1>Manage Supervisors</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="border p-2" />
        <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="border p-2" />
        <button type="submit" className="bg-green-500 text-white p-2">{editingId ? 'Update' : 'Create'}</button>
      </form>
      <table className="mt-4 w-full border">
        <thead><tr><th>Username</th><th>Actions</th></tr></thead>
        <tbody>
          {supervisors.map((sup) => (
            <tr key={sup._id}>
              <td>{sup.username}</td>
              <td>
                <button onClick={() => handleEdit(sup)} className="bg-blue-500 text-white p-1">Edit</button>
                <button onClick={() => handleDelete(sup._id)} className="bg-red-500 text-white p-1">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSupervisors;