import { AccountCreateDto, AccountCreateRes, GetAccountsRes } from "./interfaces/account.interface";
import { GoMintClientConstructor, Network } from "./interfaces/app.interface";
import { DealCreateDto, DealCreateRes } from "./interfaces/deal.interface";
import { TokenAssociateDto, TokenAssociateRes, TokenCreateDto, TokenCreateRes, TokenMintDto, TokenMintRes } from "./interfaces/token.interface";
export declare class GoMintClient {
    apiKey: string;
    network: Network;
    baseUrl: string;
    encryptionKey?: string;
    constructor({ apiKey, encryptionKey, network, }: GoMintClientConstructor);
    accountCreate(accountCreateDto: AccountCreateDto): Promise<AccountCreateRes>;
    getAccounts(): Promise<GetAccountsRes>;
    tokenAssociate(tokenAssociateDto: TokenAssociateDto): Promise<TokenAssociateRes>;
    tokenCreate(tokenCreateDto: TokenCreateDto): Promise<TokenCreateRes>;
    tokenMint(tokenMintDto: TokenMintDto): Promise<TokenMintRes>;
    dealCreate(dealCreate: DealCreateDto): Promise<DealCreateRes>;
    private getClient;
    private postClient;
}
