# JonmoBhoomi Deployment Guide

## Deployed Smart Contracts (Testnet)

| Contract | Contract ID | Transaction Hash | Explorer |
|----------|-------------|------------------|----------|
| **AccessControl** | `CA7ATDZG2QU4FOGVWXM3Y3SYTT4XDZVAWPY2XG2LPRDVJV4BV6QP6OYX` | `adeecac9445d387e6de1d623909747ceafed3dd0ae7d4f34b0af4a8d723d4b66` | [View](https://lab.stellar.org/r/testnet/contract/CA7ATDZG2QU4FOGVWXM3Y3SYTT4XDZVAWPY2XG2LPRDVJV4BV6QP6OYX) |
| **BoundaryHash** | `CC7OQFX43F4GEBWPITZVW3EFYIZLVVUJYTBMQ7QNPLVICSN6W34PPGNH` | `4df855c8bbbe7ada6f63620dc77cb922741f57e26b2b4dccdd4f4a46743756f8` | [View](https://lab.stellar.org/r/testnet/contract/CC7OQFX43F4GEBWPITZVW3EFYIZLVVUJYTBMQ7QNPLVICSN6W34PPGNH) |
| **LandRegistry** | `CAWCKJE43OSH4BTZZMRZXXRTSMPJU7UOUIFFU3R5B3CZ6V7KNY6ZXCWF` | `7c2e47cec7c540871f6f1de4bd0cb262578e0596716710c909ba16b829dc80d2` | [View](https://lab.stellar.org/r/testnet/contract/CAWCKJE43OSH4BTZZMRZXXRTSMPJU7UOUIFFU3R5B3CZ6V7KNY6ZXCWF) |
| **OwnershipNFT** | `CBOJAOQDBFM6N52ZSZR324RGKJLASVO26C5ZQN3M32VZP4RHTYOBMIOY` | `6ccd56fb96b81f90fb6426708b78c7421836ee9b2f9826edad00809b81507620` | [View](https://lab.stellar.org/r/testnet/contract/CBOJAOQDBFM6N52ZSZR324RGKJLASVO26C5ZQN3M32VZP4RHTYOBMIOY) |
| **RWAMicroSharePool** | `CB7VFEVOUGGDMZPGIY7XUGM2I6O7CJBQSFETAJIQENHCSHCDPJB4FOCH` | `958a9405ef44a99d2a468f503f8b66de2af499fb0ad428249d211ada864a26bc` | [View](https://lab.stellar.org/r/testnet/contract/CB7VFEVOUGGDMZPGIY7XUGM2I6O7CJBQSFETAJIQENHCSHCDPJB4FOCH) |
| **DisputeArbitration** | `CABV2VC2ZOCHGT4MHH2S2XT3FZNPHVJD6K7GB6KAXX2NVAYAUKGIHZTH` | `9af24c77eebedfd3ea7348d667746c0ceb850a89674bdbb9266caeb5a106fb8c` | [View](https://lab.stellar.org/r/testnet/contract/CABV2VC2ZOCHGT4MHH2S2XT3FZNPHVJD6K7GB6KAXX2NVAYAUKGIHZTH) |
| **Escrow** | `CAIA44GRRCETSTAVREODFOBMOTPYAGTWZB3M2HIOFHPY7NRJNGSYWN5O` | `4db9f5f635c473c3bb4806bf20a107394b75012623bffd005ba7ff98d9a0c06c` | [View](https://lab.stellar.org/r/testnet/contract/CAIA44GRRCETSTAVREODFOBMOTPYAGTWZB3M2HIOFHPY7NRJNGSYWN5O) |

## Build Contracts

```bash
# Install Rust if needed
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown

# Build all contracts
cd contracts/access_control && cargo build --target wasm32-unknown-unknown --release
cd ../boundary_hash && cargo build --target wasm32-unknown-unknown --release
cd ../land_registry && cargo build --target wasm32-unknown-unknown --release
cd ../ownership_nft && cargo build --target wasm32-unknown-unknown --release
cd ../rwa_micro_share_pool && cargo build --target wasm32-unknown-unknown --release
cd ../dispute_arbitration && cargo build --target wasm32-unknown-unknown --release
cd ../escrow && cargo build --target wasm32-unknown-unknown --release
```

## Deploy to Testnet

```bash
# Install Stellar CLI
cargo install stellar-cli

# Create and fund testnet key
stellar keys generate my-key --network testnet
stellar keys fund my-key --network testnet

# Deploy contracts
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/access_control.wasm --source my-key --network testnet
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/boundary_hash.wasm --source my-key --network testnet
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/land_registry.wasm --source my-key --network testnet
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/ownership_nft.wasm --source my-key --network testnet
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/rwa_micro_share_pool.wasm --source my-key --network testnet
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/dispute_arbitration.wasm --source my-key --network testnet
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/escrow.wasm --source my-key --network testnet
```

## Deploy to Mainnet

```bash
# Generate mainnet key
stellar keys generate my-key --network mainnet

# Deploy to mainnet (requires XLM for fees)
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/access_control.wasm --source my-key --network mainnet
# ... repeat for other contracts
```

## Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with deployed contract IDs
npm install
npm start
```

## Verify Deployment

- **Testnet Explorer**: https://stellar.expert/explorer/testnet/
- **Contract Viewer**: https://lab.stellar.org/r/testnet/contract/

## Transaction Details

### AccessControl
- Contract: `CA7ATDZG2QU4FOGVWXM3Y3SYTT4XDZVAWPY2XG2LPRDVJV4BV6QP6OYX`
- Tx: `adeecac9445d387e6de1d623909747ceafed3dd0ae7d4f34b0af4a8d723d4b66`

### BoundaryHash
- Contract: `CC7OQFX43F4GEBWPITZVW3EFYIZLVVUJYTBMQ7QNPLVICSN6W34PPGNH`
- Tx: `4df855c8bbbe7ada6f63620dc77cb922741f57e26b2b4dccdd4f4a46743756f8`

### LandRegistry
- Contract: `CAWCKJE43OSH4BTZZMRZXXRTSMPJU7UOUIFFU3R5B3CZ6V7KNY6ZXCWF`
- Tx: `7c2e47cec7c540871f6f1de4bd0cb262578e0596716710c909ba16b829dc80d2`

### OwnershipNFT
- Contract: `CBOJAOQDBFM6N52ZSZR324RGKJLASVO26C5ZQN3M32VZP4RHTYOBMIOY`
- Tx: `6ccd56fb96b81f90fb6426708b78c7421836ee9b2f9826edad00809b81507620`

### RWAMicroSharePool
- Contract: `CB7VFEVOUGGDMZPGIY7XUGM2I6O7CJBQSFETAJIQENHCSHCDPJB4FOCH`
- Tx: `958a9405ef44a99d2a468f503f8b66de2af499fb0ad428249d211ada864a26bc`

### DisputeArbitration
- Contract: `CABV2VC2ZOCHGT4MHH2S2XT3FZNPHVJD6K7GB6KAXX2NVAYAUKGIHZTH`
- Tx: `9af24c77eebedfd3ea7348d667746c0ceb850a89674bdbb9266caeb5a106fb8c`

### Escrow
- Contract: `CAIA44GRRCETSTAVREODFOBMOTPYAGTWZB3M2HIOFHPY7NRJNGSYWN5O`
- Tx: `4db9f5f635c473c3bb4806bf20a107394b75012623bffd005ba7ff98d9a0c06c`