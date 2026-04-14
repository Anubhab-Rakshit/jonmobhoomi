const { Keypair, Networks } = require('@stellar/stellar-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const NETWORK_PASSPHRASE = process.env.NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015';
const ADMIN_ADDRESS = process.env.ADMIN_ADDRESS || 'GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI';

const contractAddresses = {
  landRegistry: process.env.LAND_REGISTRY_CONTRACT || 'CAWCKJE43OSH4BTZZMRZXXRTSMPJU7UOUIFFU3R5B3CZ6V7KNY6ZXCWF',
  accessControl: process.env.ACCESS_CONTROL_CONTRACT || 'CA7ATDZG2QU4FOGVWXM3Y3SYTT4XDZVAWPY2XG2LPRDVJV4BV6QP6OYX',
  boundaryHash: process.env.BOUNDARY_HASH_CONTRACT || 'CC7OQFX43F4GEBWPITZVW3EFYIZLVVUJYTBMQ7QNPLVICSN6W34PPGNH',
  ownershipNFT: process.env.OWNERSHIP_NFT_CONTRACT || 'CBOJAOQDBFM6N52ZSZR324RGKJLASVO26C5ZQN3M32VZP4RHTYOBMIOY',
  rwaMicroSharePool: process.env.RWA_MICRO_SHARE_POOL_CONTRACT || 'CB7VFEVOUGGDMZPGIY7XUGM2I6O7CJBQSFETAJIQENHCSHCDPJB4FOCH',
  disputeArbitration: process.env.DISPUTE_ARBITRATION_CONTRACT || 'CABV2VC2ZOCHGT4MHH2S2XT3FZNPHVJD6K7GB6KAXX2NVAYAUKGIHZTH',
  escrow: process.env.ESCROW_CONTRACT || 'CAIA44GRRCETSTAVREODFOBMOTPYAGTWZB3M2HIOFHPY7NRJNGSYWN5O',
};

const transactionHistory = [];

function getContractId(contractName) {
  return contractAddresses[contractName];
}

async function invokeContract({
  contractId,
  method,
  args = [],
  sourceAccount,
}) {
  const txId = uuidv4();
  
  transactionHistory.push({
    txId,
    contractId,
    method,
    args,
    timestamp: Date.now(),
    status: 'success',
  });
  
  return {
    success: true,
    txId,
    method,
    args,
    result: null,
  };
}

async function invokeContractWithAddress({
  contractName,
  method,
  args = [],
  sourceAddress = ADMIN_ADDRESS,
}) {
  const contractId = getContractId(contractName);
  return invokeContract({
    contractId,
    method,
    args,
    sourceAccount: sourceAddress,
  });
}

async function getContractData(contractId, key) {
  return null;
}

async function getAccountInfo(address) {
  return {
    address: address,
    exists: true,
  };
}

async function submitTransaction(transaction) {
  return {
    success: true,
    hash: uuidv4(),
    ledger: 1,
  };
}

async function simulateTransaction(transaction) {
  return {
    success: true,
    result: null,
  };
}

function getTransactionHistory() {
  return transactionHistory;
}

function getNetworkPassphrase() {
  return NETWORK_PASSPHRASE;
}

module.exports = {
  contractAddresses,
  getContractId,
  invokeContract,
  invokeContractWithAddress,
  getContractData,
  getAccountInfo,
  submitTransaction,
  simulateTransaction,
  getTransactionHistory,
  getNetworkPassphrase,
  NETWORK_PASSPHRASE,
  ADMIN_ADDRESS,
};