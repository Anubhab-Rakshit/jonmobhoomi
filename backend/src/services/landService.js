const { v4: uuidv4 } = require('uuid');
const sorobanService = require('./sorobanService');

const inMemoryStore = new Map();
const adminAddress = process.env.ADMIN_ADDRESS || 'GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI';

async function registerLand({ landId, owner, boundaryHash, areaSqMeters, location, titleDeedHash }) {
  try {
    if (inMemoryStore.has(landId)) {
      throw new Error('Land already registered');
    }
    
    const deed = {
      landId,
      owner,
      boundaryHash: boundaryHash || generatePlaceholderHash(),
      areaSqMeters: areaSqMeters || 0,
      location: location || '',
      titleDeedHash: titleDeedHash || generatePlaceholderHash(),
      registeredAt: Date.now(),
      lastTransferredAt: Date.now(),
      status: 'Registered',
    };
    
    inMemoryStore.set(landId, deed);
    
    await sorobanService.invokeContractWithAddress({
      contractName: 'landRegistry',
      method: 'register_land',
      args: [landId, owner, deed.boundaryHash],
      sourceAddress: adminAddress,
    });
    
    return {
      success: true,
      landId,
      transactionHash: uuidv4(),
      deed,
    };
  } catch (error) {
    throw new Error(`Failed to register land: ${error.message}`);
  }
}

async function getLandDeed(landId) {
  const deed = inMemoryStore.get(landId);
  if (!deed) {
    throw new Error('Land not found');
  }
  return deed;
}

async function transferLand({ landId, newOwner, sender }) {
  const deed = inMemoryStore.get(landId);
  if (!deed) {
    throw new Error('Land not found');
  }
  if (deed.owner !== sender) {
    throw new Error('Unauthorized: Sender is not the owner');
  }
  if (deed.status === 'Disputed') {
    throw new Error('Cannot transfer: Dispute is active');
  }
  
  const oldOwner = deed.owner;
  deed.owner = newOwner;
  deed.lastTransferredAt = Date.now();
  deed.status = 'Registered';
  
  inMemoryStore.set(landId, deed);
  
  return {
    success: true,
    landId,
    oldOwner,
    newOwner,
    transactionHash: uuidv4(),
  };
}

async function verifyOwnership(landId, address) {
  const deed = inMemoryStore.get(landId);
  if (!deed) {
    return { verified: false, error: 'Land not found' };
  }
  return { verified: deed.owner === address };
}

async function initiateDispute({ landId, requester }) {
  const deed = inMemoryStore.get(landId);
  if (!deed) {
    throw new Error('Land not found');
  }
  
  deed.status = 'Disputed';
  inMemoryStore.set(landId, deed);
  
  return {
    success: true,
    landId,
    disputeId: uuidv4(),
    status: 'Disputed',
  };
}

async function resolveDispute({ landId, newOwner }) {
  const deed = inMemoryStore.get(landId);
  if (!deed) {
    throw new Error('Land not found');
  }
  
  if (newOwner) {
    deed.owner = newOwner;
  }
  deed.status = 'Registered';
  deed.lastTransferredAt = Date.now();
  inMemoryStore.set(landId, deed);
  
  return {
    success: true,
    landId,
    resolved: true,
  };
}

async function freezeLand({ landId, admin }) {
  if (admin !== adminAddress) {
    throw new Error('Unauthorized: Admin only');
  }
  
  const deed = inMemoryStore.get(landId);
  if (!deed) {
    throw new Error('Land not found');
  }
  
  deed.status = 'Frozen';
  inMemoryStore.set(landId, deed);
  
  return { success: true, landId, status: 'Frozen' };
}

async function unfreezeLand({ landId, admin }) {
  if (admin !== adminAddress) {
    throw new Error('Unauthorized: Admin only');
  }
  
  const deed = inMemoryStore.get(landId);
  if (!deed) {
    throw new Error('Land not found');
  }
  
  deed.status = 'Registered';
  inMemoryStore.set(landId, deed);
  
  return { success: true, landId, status: 'Registered' };
}

async function getTotalRegisteredLands() {
  return {
    totalLands: inMemoryStore.size,
    contract: sorobanService.contractAddresses.landRegistry,
  };
}

function generatePlaceholderHash() {
  const chars = 'abcdef0123456789';
  let hash = '';
  for (let i = 0; i < 64; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return hash;
}

function initializeWithSampleData() {
  const sampleLands = [
    {
      landId: 'LAND001',
      owner: 'GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI',
      boundaryHash: 'a1b2c3d4e5f678901234567890123456789012345678901234567890123456789abcd',
      areaSqMeters: 5000,
      location: 'Dhaka, Bangladesh',
      titleDeedHash: 'titlehash001abc123def456',
      status: 'Registered',
    },
    {
      landId: 'LAND002',
      owner: 'GDGQVOKHW3VEAVUKHKTVGWS3VNB4CNG3VTCVGDGQVOKHW3VEAVUKHKTVGWS3',
      boundaryHash: 'b2c3d4e5f678901234567890123456789012345678901234567890123456789abcd',
      areaSqMeters: 10000,
      location: 'Chittagong, Bangladesh',
      titleDeedHash: 'titlehash002abc123def456',
      status: 'Registered',
    },
  ];
  
  sampleLands.forEach(land => {
    land.registeredAt = Date.now() - 86400000;
    land.lastTransferredAt = Date.now() - 86400000;
    inMemoryStore.set(land.landId, land);
  });
  
  console.log(`Initialized ${sampleLands.length} sample lands`);
}

module.exports = {
  registerLand,
  getLandDeed,
  transferLand,
  verifyOwnership,
  initiateDispute,
  resolveDispute,
  freezeLand,
  unfreezeLand,
  getTotalRegisteredLands,
  initializeWithSampleData,
  sorobanService,
  inMemoryStore,
};