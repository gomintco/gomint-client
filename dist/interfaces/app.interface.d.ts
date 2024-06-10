export declare enum KeyType {
    ED25519 = "ed25519",
    ECDSA = "ecdsa"
}
export declare enum Network {
    MAINNET = "mainnet",
    TESTNET = "testnet"
}
export interface GoMintClientConstructor {
    apiKey: string;
    encryptionKey?: string;
    network: Network;
}
