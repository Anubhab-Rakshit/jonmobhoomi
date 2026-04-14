const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CONTRACTS_DIR = path.join(__dirname, '..', 'contracts');
const BACKEND_DIR = path.join(__dirname, '..', 'backend');

const contracts = [
  'access_control',
  'boundary_hash',
  'land_registry',
  'ownership_nft',
  'rwa_micro_share_pool',
  'dispute_arbitration',
  'escrow'
];

console.log('Starting deployment...\n');

function buildContract(contractName) {
  console.log(`Building ${contractName}...`);
  const contractPath = path.join(CONTRACTS_DIR, contractName);
  
  try {
    execSync('cargo build --target wasm32-unknown-unknown --release', {
      cwd: contractPath,
      stdio: 'inherit'
    });
    console.log(`✓ ${contractName} built successfully\n`);
  } catch (error) {
    console.error(`✗ Failed to build ${contractName}\n`);
    throw error;
  }
}

function deployContract(contractName) {
  console.log(`Deploying ${contractName} to Soroban...`);
  
  const wasmPath = path.join(CONTRACTS_DIR, contractName, 'target', 'wasm32-unknown-unknown', 'release', `${contractName}.wasm`);
  
  if (!fs.existsSync(wasmPath)) {
    console.log(`  (WASM not found, skipping deployment)`);
    return null;
  }
  
  return `CONTRACT_ID_${contractName.toUpperCase()}`;
}

async function deployBackend() {
  console.log('Installing backend dependencies...');
  execSync('npm install', { cwd: BACKEND_DIR, stdio: 'inherit' });
  console.log('✓ Backend dependencies installed\n');
}

async function main() {
  console.log('=== JonmoBhoomi Deployment ===\n');
  
  console.log('--- Building Contracts ---');
  contracts.forEach(buildContract);
  
  console.log('--- Deploying to Soroban ---');
  const deployedAddresses = {};
  contracts.forEach(name => {
    const address = deployContract(name);
    if (address) {
      deployedAddresses[name] = address;
    }
  });
  
  console.log('\n--- Setting up Backend ---');
  await deployBackend();
  
  const envExample = fs.readFileSync(path.join(BACKEND_DIR, '.env.example'), 'utf8');
  const envPath = path.join(BACKEND_DIR, '.env');
  
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envExample);
    console.log('✓ Created .env file from template\n');
  }
  
  console.log('\n=== Deployment Complete ===');
  console.log('\nNext steps:');
  console.log('1. Update contract addresses in backend/.env');
  console.log('2. Run "npm run start:backend" to start the API server');
  console.log('3. Deploy WASM contracts to Stellar Soroban network');
}

main().catch(console.error);