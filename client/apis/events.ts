import { fetchClient } from './apiClient';

export const eventsApi = {
  // Public / Authenticated Event Listing
  getEvents: () => 
    fetchClient('/events', { //[cite: 2]
      method: 'GET',
    }),

  // Coordinator Event Management
  createEvent: (data: any) => 
    fetchClient('/events', { //[cite: 2]
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateEvent: (eventId: string, data: any) => 
    fetchClient(`/events/${eventId}`, { //[cite: 2]
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  deleteEvent: (eventId: string) => 
    fetchClient(`/events/${eventId}`, { //[cite: 2]
      method: 'DELETE',
    }),

  // Event Registration
  registerForEvent: (eventId: string, data: any) => 
    fetchClient(`/registrations/${eventId}`, { //[cite: 2]
      method: 'POST',
      body: JSON.stringify(data),
    }),
};