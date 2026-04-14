const express = require('express');
const router = express.Router();
const disputeService = require('../services/disputeService');
const sorobanService = require('../services/sorobanService');

router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    contract: sorobanService.contractAddresses.disputeArbitration,
    timestamp: new Date().toISOString() 
  });
});

router.post('/open', async (req, res, next) => {
  try {
    const { landId, claimant, respondent, description } = req.body;
    
    if (!landId || !claimant || !respondent) {
      return res.status(400).json({ error: 'landId, claimant, and respondent are required' });
    }
    
    const result = await disputeService.openDispute({ landId, claimant, respondent, description });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:landId', async (req, res, next) => {
  try {
    const dispute = await disputeService.getDispute(req.params.landId);
    res.json(dispute);
  } catch (error) {
    next(error);
  }
});

router.get('/status/:landId', async (req, res, next) => {
  try {
    const status = await disputeService.getDisputeStatus(req.params.landId);
    res.json(status);
  } catch (error) {
    next(error);
  }
});

router.post('/evidence', async (req, res, next) => {
  try {
    const { landId, evidenceHash } = req.body;
    
    if (!landId || !evidenceHash) {
      return res.status(400).json({ error: 'landId and evidenceHash are required' });
    }
    
    const result = await disputeService.addEvidence({ landId, evidenceHash });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/accept', async (req, res, next) => {
  try {
    const { landId } = req.body;
    
    if (!landId) {
      return res.status(400).json({ error: 'landId is required' });
    }
    
    const result = await disputeService.acceptDispute({ landId });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/resolve', async (req, res, next) => {
  try {
    const { landId, ruling } = req.body;
    
    if (!landId || !ruling) {
      return res.status(400).json({ error: 'landId and ruling are required' });
    }
    
    const result = await disputeService.resolveDispute({ landId, ruling });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/reject', async (req, res, next) => {
  try {
    const { landId } = req.body;
    
    if (!landId) {
      return res.status(400).json({ error: 'landId is required' });
    }
    
    const result = await disputeService.rejectDispute({ landId });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/stats', async (req, res, next) => {
  try {
    const stats = await disputeService.getTotalDisputes();
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;