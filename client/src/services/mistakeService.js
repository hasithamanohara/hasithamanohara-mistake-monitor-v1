import api from '../api/axios';

export const createMistake = async (data) => api.post('/mistakes', data);
export const getMistakes = async () => api.get('/mistakes');
export const getMistake = async (id) => api.get(`/mistakes/${id}`);
export const updateMistake = async (id, data) => api.put(`/mistakes/${id}`, data);
export const deleteMistake = async (id) => api.delete(`/mistakes/${id}`);
export const markSolved = async (id, solved) => api.patch(`/mistakes/${id}/solved`, { solved });