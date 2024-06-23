import { ACCOUNT_CREATE, DEAL_CREATE, TOKEN_ASSOCIATE, TOKEN_CREATE, TOKEN_MINT } from "./constants/endpoints";
import {
  AccountCreateDto,
  AccountCreateRes,
  GetAccountsRes,
} from "./interfaces/account.interface";
import { GoMintClientConstructor, KeyType, Network } from "./interfaces/app.interface";
import { DealCreateDto, DealCreateRes } from "./interfaces/deal.interface";
import {
  TokenAssociateDto,
  TokenAssociateRes,
  TokenCreateDto,
  TokenCreateRes,
  TokenMintDto,
  TokenMintRes,
} from "./interfaces/token.interface";

export class GoMintClient {
  apiKey: string;
  network: Network
  baseUrl = "https://test-api.gomint.me";
  encryptionKey?: string;

  constructor({
    apiKey,
    encryptionKey,
    network = Network.MAINNET,
  }: GoMintClientConstructor) {
    this.apiKey = apiKey;
    this.encryptionKey = encryptionKey;
    this.network = network;
  }

  async accountCreate(
    accountCreateDto: AccountCreateDto
  ): Promise<AccountCreateRes> {
    return await this.postClient(ACCOUNT_CREATE, {
      // means it can be updated by accountCreateDto
      type: KeyType.ED25519,
      ...accountCreateDto,
    });
  }

  async getAccounts(): Promise<GetAccountsRes> {
    return await this.getClient("/user/accounts");
  }

  async tokenAssociate(
    tokenAssociateDto: TokenAssociateDto
  ): Promise<TokenAssociateRes> {
    return await this.postClient(TOKEN_ASSOCIATE, {
      ...tokenAssociateDto,
    });
  }

  async tokenCreate(tokenCreateDto: TokenCreateDto): Promise<TokenCreateRes> {
    return await this.postClient(TOKEN_CREATE, {
      supplyKey: "default", // default = treasury account (or payerId?)
      ...tokenCreateDto,
    });
  }

  async tokenMint(tokenMintDto: TokenMintDto): Promise<TokenMintRes> {
    if (tokenMintDto.amount && (tokenMintDto.amount > 10 || tokenMintDto.amount < 1))
      throw new Error("Amount to mint must be 0 < n <= 10");
    return await this.postClient(TOKEN_MINT, {
      supplyKey: "default",
      metadatas: [],
      ...tokenMintDto,
    });
  }

  async dealCreate(dealCreate: DealCreateDto): Promise<DealCreateRes> {
    if (
      (!dealCreate.hbarTransfers &&
        !dealCreate.ftTransfers &&
        !dealCreate.nftTransfers) ||
      (!dealCreate.hbarTransfers!.length &&
        !dealCreate.ftTransfers!.length &&
        !dealCreate.nftTransfers!.length)
    )
      throw new Error("At least one transfer must be provided");
    return await this.postClient(DEAL_CREATE, {
      hbarTransfers: [],
      ftTransfers: [],
      nftTransfers: [],
      ...dealCreate,
    });
  }

  private async getClient(endpoint: string) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        "x-api-key": this.apiKey,
        "x-encryption-key": this.encryptionKey ?? ""
      },
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(`Error getting from GoMint API: ${json.error}`);
    }
    return json;
  }

  private async postClient<ReqBody>(endpoint: string, body: ReqBody) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
        "x-encryption-key": this.encryptionKey ?? ""
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(
        `Error posting to GoMint API: ${json.error}, ${json.message}`
      );
    }
    return json;
  }
}
