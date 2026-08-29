import { fetchClient } from './apiClient';

export const adminApi = {
  getDashboardStats: () => 
    fetchClient('/admin/dashboard/stats', { //[cite: 2]
      method: 'GET',
    }),

  markAttendance: (qrIdentifier: string, eventId: string) => 
    fetchClient('/ops/attendance/scan', { //[cite: 2]
      method: 'POST',
      body: JSON.stringify({ qrIdentifier, eventId }),
    }),
};