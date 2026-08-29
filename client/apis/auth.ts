import { fetchClient } from './apiClient';

export const authApi = {
  register: (data: any) => 
    fetchClient('/auth/register', { //[cite: 2]
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: any) => 
    fetchClient('/auth/login', { //[cite: 2]
      method: 'POST',
      body: JSON.stringify(data),
    }),
};