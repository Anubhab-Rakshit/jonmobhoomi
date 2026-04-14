const { v4: uuidv4 } = require('uuid');
const sorobanService = require('./sorobanService');

const escrowStore = new Map();
const adminAddress = process.env.ADMIN_ADDRESS || 'GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI';

async function createAgreement({ landId, seller, buyer, amount }) {
  if (seller === buyer) {
    throw new Error('Seller cannot be buyer');
  }
  if (amount <= 0) {
    throw new Error('Invalid amount');
  }
  
  if (escrowStore.has(landId)) {
    throw new Error('Escrow already exists');
  }
  
  const agreementId = uuidv4();
  const fee = (amount * 100) / 10000;
  
  const agreement = {
    agreementId,
    landId,
    seller,
    buyer,
    amount,
    fee,
    status: 'Pending',
    createdAt: Date.now(),
    releasedAt: null,
  };
  
  escrowStore.set(landId, agreement);
  
  await sorobanService.invokeContractWithAddress({
    contractName: 'escrow',
    method: 'create',
    args: [landId, seller, buyer, amount],
    sourceAddress: seller,
  });
  
  return {
    success: true,
    agreementId,
    landId,
    amount,
    fee,
  };
}

async function getAgreement(landId) {
  const agreement = escrowStore.get(landId);
  if (!agreement) {
    throw new Error('Escrow not found');
  }
  return agreement;
}

async function getAgreementStatus(landId) {
  const agreement = escrowStore.get(landId);
  if (!agreement) {
    return { status: 'None' };
  }
  return { status: agreement.status };
}

async function fundEscrow({ landId, buyer }) {
  const agreement = escrowStore.get(landId);
  if (!agreement) {
    throw new Error('Escrow not found');
  }
  if (agreement.buyer !== buyer) {
    throw new Error('Only buyer can fund');
  }
  if (agreement.status !== 'Pending') {
    throw new Error('Invalid status');
  }
  
  const totalAmount = agreement.amount + agreement.fee;
  agreement.status = 'Funded';
  escrowStore.set(landId, agreement);
  
  return { success: true, totalAmount };
}

async function releaseFunds({ landId, seller }) {
  const agreement = escrowStore.get(landId);
  if (!agreement) {
    throw new Error('Escrow not found');
  }
  if (agreement.seller !== seller) {
    throw new Error('Unauthorized');
  }
  if (agreement.status !== 'Funded') {
    throw new Error('Invalid status');
  }
  
  agreement.status = 'Released';
  agreement.releasedAt = Date.now();
  escrowStore.set(landId, agreement);
  
  return { success: true, amount: agreement.amount };
}

async function cancelEscrow({ landId, requester }) {
  const agreement = escrowStore.get(landId);
  if (!agreement) {
    throw new Error('Escrow not found');
  }
  if (agreement.seller !== requester && agreement.buyer !== requester) {
    throw new Error('Only seller or buyer can cancel');
  }
  if (agreement.status !== 'Pending') {
    throw new Error('Invalid status');
  }
  
  agreement.status = 'Cancelled';
  escrowStore.set(landId, agreement);
  
  return { success: true, amount: agreement.amount };
}

async function raiseDispute({ landId, requester }) {
  const agreement = escrowStore.get(landId);
  if (!agreement) {
    throw new Error('Escrow not found');
  }
  if (agreement.seller !== requester && agreement.buyer !== requester) {
    throw new Error('Unauthorized');
  }
  if (agreement.status !== 'Funded') {
    throw new Error('Invalid status');
  }
  
  agreement.status = 'DisputeRaised';
  escrowStore.set(landId, agreement);
  
  return { success: true, status: 'DisputeRaised' };
}

async function resolveDispute({ landId, releaseToSeller }) {
  const agreement = escrowStore.get(landId);
  if (!agreement) {
    throw new Error('Escrow not found');
  }
  if (agreement.status !== 'DisputeRaised') {
    throw new Error('Invalid status');
  }
  
  agreement.status = releaseToSeller ? 'Released' : 'Cancelled';
  agreement.releasedAt = Date.now();
  escrowStore.set(landId, agreement);
  
  return { success: true, status: agreement.status };
}

function initializeWithSampleEscrows() {
  const sampleEscrows = [
    {
      agreementId: 'ESC001',
      landId: 'LAND001',
      seller: 'GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI',
      buyer: 'GDGQVOKHW3VEAVUKHKTVGWS3VNB4CNG3VTCVGDGQVOKHW3VEAVUKHKTVGWS3',
      amount: 10000,
      fee: 100,
      status: 'Funded',
    },
  ];
  
  sampleEscrows.forEach(e => {
    e.createdAt = Date.now() - 86400000;
    escrowStore.set(e.landId, e);
  });
  
  console.log(`Initialized ${sampleEscrows.length} sample escrows`);
}

module.exports = {
  createAgreement,
  getAgreement,
  getAgreementStatus,
  fundEscrow,
  releaseFunds,
  cancelEscrow,
  raiseDispute,
  resolveDispute,
  initializeWithSampleEscrows,
  sorobanService,
};