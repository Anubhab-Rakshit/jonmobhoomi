const express = require('express');
const router = express.Router();
const landService = require('../services/landService');
const sorobanService = require('../services/sorobanService');

router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    contract: sorobanService.contractAddresses.landRegistry,
    timestamp: new Date().toISOString() 
  });
});

router.post('/register', async (req, res, next) => {
  try {
    const { landId, owner, boundaryHash, areaSqMeters, location, titleDeedHash } = req.body;
    
    if (!landId || !owner) {
      return res.status(400).json({ error: 'landId and owner are required' });
    }
    
    const result = await landService.registerLand({
      landId, 
      owner, 
      boundaryHash, 
      areaSqMeters, 
      location, 
      titleDeedHash
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/deed/:landId', async (req, res, next) => {
  try {
    const deed = await landService.getLandDeed(req.params.landId);
    res.json(deed);
  } catch (error) {
    next(error);
  }
});

router.get('/list', async (req, res, next) => {
  try {
    const lands = [];
    for (const [landId, deed] of landService.sorobanService?.inMemoryStore || []) {
      lands.push(deed);
    }
    res.json({ lands, count: lands.length });
  } catch (error) {
    next(error);
  }
});

router.post('/transfer', async (req, res, next) => {
  try {
    const { landId, newOwner, sender } = req.body;
    
    if (!landId || !newOwner || !sender) {
      return res.status(400).json({ error: 'landId, newOwner, and sender are required' });
    }
    
    const result = await landService.transferLand({ landId, newOwner, sender });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/verify/:landId/:address', async (req, res, next) => {
  try {
    const result = await landService.verifyOwnership(req.params.landId, req.params.address);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/dispute/initiate', async (req, res, next) => {
  try {
    const { landId, requester } = req.body;
    
    if (!landId || !requester) {
      return res.status(400).json({ error: 'landId and requester are required' });
    }
    
    const result = await landService.initiateDispute({ landId, requester });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/dispute/resolve', async (req, res, next) => {
  try {
    const { landId, newOwner, admin } = req.body;
    
    const result = await landService.resolveDispute({ landId, newOwner, admin });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/freeze', async (req, res, next) => {
  try {
    const { landId, admin } = req.body;
    const result = await landService.freezeLand({ landId, admin });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/unfreeze', async (req, res, next) => {
  try {
    const { landId, admin } = req.body;
    const result = await landService.unfreezeLand({ landId, admin });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/stats', async (req, res, next) => {
  try {
    const stats = await landService.getTotalRegisteredLands();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;