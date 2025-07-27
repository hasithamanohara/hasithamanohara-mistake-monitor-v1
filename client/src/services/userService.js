import api from '../api/axios';

export const createSupervisor = async (data) => api.post('/users', data);
export const getSupervisors = async () => api.get('/users');
export const updateSupervisor = async (id, data) => api.put(`/users/${id}`, data);
export const deleteSupervisor = async (id) => api.delete(`/users/${id}`);