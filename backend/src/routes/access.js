const express = require('express');
const router = express.Router();
const sorobanService = require('../services/sorobanService');

const roleStore = new Map();
const adminAddress = process.env.ADMIN_ADDRESS || 'GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI';

router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    contract: sorobanService.contractAddresses.accessControl,
    timestamp: new Date().toISOString() 
  });
});

router.post('/initialize', async (req, res, next) => {
  try {
    const { admin } = req.body;
    
    if (!admin) {
      return res.status(400).json({ error: 'admin address is required' });
    }
    
    roleStore.set('admin', { address: admin, role: 'Admin', assignedAt: Date.now() });
    
    res.json({
      success: true,
      admin,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/assign-role', async (req, res, next) => {
  try {
    const { address, role, admin } = req.body;
    
    if (!address || !role) {
      return res.status(400).json({ error: 'address and role are required' });
    }
    
    if (admin !== adminAddress) {
      return res.status(403).json({ error: 'Unauthorized: Admin only' });
    }
    
    roleStore.set(address, { address, role, assignedAt: Date.now() });
    
    res.json({
      success: true,
      address,
      role,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/revoke-role', async (req, res, next) => {
  try {
    const { address, admin } = req.body;
    
    if (!address) {
      return res.status(400).json({ error: 'address is required' });
    }
    
    if (admin !== adminAddress) {
      return res.status(403).json({ error: 'Unauthorized: Admin only' });
    }
    
    if (address === adminAddress) {
      return res.status(400).json({ error: 'Cannot revoke admin role' });
    }
    
    roleStore.delete(address);
    
    res.json({
      success: true,
      revoked: true,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/has-role/:address/:role', async (req, res, next) => {
  try {
    const user = roleStore.get(req.params.address);
    if (!user) {
      return res.json({ hasRole: false });
    }
    res.json({ hasRole: user.role === req.params.role });
  } catch (error) {
    next(error);
  }
});

router.get('/get-role/:address', async (req, res, next) => {
  try {
    const user = roleStore.get(req.params.address);
    if (!user) {
      return res.json({ role: null });
    }
    res.json({ role: user.role });
  } catch (error) {
    next(error);
  }
});

router.get('/check-admin/:address', async (req, res, next) => {
  try {
    res.json({ isAdmin: req.params.address === adminAddress });
  } catch (error) {
    next(error);
  }
});

module.exports = router;