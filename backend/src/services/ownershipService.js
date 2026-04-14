const { v4: uuidv4 } = require('uuid');
const sorobanService = require('./sorobanService');

const nftStore = new Map();
const adminAddress = process.env.ADMIN_ADDRESS || 'GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI';

async function mintNFT({ landId, owner, metadataUri }) {
  if (nftStore.has(landId)) {
    throw new Error('NFT already exists for this land');
  }
  
  const tokenId = uuidv4();
  const nft = {
    tokenId,
    landId,
    owner,
    metadataUri: metadataUri || `https://jonmobhoomi.land/${landId}`,
    createdAt: Date.now(),
    fractionalEnabled: false,
  };
  
  nftStore.set(landId, nft);
  
  await sorobanService.invokeContractWithAddress({
    contractName: 'ownershipNFT',
    method: 'mint',
    args: [landId, owner],
    sourceAddress: adminAddress,
  });
  
  return {
    success: true,
    tokenId,
    landId,
    transactionHash: uuidv4(),
  };
}

async function getNFTInfo(landId) {
  const nft = nftStore.get(landId);
  if (!nft) {
    throw new Error('NFT not found');
  }
  return nft;
}

async function ownerOf(landId) {
  const nft = nftStore.get(landId);
  if (!nft) {
    throw new Error('NFT not found');
  }
  return nft.owner;
}

async function transfer({ landId, from, to }) {
  const nft = nftStore.get(landId);
  if (!nft) {
    throw new Error('NFT not found');
  }
  if (nft.owner !== from) {
    throw new Error('Transfer not authorized');
  }
  
  nft.owner = to;
  nftStore.set(landId, nft);
  
  return { success: true, landId, newOwner: to };
}

async function approve({ landId, spender, approved }) {
  const nft = nftStore.get(landId);
  if (!nft) {
    throw new Error('NFT not found');
  }
  
  return { success: true, approved };
}

async function enableFractionalShares({ landId, owner }) {
  const nft = nftStore.get(landId);
  if (!nft) {
    throw new Error('NFT not found');
  }
  if (nft.owner !== owner) {
    throw new Error('Transfer not authorized');
  }
  
  nft.fractionalEnabled = true;
  nftStore.set(landId, nft);
  
  return { success: true, fractionalEnabled: true };
}

async function addFractionalShare({ landId, shareholder, sharePercentage }) {
  if (sharePercentage > 10000) {
    throw new Error('Invalid share percentage');
  }
  
  const shareKey = `${landId}:${shareholder}`;
  const existingShare = nftStore.get(shareKey);
  
  if (existingShare) {
    throw new Error('Share already exists');
  }
  
  nftStore.set(shareKey, { shareholder, sharePercentage });
  
  return { success: true, sharePercentage };
}

async function getSharePercentage(landId, shareholder) {
  const shareKey = `${landId}:${shareholder}`;
  const share = nftStore.get(shareKey);
  if (!share) {
    return { sharePercentage: 0 };
  }
  return { sharePercentage: share.sharePercentage };
}

async function burnNFT({ landId, admin }) {
  const nft = nftStore.get(landId);
  if (!nft) {
    throw new Error('NFT not found');
  }
  
  nftStore.delete(landId);
  
  return { success: true, burned: true };
}

function initializeWithSampleNFTs() {
  const sampleNFTs = [
    {
      tokenId: 'NFT001',
      landId: 'LAND001',
      owner: 'GA6LENTHFAG3UY2HK7V24RBGYKIQTPLPG42G5QT26VILKB7KXLUR2ACI',
      metadataUri: 'https://jonmobhoomi.land/LAND001',
      fractionalEnabled: false,
    },
    {
      tokenId: 'NFT002',
      landId: 'LAND002',
      owner: 'GDGQVOKHW3VEAVUKHKTVGWS3VNB4CNG3VTCVGDGQVOKHW3VEAVUKHKTVGWS3',
      metadataUri: 'https://jonmobhoomi.land/LAND002',
      fractionalEnabled: true,
    },
  ];
  
  sampleNFTs.forEach(nft => {
    nft.createdAt = Date.now() - 86400000;
    nftStore.set(nft.landId, nft);
  });
  
  console.log(`Initialized ${sampleNFTs.length} sample NFTs`);
}

module.exports = {
  mintNFT,
  getNFTInfo,
  ownerOf,
  transfer,
  approve,
  enableFractionalShares,
  addFractionalShare,
  getSharePercentage,
  burnNFT,
  initializeWithSampleNFTs,
  sorobanService,
};