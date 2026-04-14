const express = require('express');
const router = express.Router();
const poolService = require('../services/poolService');
const sorobanService = require('../services/sorobanService');

router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    contract: sorobanService.contractAddresses.rwaMicroSharePool,
    timestamp: new Date().toISOString() 
  });
});

router.post('/create', async (req, res, next) => {
  try {
    const { landId, totalShares, pricePerShare, owner } = req.body;
    
    if (!landId || !totalShares || !pricePerShare || !owner) {
      return res.status(400).json({ error: 'landId, totalShares, pricePerShare, and owner are required' });
    }
    
    const result = await poolService.createSharePool({ landId, totalShares, pricePerShare, owner });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:landId', async (req, res, next) => {
  try {
    const pool = await poolService.getSharePool(req.params.landId);
    res.json(pool);
  } catch (error) {
    next(error);
  }
});

router.post('/invest', async (req, res, next) => {
  try {
    const { landId, sharesToBuy, investor } = req.body;
    
    if (!landId || !sharesToBuy || !investor) {
      return res.status(400).json({ error: 'landId, sharesToBuy, and investor are required' });
    }
    
    const result = await poolService.invest({ landId, sharesToBuy, investor });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/redeem', async (req, res, next) => {
  try {
    const { landId, sharesToRedeem, shareholder } = req.body;
    
    if (!landId || !sharesToRedeem || !shareholder) {
      return res.status(400).json({ error: 'landId, sharesToRedeem, and shareholder are required' });
    }
    
    const result = await poolService.redeemShares({ landId, sharesToRedeem, shareholder });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/shareholder/:landId/:address', async (req, res, next) => {
  try {
    const shareholder = await poolService.getShareholder(req.params.landId, req.params.address);
    res.json(shareholder);
  } catch (error) {
    next(error);
  }
});

router.post('/update-price', async (req, res, next) => {
  try {
    const { landId, newPrice, owner } = req.body;
    
    if (!landId || !newPrice || !owner) {
      return res.status(400).json({ error: 'landId, newPrice, and owner are required' });
    }
    
    const result = await poolService.updatePoolPrice({ landId, newPrice, owner });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/stats', async (req, res, next) => {
  try {
    const stats = await poolService.getPoolCount();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;