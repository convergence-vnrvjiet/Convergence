// src/routes/eventRoutes.js
import express from 'express';
import { fetchAllEvents } from '../services/eventService.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /events - Public endpoint
router.get('/', optionalAuth, async (req, res) => {
  try {
    const result = await fetchAllEvents();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events', error: error.message });
  }
});

export default router;