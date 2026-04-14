const { v4: uuidv4 } = require('uuid');
const sorobanService = require('./sorobanService');

const disputeStore = new Map();
const adminAddress = process.env.ADMIN_ADDRESS || 'GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI';

async function openDispute({ landId, claimant, respondent, description }) {
  if (claimant === respondent) {
    throw new Error('Respondent cannot be claimant');
  }
  
  if (disputeStore.has(landId)) {
    throw new Error('Dispute already exists');
  }
  
  const disputeId = uuidv4();
  const dispute = {
    disputeId,
    landId,
    claimant,
    respondent,
    description: description || '',
    evidenceHashes: [],
    status: 'Pending',
    createdAt: Date.now(),
    resolvedAt: null,
    ruling: null,
  };
  
  disputeStore.set(landId, dispute);
  
  await sorobanService.invokeContractWithAddress({
    contractName: 'disputeArbitration',
    method: 'open_dispute',
    args: [landId, claimant, respondent, description],
    sourceAddress: claimant,
  });
  
  return {
    success: true,
    disputeId,
    landId,
    status: 'Pending',
  };
}

async function getDispute(landId) {
  const dispute = disputeStore.get(landId);
  if (!dispute) {
    throw new Error('Dispute not found');
  }
  return dispute;
}

async function getDisputeStatus(landId) {
  const dispute = disputeStore.get(landId);
  if (!dispute) {
    return { status: 'None' };
  }
  return { status: dispute.status };
}

async function addEvidence({ landId, evidenceHash }) {
  const dispute = disputeStore.get(landId);
  if (!dispute) {
    throw new Error('Dispute not found');
  }
  
  if (dispute.status !== 'Pending' && dispute.status !== 'UnderReview') {
    throw new Error('Invalid dispute status');
  }
  
  dispute.evidenceHashes.push(evidenceHash);
  disputeStore.set(landId, dispute);
  
  return { success: true, evidenceHash };
}

async function acceptDispute({ landId }) {
  const dispute = disputeStore.get(landId);
  if (!dispute) {
    throw new Error('Dispute not found');
  }
  if (dispute.status !== 'Pending') {
    throw new Error('Invalid dispute status');
  }
  
  dispute.status = 'UnderReview';
  disputeStore.set(landId, dispute);
  
  return { success: true, status: 'UnderReview' };
}

async function resolveDispute({ landId, ruling }) {
  const dispute = disputeStore.get(landId);
  if (!dispute) {
    throw new Error('Dispute not found');
  }
  if (dispute.status !== 'UnderReview') {
    throw new Error('Invalid dispute status');
  }
  
  dispute.status = 'Resolved';
  dispute.ruling = ruling;
  dispute.resolvedAt = Date.now();
  disputeStore.set(landId, dispute);
  
  return { success: true, ruling };
}

async function rejectDispute({ landId }) {
  const dispute = disputeStore.get(landId);
  if (!dispute) {
    throw new Error('Dispute not found');
  }
  
  dispute.status = 'Rejected';
  dispute.resolvedAt = Date.now();
  disputeStore.set(landId, dispute);
  
  return { success: true, status: 'Rejected' };
}

async function getTotalDisputes() {
  return {
    totalDisputes: disputeStore.size,
    contract: sorobanService.contractAddresses.disputeArbitration,
  };
}

function initializeWithSampleDisputes() {
  const sampleDisputes = [
    {
      disputeId: 'DISP001',
      landId: 'LAND001',
      claimant: 'GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI',
      respondent: 'GDGQVOKHW3VEAVUKHKTVGWS3VNB4CNG3VTCVGDGQVOKHW3VEAVUKHKTVGWS3',
      description: 'Boundary dispute for plot 5',
      status: 'Pending',
    },
  ];
  
  sampleDisputes.forEach(d => {
    d.createdAt = Date.now() - 86400000;
    disputeStore.set(d.landId, d);
  });
  
  console.log(`Initialized ${sampleDisputes.length} sample disputes`);
}

module.exports = {
  openDispute,
  getDispute,
  getDisputeStatus,
  addEvidence,
  acceptDispute,
  resolveDispute,
  rejectDispute,
  getTotalDisputes,
  initializeWithSampleDisputes,
  sorobanService,
};