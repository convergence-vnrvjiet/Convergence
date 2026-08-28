import { getAllEvents, getUserRegistrations } from './db.js';

export const fetchAllEvents = async (userId = null) => {
  const events = await getAllEvents();
  let userRegisteredEventIds = new Set();

  // If a logged-in user is requesting, fetch their specific registrations
  if (userId) {
    const registrations = await getUserRegistrations(userId);
    userRegisteredEventIds = new Set(registrations.map(r => r.eventId));
  }

  // Map through events to append the dynamic boolean
  const formattedEvents = events.map(event => {
    // Remove the old property if it exists from the previous db query
    const { Registered, ...restOfEvent } = event; 
    
    return {
      ...restOfEvent,
      registered: userRegisteredEventIds.has(event.eventId)
    };
  });

  return { events: formattedEvents };
};