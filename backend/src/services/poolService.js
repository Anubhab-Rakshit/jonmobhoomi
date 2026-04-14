const { v4: uuidv4 } = require('uuid');
const sorobanService = require('./sorobanService');

const poolStore = new Map();
const shareholderStore = new Map();

const adminAddress = process.env.ADMIN_ADDRESS || 'GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI';

async function createSharePool({ landId, totalShares, pricePerShare, owner }) {
  if (poolStore.has(landId)) {
    throw new Error('Pool already exists');
  }
  
  const shareId = uuidv4();
  const pool = {
    shareId,
    landId,
    totalShares,
    availableShares: totalShares,
    pricePerShare,
    owner,
    createdAt: Date.now(),
  };
  
  poolStore.set(landId, pool);
  
  await sorobanService.invokeContractWithAddress({
    contractName: 'rwaMicroSharePool',
    method: 'create_pool',
    args: [landId, totalShares, pricePerShare],
    sourceAddress: adminAddress,
  });
  
  return {
    success: true,
    shareId,
    landId,
    totalShares,
    pricePerShare,
  };
}

async function getSharePool(landId) {
  const pool = poolStore.get(landId);
  if (!pool) {
    throw new Error('Pool not found');
  }
  return pool;
}

async function invest({ landId, sharesToBuy, investor }) {
  const pool = poolStore.get(landId);
  if (!pool) {
    throw new Error('Pool not found');
  }
  
  if (sharesToBuy > pool.availableShares) {
    throw new Error('Insufficient shares');
  }
  
  const totalCost = pool.pricePerShare * sharesToBuy;
  
  if (totalCost < 10 || totalCost > 1000000) {
    throw new Error('Invalid investment amount');
  }
  
  pool.availableShares -= sharesToBuy;
  poolStore.set(landId, pool);
  
  const shareholderKey = `${landId}:${investor}`;
  let shareholder = shareholderStore.get(shareholderKey);
  
  if (shareholder) {
    shareholder.sharesOwned += sharesToBuy;
    shareholder.investedAmount += totalCost;
  } else {
    shareholder = {
      address: investor,
      sharesOwned: sharesToBuy,
      investedAmount: totalCost,
      joinedAt: Date.now(),
    };
  }
  
  shareholderStore.set(shareholderKey, shareholder);
  
  return {
    success: true,
    sharesOwned: sharesToBuy,
    totalCost,
  };
}

async function redeemShares({ landId, sharesToRedeem, shareholder }) {
  const shareholderKey = `${landId}:${shareholder}`;
  let sh = shareholderStore.get(shareholderKey);
  if (!sh) {
    throw new Error('Shareholder not found');
  }
  
  if (sharesToRedeem > sh.sharesOwned) {
    throw new Error('Cannot remove shares');
  }
  
  const pool = poolStore.get(landId);
  if (!pool) {
    throw new Error('Pool not found');
  }
  
  const redeemValue = pool.pricePerShare * sharesToRedeem;
  
  sh.sharesOwned -= sharesToRedeem;
  sh.investedAmount -= redeemValue;
  
  if (sh.sharesOwned === 0) {
    shareholderStore.delete(shareholderKey);
  } else {
    shareholderStore.set(shareholderKey, sh);
  }
  
  pool.availableShares += sharesToRedeem;
  poolStore.set(landId, pool);
  
  return {
    success: true,
    redeemValue,
    sharesRemaining: sh.sharesOwned,
  };
}

async function getShareholder(landId, address) {
  const shareholderKey = `${landId}:${address}`;
  const shareholder = shareholderStore.get(shareholderKey);
  if (!shareholder) {
    throw new Error('Shareholder not found');
  }
  return shareholder;
}

async function updatePoolPrice({ landId, newPrice, owner }) {
  const pool = poolStore.get(landId);
  if (!pool) {
    throw new Error('Pool not found');
  }
  if (pool.owner !== owner) {
    throw new Error('Unauthorized');
  }
  
  pool.pricePerShare = newPrice;
  poolStore.set(landId, pool);
  
  return { success: true, newPrice };
}

async function getPoolCount() {
  return {
    totalPools: poolStore.size,
    contract: sorobanService.contractAddresses.rwaMicroSharePool,
  };
}

function initializeWithSamplePools() {
  const samplePools = [
    {
      shareId: 'POOL001',
      landId: 'LAND001',
      totalShares: 10000,
      availableShares: 7500,
      pricePerShare: 100,
      owner: 'GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI',
    },
  ];
  
  samplePools.forEach(p => {
    p.createdAt = Date.now() - 86400000;
    poolStore.set(p.landId, p);
  });
  
  console.log(`Initialized ${samplePools.length} sample pools`);
}

module.exports = {
  createSharePool,
  getSharePool,
  invest,
  redeemShares,
  getShareholder,
  updatePoolPrice,
  getPoolCount,
  initializeWithSamplePools,
  sorobanService,
};