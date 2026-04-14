# JonmoBhoomi - Decentralized Land Ownership System

A secure, transparent, and decentralized land ownership system built on Stellar Soroban smart contracts.

## Problem Statement

Traditional land ownership systems face critical challenges:
- Fragmented, paper-based records vulnerable to fraud
- Time-consuming ownership verification
- Prone to disputes due to lack of tamper-proof records
- No transparent ownership history

## Solution

JonmoBhoomi provides a decentralized approach ensuring:
- **Transparency**: All transactions are recorded on-chain
- **Security**: Immutable records prevent unauthorized modifications
- **Efficiency**: Instant ownership verification
- **Dispute Resolution**: Built-in arbitration mechanism

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Express Backend API                       │
├─────────────────────────────────────────────────────────────┤
│  /land  /ownership  /dispute  /escrow  /pool               │
└──────────────────────┬────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│  Soroban      │ │  Soroban      │ │  Soroban      │
│  Smart       │ │  Smart       │ │  Smart       │
│  Contracts   │ │  Contracts   │ │  Contracts   │
└───────────────┘ └───────────────┘ └───────────────┘
        │              │              │
        └──────────────┼──────────────┘
                       ▼
              Stellar Blockchain
```

## Deployed Smart Contracts (Stellar Testnet)

| Contract | Contract ID | Explorer |
|----------|-------------|----------|
| **AccessControl** | `CA7ATDZG2QU4FOGVWXM3Y3SYTT4XDZVAWPY2XG2LPRDVJV4BV6QP6OYX` | [View](https://lab.stellar.org/r/testnet/contract/CA7ATDZG2QU4FOGVWXM3Y3SYTT4XDZVAWPY2XG2LPRDVJV4BV6QP6OYX) |
| **BoundaryHash** | `CC7OQFX43F4GEBWPITZVW3EFYIZLVVUJYTBMQ7QNPLVICSN6W34PPGNH` | [View](https://lab.stellar.org/r/testnet/contract/CC7OQFX43F4GEBWPITZVW3EFYIZLVVUJYTBMQ7QNPLVICSN6W34PPGNH) |
| **LandRegistry** | `CAWCKJE43OSH4BTZZMRZXXRTSMPJU7UOUIFFU3R5B3CZ6V7KNY6ZXCWF` | [View](https://lab.stellar.org/r/testnet/contract/CAWCKJE43OSH4BTZZMRZXXRTSMPJU7UOUIFFU3R5B3CZ6V7KNY6ZXCWF) |
| **OwnershipNFT** | `CBOJAOQDBFM6N52ZSZR324RGKJLASVO26C5ZQN3M32VZP4RHTYOBMIOY` | [View](https://lab.stellar.org/r/testnet/contract/CBOJAOQDBFM6N52ZSZR324RGKJLASVO26C5ZQN3M32VZP4RHTYOBMIOY) |
| **RWAMicroSharePool** | `CB7VFEVOUGGDMZPGIY7XUGM2I6O7CJBQSFETAJIQENHCSHCDPJB4FOCH` | [View](https://lab.stellar.org/r/testnet/contract/CB7VFEVOUGGDMZPGIY7XUGM2I6O7CJBQSFETAJIQENHCSHCDPJB4FOCH) |
| **DisputeArbitration** | `CABV2VC2ZOCHGT4MHH2S2XT3FZNPHVJD6K7GB6KAXX2NVAYAUKGIHZTH` | [View](https://lab.stellar.org/r/testnet/contract/CABV2VC2ZOCHGT4MHH2S2XT3FZNPHVJD6K7GB6KAXX2NVAYAUKGIHZTH) |
| **Escrow** | `CAIA44GRRCETSTAVREODFOBMOTPYAGTWZB3M2HIOFHPY7NRJNGSYWN5O` | [View](https://lab.stellar.org/r/testnet/contract/CAIA44GRRCETSTAVREODFOBMOTPYAGTWZB3M2HIOFHPY7NRJNGSYWN5O) |

## Deployment Transactions

| Contract | Transaction Hash | Explorer |
|----------|----------------|----------|
| AccessControl | `adeecac9445d387e6de1d623909747ceafed3dd0ae7d4f34b0af4a8d723d4b66` | [View](https://stellar.expert/explorer/testnet/tx/adeecac9445d387e6de1d623909747ceafed3dd0ae7d4f34b0af4a8d723d4b66) |
| BoundaryHash | `4df855c8bbbe7ada6f63620dc77cb922741f57e26b2b4dccdd4f4a46743756f8` | [View](https://stellar.expert/explorer/testnet/tx/4df855c8bbbe7ada6f63620dc77cb922741f57e26b2b4dccdd4f4a46743756f8) |
| LandRegistry | `7c2e47cec7c540871f6f1de4bd0cb262578e0596716710c909ba16b829dc80d2` | [View](https://stellar.expert/explorer/testnet/tx/7c2e47cec7c540871f6f1de4bd0cb262578e0596716710c909ba16b829dc80d2) |
| OwnershipNFT | `6ccd56fb96b81f90fb6426708b78c7421836ee9b2f9826edad00809b81507620` | [View](https://stellar.expert/explorer/testnet/tx/6ccd56fb96b81f90fb6426708b78c7421836ee9b2f9826edad00809b81507620) |
| RWAMicroSharePool | `958a9405ef44a99d2a468f503f8b66de2af499fb0ad428249d211ada864a26bc` | [View](https://stellar.expert/explorer/testnet/tx/958a9405ef44a99d2a468f503f8b66de2af499fb0ad428249d211ada864a26bc) |
| DisputeArbitration | `9af24c77eebedfd3ea7348d667746c0ceb850a89674bdbb9266caeb5a106fb8c` | [View](https://stellar.expert/explorer/testnet/tx/9af24c77eebedfd3ea7348d667746c0ceb850a89674bdbb9266caeb5a106fb8c) |
| Escrow | `4db9f5f635c473c3bb4806bf20a107394b75012623bffd005ba7ff98d9a0c06c` | [View](https://stellar.expert/explorer/testnet/tx/4db9f5f635c473c3bb4806bf20a107394b75012623bffd005ba7ff98d9a0c06c) |

## Smart Contracts

| Contract | Purpose |
|----------|---------|
| **AccessControl** | Role-based access management |
| **BoundaryHash** | Immutable land boundary verification |
| **LandRegistry** | Core land deed registration & transfer |
| **OwnershipNFT** | NFT-based land ownership |
| **RWAMicroSharePool** | Fractional ownership investment |
| **DisputeArbitration** | Dispute resolution |
| **Escrow** | Secure payment processing |

## Features

### Land Registry
- Register land with boundary hash verification
- Transfer ownership securely
- Verify ownership instantly
- Freeze/unfreeze land records

### NFT Ownership
- Mint land as NFTs
- Transfer ownership
- Enable fractional shares
- Track ownership history

### Investment Pools
- Create share pools for properties
- Invest in fractional shares
- Redeem shares
- Track shareholder positions

### Dispute Resolution
- Open disputes with evidence
- Accept/reject disputes
- Resolve with rulings
- Track dispute history

### Escrow
- Create payment agreements
- Fund escrow
- Release funds
- Cancel or dispute

## Tech Stack

- **Smart Contracts**: Rust, Stellar Soroban SDK
- **Backend**: Node.js, Express
- **Blockchain**: Stellar (Soroban)
- **Wallet**: Freighter

## Getting Started

### Prerequisites
- Rust toolchain
- Node.js 18+
- Stellar CLI

### Installation

```bash
# Clone repository
git clone <repo-url>
cd JonmoBhoomi-main

# Install backend dependencies
cd backend
npm install
```

### Configuration

```bash
# Copy environment file
cp .env.example .env

# Edit with your settings
# Add deployed contract IDs
```

### Run Backend

```bash
npm start
```

## API Endpoints

### Land Registry
- `POST /api/land/register` - Register new land
- `GET /api/land/deed/:landId` - Get land deed
- `POST /api/land/transfer` - Transfer ownership
- `GET /api/land/verify/:landId/:address` - Verify ownership

### Ownership NFT
- `POST /api/ownership/mint` - Mint land NFT
- `GET /api/ownership/:landId` - Get NFT info
- `POST /api/ownership/transfer` - Transfer NFT

### Dispute
- `POST /api/dispute/open` - Open dispute
- `GET /api/dispute/:landId` - Get dispute

### Escrow
- `POST /api/escrow/create` - Create agreement
- `POST /api/escrow/fund` - Fund escrow
- `POST /api/escrow/release` - Release funds

### Pool
- `POST /api/pool/create` - Create share pool
- `POST /api/pool/invest` - Invest in pool

## Environment Variables

```env
PORT=3000
NODE_ENV=development

SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NETWORK_PASSPHRASE=Test SDF Network ; September 2015

ADMIN_ADDRESS=GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI

# Deployed Contract Addresses (Testnet)
LAND_REGISTRY_CONTRACT=CAWCKJE43OSH4BTZZMRZXXRTSMPJU7UOUIFFU3R5B3CZ6V7KNY6ZXCWF
ACCESS_CONTROL_CONTRACT=CA7ATDZG2QU4FOGVWXM3Y3SYTT4XDZVAWPY2XG2LPRDVJV4BV6QP6OYX
BOUNDARY_HASH_CONTRACT=CC7OQFX43F4GEBWPITZVW3EFYIZLVVUJYTBMQ7QNPLVICSN6W34PPGNH
OWNERSHIP_NFT_CONTRACT=CBOJAOQDBFM6N52ZSZR324RGKJLASVO26C5ZQN3M32VZP4RHTYOBMIOY
RWA_MICRO_SHARE_POOL_CONTRACT=CB7VFEVOUGGDMZPGIY7XUGM2I6O7CJBQSFETAJIQENHCSHCDPJB4FOCH
DISPUTE_ARBITRATION_CONTRACT=CABV2VC2ZOCHGT4MHH2S2XT3FZNPHVJD6K7GB6KAXX2NVAYAUKGIHZTH
ESCROW_CONTRACT=CAIA44GRRCETSTAVREODFOBMOTPYAGTWZB3M2HIOFHPY7NRJNGSYWN5O
```

## Gas Fees

Deploying smart contracts requires XLM for:
- Base fee: ~2 XLM per operation
- WASM upload: ~10+ XLM per contract
- Contract creation: ~1 XLM per contract

## Testing

```bash
# Testnet is free for testing
# Get testnet XLM from: https://friendbot.stellar.org
```

## Explorer Links

- **Testnet Explorer**: https://stellar.expert/explorer/testnet/
- **Contract Viewer**: https://lab.stellar.org/r/testnet/contract/

## Documentation

- [Deployment Guide](./deployment.md)
- [Stellar Docs](https://developers.stellar.org)
- [Soroban SDK](https://soroban.stellar.org)

## License

MIT License

## Author

Built by Bdutta
