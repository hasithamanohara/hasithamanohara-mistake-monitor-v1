import api from '../api/axios';

export const getAnalytics = async () => api.get('/analytics');
export const getAnalyticstypes = async () => api.get('/analytics/charts/byType');
export const getAnalyticsShift= async () => api.get('/analytics/charts/byShift');