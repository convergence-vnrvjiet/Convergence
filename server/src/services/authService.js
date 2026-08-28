import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from './db.js';

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = 3600;

export const registerUser = async (userData) => {
  const existingUser = await findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Passwords must never be stored in plaintext
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const newUser = await createUser({
    ...userData,
    password: hashedPassword
  });

  return { userId: newUser.id };
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user.id, role: user.role, passStatus: user.passStatus },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );

  return {
    token,
    expiresIn: TOKEN_EXPIRY,
    user: {
      id: user.id,
      role: user.role,
      passStatus: user.passStatus
    }
  };
};