export interface AccountCreateDto {
  type?: KeyType;
  alias?: string;
  encryptionKey?: string;
}

export interface AccountCreateRes {
  accountId: string;
}

export interface GetAccountsRes {
  id: string;
  accounts: {
    id: string;
    alias: string;
    keys: {
      type: KeyType;
      publicKey: string;
    }[];
  }[];
}
