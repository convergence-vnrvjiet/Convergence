import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const DB_MODE = process.env.DB_MODE || 'memory';

// In-Memory store seeded with initial mock data
const inMemoryDb = {
  users: [],
  events: [
    {
      eventId: 'ev_101',
      name: 'Coding Contest',
      description: 'Put your skills to test with our algorithmic challenges.',
      category: 'Technical',
      venue: 'E001',
      prize_pool: 5000,
      registration_deadline: '2026-08-28T13:30:00Z',
      start_time: '2026-08-28T14:30:00Z',
      end_time: '2026-08-28T16:30:00Z',
      contact: ['+91 9100000000', '+91 9200000000'],
      participantLimit: 100,
      registered: false
    },
    {
      eventId: 'ev_102',
      name: 'Robo Wars',
      description: 'Battle of custom-built combat robots.',
      category: 'Technical',
      venue: 'Open Auditorium',
      prize_pool: 15000,
      registration_deadline: '2026-08-28T12:00:00Z',
      start_time: '2026-08-28T15:00:00Z',
      end_time: '2026-08-28T18:00:00Z',
      contact: ['+91 9300000000'],
      participantLimit: 30,
      registered: false
    }
  ],
  registrations: []
};

let pool;
if (DB_MODE === 'local' || DB_MODE === 'supabase') {
  pool = new Pool({
    connectionString: DB_MODE === 'supabase' 
      ? process.env.SUPABASE_DB_URL 
      : process.env.LOCAL_DB_URL,
    ssl: DB_MODE === 'supabase' ? { rejectUnauthorized: false } : false
  });
}

export const getDbMode = () => DB_MODE;

export const getAllEvents = async () => {
  if (DB_MODE === 'memory') {
    return inMemoryDb.events;
  }
  
  const query = `
    SELECT 
      event_id AS "eventId",
      event_name AS "name",
      description,
      category,
      venue,
      prize_pool,
      registration_deadline,
      start_time,
      end_time,
      contact,
      participant_limit AS "participantLimit"
    FROM events
    WHERE status != 'archived';
  `;
  const res = await pool.query(query);
  return res.rows;
};

export const getUserRegistrations = async (userId) => {
  if (getDbMode() === 'memory') {
    return inMemoryDb.registrations.filter(r => r.userId === userId);
  }
  
  const query = `SELECT event_id AS "eventId" FROM registrations WHERE user_id = $1`;
  const res = await pool.query(query, [userId]);
  return res.rows; 
};

export const findUserByEmail = async (email) => {
  if (DB_MODE === 'memory') {
    return inMemoryDb.users.find(u => u.email === email);
  }
  const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
};

export const createUser = async (userData) => {
  if (DB_MODE === 'memory') {
    const newUser = { id: `usr_${Date.now()}`, ...userData, role: 'attendee', passStatus: 'inactive' };
    inMemoryDb.users.push(newUser);
    return newUser;
  }
  
  const query = `
    INSERT INTO users (user_id, name, email, phone, institution, password, role, pass_status)
    VALUES ($1, $2, $3, $4, $5, $6, 'Student', 'Inactive') RETURNING *
  `;
  const values = [`usr_${Date.now()}`, userData.name, userData.email, userData.phone, userData.institution, userData.password];
  const res = await pool.query(query, values);
  return res.rows[0];
};