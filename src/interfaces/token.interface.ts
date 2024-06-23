import { TokenCollectionMetadata, TokenMetadata } from "./metadata.interface";

type TokenType = "ft" | "nft"

export interface TokenCreateDto {
  payerId?: string;
  tokenName: string;
  tokenType: 'ft' | 'nft';
  tokenSymbol: string;
  decimals?: number;
  initialSupply?: number;
  treasuryAccountId: string;
  adminKey?: string;
  kycKey?: string;
  freezeKey?: string;
  wipeKey?: string;
  supplyKey?: string;
  feeScheduleKey?: string;
  pauseKey?: string;
  fixedFees?: FixedFee[];
  fractionalFees?: FractionalFee[];
  royaltyFees?: RoyaltyFee[];
  maxSupply?: number;
  finite?: boolean;
  expirationTime?: number;
  autoRenewAccountId?: string;
  metadataKey?: string;
  metadata?: string | TokenCollectionMetadata;
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

export interface FractionalFee {
  feeCollectorAccountId: string;
  numerator: number;
  denominator: number;
  max?: number;
  min?: number;
  senderPaysFees?: boolean;
  allCollectorsAreExempt?: boolean;
}

export interface RoyaltyFee {
  feeCollectorAccountId: string;
  numerator: number;
  denominator: number;
  fallbackFee?: FixedFee;
  allCollectorsAreExempt?: boolean;
}

export  interface TokenMintDto {
  tokenType: TokenType;
  tokenId: string;
  amount?: number;
  supplyKey?: string;
  payerId?: string;
  metadatas?: (string | TokenMetadata)[];
  metadata?: string | TokenMetadata;
}

export interface TokenMintRes {
  status: string;
}
