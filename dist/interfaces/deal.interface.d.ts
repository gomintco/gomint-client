export interface DealCreateDto {
    hbarTransfers?: HbarTransfer[];
    ftTransfers?: FtTransfer[];
    nftTransfers?: NftTransfer[];
}
export interface DealCreateRes {
    dealId: string;
}
export interface HbarTransfer {
    accountId: string;
    amount: number;
}
export interface FtTransfer {
    tokenId: string;
    accountId: string;
    amount: number;
}
export interface NftTransfer {
    tokenId: string;
    senderId: string;
    receiverId: string;
    serialNumber?: number;
}
