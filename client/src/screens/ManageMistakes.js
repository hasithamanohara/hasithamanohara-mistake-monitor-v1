import { useState, useEffect } from 'react';
import { getMistakes, createMistake, updateMistake, deleteMistake, markSolved } from '../services/mistakeService';
import { toast } from 'react-toastify';
import { getEmployees } from '../services/employeeService';

const ManageMistakes = () => {
  const [mistakes, setMistakes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({ employeeId: '', description: '', type: '', shift: '' });
  const [editingId, setEditingId] = useState(null);
  const [filterState, setFilterState] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterShift, setFilterShift] = useState('');
  const [sort, setSort] = useState('date');

  useEffect(() => {
    fetchMistakes();
    fetchEmployees();
  }, []);

  const fetchMistakes = async () => {
    try {
      const { data } = await getMistakes();
      setMistakes(data);
    } catch (error) {
      toast.error('Error fetching mistakes');
    }
  };

  const fetchEmployees = async () => {
    const { data } = await getEmployees();
    setEmployees(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateMistake(editingId, formData);
        toast.success('Updated');
      } else {
        await createMistake(formData);
        toast.success('Created');
      }
      fetchMistakes();
      setFormData({ employeeId: '', description: '', type: '', shift: '' });
      setEditingId(null);
    } catch (error) {
      toast.error('Error');
    }
  };

  const handleEdit = (mistake) => {
    setFormData({ employeeId: mistake.employeeId._id, description: mistake.description, type: mistake.type, shift: mistake.shift });
    setEditingId(mistake._id);
  };

  const handleDelete = async (id) => {
    await deleteMistake(id);
    toast.success('Deleted');
    fetchMistakes();
  };

  const handleMarkSolved = async (id, solved) => {
    await markSolved(id, solved);
    toast.success(solved ? 'Marked solved' : 'Marked unsolved');
    fetchMistakes();
  };

  const filteredMistakes = mistakes
    .filter((m) => (filterState ? m.solved.toString() === filterState : true))
    .filter((m) => (filterType ? m.type === filterType : true))
    .filter((m) => (filterShift ? m.shift === filterShift : true))
    .sort((a, b) => (sort === 'date' ? new Date(b.date) - new Date(a.date) : 0));

  return (
    <div>
      <h1>Manage Mistakes</h1>
      <form onSubmit={handleSubmit}>
        <select value={formData.employeeId} onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })} className="border p-2">
          <option value="">Select Employee</option>
          {employees.map((emp) => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
        </select>
        <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="border p-2" />
        <input type="text" placeholder="Type" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="border p-2" />
        <input type="text" placeholder="Shift" value={formData.shift} onChange={(e) => setFormData({ ...formData, shift: e.target.value })} className="border p-2" />
        <button type="submit" className="bg-green-500 text-white p-2">{editingId ? 'Update' : 'Create'}</button>
      </form>
      <div className="mt-4">
        <label>Filter State:</label>
        <select value={filterState} onChange={(e) => setFilterState(e.target.value)}>
          <option value="">All</option>
          <option value="true">Solved</option>
          <option value="false">Unsolved</option>
        </select>
        <label>Filter Type:</label>
        <input type="text" value={filterType} onChange={(e) => setFilterType(e.target.value)} className="border p-2" />
        <label>Filter Shift:</label>
        <input type="text" value={filterShift} onChange={(e) => setFilterShift(e.target.value)} className="border p-2" />
        <label>Sort by:</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="date">Date</option>
        </select>
      </div>
      <table className="mt-4 w-full border">
        <thead><tr><th>Employee</th><th>Description</th><th>Type</th><th>Shift</th><th>Solved</th><th>Actions</th></tr></thead>
        <tbody>
          {filteredMistakes
            .filter(m => m.employeeId)
            .map((mistake) => (
              <tr key={mistake._id}>
                <td>{mistake.employeeId.name}</td>
                <td>{mistake.description}</td>
                <td>{mistake.type}</td>
                <td>{mistake.shift}</td>
                <td>{mistake.solved ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleEdit(mistake)} className="bg-blue-500 text-white p-1">Edit</button>
                  <button onClick={() => handleDelete(mistake._id)} className="bg-red-500 text-white p-1">Delete</button>
                  <button onClick={() => handleMarkSolved(mistake._id, !mistake.solved)} className="bg-yellow-500 text-white p-1">
                    {mistake.solved ? 'Mark Unsolved' : 'Mark Solved'}
                  </button>
                </td>
              </tr>
            ))}

        </tbody>
      </table>
    </div>
  );
};

export default ManageMistakes;