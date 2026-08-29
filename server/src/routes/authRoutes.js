import express from 'express';
import { registerUser, loginUser } from '../services/authService.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, college, rollNumber, year, branch, password } = req.body;
    
    const result = await registerUser({ 
      name, email, phone, college, rollNumber, year, branch, password 
    });
    
    res.status(201).json({ message: 'User registered successfully', userId: result.userId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

export default router;