const express = require('express');
const router = express.Router();
const escrowService = require('../services/escrowService');
const sorobanService = require('../services/sorobanService');

router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    contract: sorobanService.contractAddresses.escrow,
    timestamp: new Date().toISOString() 
  });
});

router.post('/create', async (req, res, next) => {
  try {
    const { landId, seller, buyer, amount } = req.body;
    
    if (!landId || !seller || !buyer || !amount) {
      return res.status(400).json({ error: 'landId, seller, buyer, and amount are required' });
    }
    
    const result = await escrowService.createAgreement({ landId, seller, buyer, amount });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:landId', async (req, res, next) => {
  try {
    const agreement = await escrowService.getAgreement(req.params.landId);
    res.json(agreement);
  } catch (error) {
    next(error);
  }
});

router.get('/status/:landId', async (req, res, next) => {
  try {
    const status = await escrowService.getAgreementStatus(req.params.landId);
    res.json(status);
  } catch (error) {
    next(error);
  }
});

router.post('/fund', async (req, res, next) => {
  try {
    const { landId, buyer } = req.body;
    
    if (!landId || !buyer) {
      return res.status(400).json({ error: 'landId and buyer are required' });
    }
    
    const result = await escrowService.fundEscrow({ landId, buyer });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/release', async (req, res, next) => {
  try {
    const { landId, seller } = req.body;
    
    if (!landId || !seller) {
      return res.status(400).json({ error: 'landId and seller are required' });
    }
    
    const result = await escrowService.releaseFunds({ landId, seller });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/cancel', async (req, res, next) => {
  try {
    const { landId, requester } = req.body;
    
    if (!landId || !requester) {
      return res.status(400).json({ error: 'landId and requester are required' });
    }
    
    const result = await escrowService.cancelEscrow({ landId, requester });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/dispute', async (req, res, next) => {
  try {
    const { landId, requester } = req.body;
    
    if (!landId || !requester) {
      return res.status(400).json({ error: 'landId and requester are required' });
    }
    
    const result = await escrowService.raiseDispute({ landId, requester });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/dispute/resolve', async (req, res, next) => {
  try {
    const { landId, releaseToSeller } = req.body;
    
    if (!landId) {
      return res.status(400).json({ error: 'landId is required' });
    }
    
    const result = await escrowService.resolveDispute({ landId, releaseToSeller });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;