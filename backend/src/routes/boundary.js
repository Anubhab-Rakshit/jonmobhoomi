const express = require('express');
const router = express.Router();
const sorobanService = require('../services/sorobanService');

const boundaryStore = new Map();

router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    contract: sorobanService.contractAddresses.boundaryHash,
    timestamp: new Date().toISOString() 
  });
});

router.post('/register', async (req, res, next) => {
  try {
    const { land_id, boundary_hash } = req.body;
    
    if (!land_id || !boundary_hash) {
      return res.status(400).json({ error: 'land_id and boundary_hash are required' });
    }
    
    boundaryStore.set(land_id, {
      land_id,
      boundary_hash,
      registeredAt: Date.now(),
    });
    
    res.json({
      success: true,
      land_id,
      boundary_hash,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:land_id', async (req, res, next) => {
  try {
    const boundary = boundaryStore.get(req.params.land_id);
    if (!boundary) {
      return res.status(404).json({ error: 'Boundary not found' });
    }
    res.json(boundary);
  } catch (error) {
    next(error);
  }
});

router.get('/verify/:land_id/:boundary_hash', async (req, res, next) => {
  try {
    const stored = boundaryStore.get(req.params.land_id);
    if (!stored) {
      return res.json({ verified: false, error: 'Boundary not found' });
    }
    res.json({ verified: stored.boundary_hash === req.params.boundary_hash });
  } catch (error) {
    next(error);
  }
});

module.exports = router;