require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const landRoutes = require('./routes/land');
const ownershipRoutes = require('./routes/ownership');
const disputeRoutes = require('./routes/dispute');
const escrowRoutes = require('./routes/escrow');
const poolRoutes = require('./routes/pool');
const boundaryRoutes = require('./routes/boundary');
const accessRoutes = require('./routes/access');

const landService = require('./services/landService');
const ownershipService = require('./services/ownershipService');
const disputeService = require('./services/disputeService');
const escrowService = require('./services/escrowService');
const poolService = require('./services/poolService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/', (req, res) => {
  res.json({ 
    name: 'JonmoBhoomi API',
    version: '1.0.0',
    description: 'Decentralized Land Ownership System on Stellar Soroban',
    endpoints: {
      health: '/api/health',
      land: '/api/land',
      ownership: '/api/ownership',
      dispute: '/api/dispute',
      escrow: '/api/escrow',
      pool: '/api/pool',
      boundary: '/api/boundary',
      access: '/api/access',
    },
    contracts: {
      landRegistry: process.env.LAND_REGISTRY_CONTRACT,
      accessControl: process.env.ACCESS_CONTROL_CONTRACT,
      boundaryHash: process.env.BOUNDARY_HASH_CONTRACT,
      ownershipNFT: process.env.OWNERSHIP_NFT_CONTRACT,
      rwaMicroSharePool: process.env.RWA_MICRO_SHARE_POOL_CONTRACT,
      disputeArbitration: process.env.DISPUTE_ARBITRATION_CONTRACT,
      escrow: process.env.ESCROW_CONTRACT,
    }
  });
});

app.use('/api/land', landRoutes);
app.use('/api/ownership', ownershipRoutes);
app.use('/api/dispute', disputeRoutes);
app.use('/api/escrow', escrowRoutes);
app.use('/api/pool', poolRoutes);
app.use('/api/boundary', boundaryRoutes);
app.use('/api/access', accessRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

function initializeSampleData() {
  try {
    if (landService.initializeWithSampleData) {
      landService.initializeWithSampleData();
    }
    if (ownershipService.initializeWithSampleNFTs) {
      ownershipService.initializeWithSampleNFTs();
    }
    if (disputeService.initializeWithSampleDisputes) {
      disputeService.initializeWithSampleDisputes();
    }
    if (escrowService.initializeWithSampleEscrows) {
      escrowService.initializeWithSampleEscrows();
    }
    if (poolService.initializeWithSamplePools) {
      poolService.initializeWithSamplePools();
    }
  } catch (error) {
    console.log('Sample data initialization skipped');
  }
}

app.listen(PORT, () => {
  initializeSampleData();
  console.log(`\n==========================================`);
  console.log(`   JonmoBhoomi API Server`);
  console.log(`==========================================`);
  console.log(`Port: ${PORT}`);
  console.log(`Network: Testnet`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
  console.log(`\nAPI Endpoints:`);
  console.log(`  - Land:       http://localhost:${PORT}/api/land`);
  console.log(`  - Ownership: http://localhost:${PORT}/api/ownership`);
  console.log(`  - Dispute:   http://localhost:${PORT}/api/dispute`);
  console.log(`  - Escrow:    http://localhost:${PORT}/api/escrow`);
  console.log(`  - Pool:     http://localhost:${PORT}/api/pool`);
  console.log(`  - Boundary: http://localhost:${PORT}/api/boundary`);
  console.log(`  - Access:   http://localhost:${PORT}/api/access`);
  console.log(`==========================================\n`);
});

module.exports = app;