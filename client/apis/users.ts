import { fetchClient } from './apiClient';

export const usersApi = {
  getQrCode: () => 
    fetchClient('/users/qr-code', { //[cite: 2]
      method: 'GET',
    }),
};