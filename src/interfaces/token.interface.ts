export interface TokenCreateDto {
  tokenName: string;
  tokenSymbol: string;
  tokenType: "ft" | "nft";
  treasuryAccountId: string;
  payerId?: string;
  supplyKey?: string;
  adminKey?: string;
  freezeKey?: string;
  kycKey?: string;
  pauseKey?: string;
  wipeKey?: string;
  feeScheduleKey?: string;
  maxSupply?: number;
  fixedFees?: FixedFee[];
  royaltyFees?: RoyaltyFee[];
  encryptionKey?: string;
}

export interface TokenCreateRes {
  token: string;
}

export interface TokenAssociateDto {
  associatingId: string;
  tokenIds: string[];
  encryptionKey?: string;
  payerId?: string;
}

export interface TokenAssociateRes {
  status: string;
}

export interface FixedFee {
  feeCollectorAccountId: string;
  hbarAmount?: number;
  ftAmount?: number;
  ftId?: string;
  allCollectorsAreExempt?: boolean;
}

export interface RoyaltyFee {
  feeCollectorAccountId: string;
  numerator: number;
  denominator: number;
  fallbackFee?: FixedFee;
  allCollectorsAreExempt?: boolean;
}

export interface TokenMintDto {
  tokenId: string;
  tokenType: "ft" | "nft";
  payerId?: string;
  metadatas?: string[];
  metadata?: string;
  amount?: number;
  supplyKey?: string;
  encryptionKey?: string;
}

export interface TokenMintRes {
  status: string;
}
