import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const DB_MODE = process.env.DB_MODE || 'memory';

// In-Memory store
const inMemoryDb = {
  users: [],
  events: [],
  registrations: [],
  payments: []
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

export const insertPayment = async (paymentData) => {
  if (DB_MODE === 'memory') {
    const payment = {
      id: `pay_${Date.now()}`,
      ...paymentData,
      createdAt: new Date().toISOString(),
    };
    inMemoryDb.payments.push(payment);
    return payment;
  }

  const query = `
    INSERT INTO payments (user_id, pass_type, amount, currency, razorpay_order_id, razorpay_payment_id, razorpay_signature, status, paid_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;
  const values = [
    paymentData.userId,
    paymentData.passType,
    paymentData.amount,
    paymentData.currency,
    paymentData.razorpayOrderId,
    paymentData.razorpayPaymentId,
    paymentData.razorpaySignature,
    paymentData.status,
    paymentData.paidAt,
  ];
  const res = await pool.query(query, values);
  return res.rows[0];
};

export const getPaymentByOrderId = async (orderId) => {
  if (DB_MODE === 'memory') {
    return inMemoryDb.payments.find(p => p.razorpayOrderId === orderId) || null;
  }

  const query = `SELECT * FROM payments WHERE razorpay_order_id = $1`;
  const res = await pool.query(query, [orderId]);
  return res.rows[0] || null;
};

export const updateUserPassStatus = async (userId, status) => {
  if (DB_MODE === 'memory') {
    const user = inMemoryDb.users.find(u => u.id === userId);
    if (user) {
      user.passStatus = status;
    }
    return user || null;
  }

  const query = `UPDATE users SET pass_status = $1 WHERE user_id = $2 RETURNING *`;
  const res = await pool.query(query, [status, userId]);
  return res.rows[0] || null;
};