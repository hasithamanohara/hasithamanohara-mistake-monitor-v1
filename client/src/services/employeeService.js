import api from '../api/axios';

export const createEmployee = async (data) => api.post('/employees', data);
export const getEmployees = async () => api.get('/employees');
export const searchEmployees = async (q) => api.get(`/employees/search?q=${q}`);
export const getEmployee = async (id) => api.get(`/employees/${id}`);
export const updateEmployee = async (id, data) => api.put(`/employees/${id}`, data);
export const deleteEmployee = async (id) => api.delete(`/employees/${id}`);