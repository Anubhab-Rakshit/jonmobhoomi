const express = require('express');
const router = express.Router();
const ownershipService = require('../services/ownershipService');
const sorobanService = require('../services/sorobanService');

router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    contract: sorobanService.contractAddresses.ownershipNFT,
    timestamp: new Date().toISOString() 
  });
});

router.post('/mint', async (req, res, next) => {
  try {
    const { landId, owner, metadataUri } = req.body;
    
    if (!landId || !owner) {
      return res.status(400).json({ error: 'landId and owner are required' });
    }
    
    const result = await ownershipService.mintNFT({ landId, owner, metadataUri });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:landId', async (req, res, next) => {
  try {
    const nft = await ownershipService.getNFTInfo(req.params.landId);
    res.json(nft);
  } catch (error) {
    next(error);
  }
});

router.get('/owner/:landId', async (req, res, next) => {
  try {
    const owner = await ownershipService.ownerOf(req.params.landId);
    res.json({ owner });
  } catch (error) {
    next(error);
  }
});

router.post('/transfer', async (req, res, next) => {
  try {
    const { landId, from, to } = req.body;
    
    if (!landId || !from || !to) {
      return res.status(400).json({ error: 'landId, from, and to are required' });
    }
    
    const result = await ownershipService.transfer({ landId, from, to });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/approve', async (req, res, next) => {
  try {
    const { landId, spender, approved } = req.body;
    
    const result = await ownershipService.approve({ landId, spender, approved });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/fractional/enable', async (req, res, next) => {
  try {
    const { landId, owner } = req.body;
    
    if (!landId || !owner) {
      return res.status(400).json({ error: 'landId and owner are required' });
    }
    
    const result = await ownershipService.enableFractionalShares({ landId, owner });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/fractional/add', async (req, res, next) => {
  try {
    const { landId, shareholder, sharePercentage } = req.body;
    
    if (!landId || !shareholder || !sharePercentage) {
      return res.status(400).json({ error: 'landId, shareholder, and sharePercentage are required' });
    }
    
    const result = await ownershipService.addFractionalShare({ landId, shareholder, sharePercentage });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/fractional/:landId/:shareholder', async (req, res, next) => {
  try {
    const share = await ownershipService.getSharePercentage(req.params.landId, req.params.shareholder);
    res.json(share);
  } catch (error) {
    next(error);
  }
});

router.delete('/:landId', async (req, res, next) => {
  try {
    const { admin } = req.body;
    const result = await ownershipService.burnNFT({ landId: req.params.landId, admin });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;