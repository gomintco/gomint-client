"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoMintClient = void 0;
const endpoints_1 = require("./constants/endpoints");
const app_interface_1 = require("./interfaces/app.interface");
class GoMintClient {
    constructor({ apiKey, encryptionKey, network = app_interface_1.Network.MAINNET, }) {
        this.baseUrl = "https://test-api.gomint.me";
        this.apiKey = apiKey;
        this.encryptionKey = encryptionKey;
        this.network = network;
    }
    accountCreate(accountCreateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postClient(endpoints_1.ACCOUNT_CREATE, Object.assign({ encryptionKey: this.encryptionKey, type: app_interface_1.KeyType.ED25519 }, accountCreateDto));
        });
    }
    getAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getClient("/user/accounts");
        });
    }
    tokenAssociate(tokenAssociateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postClient(endpoints_1.TOKEN_ASSOCIATE, Object.assign({ encryptionKey: this.encryptionKey }, tokenAssociateDto));
        });
    }
    tokenCreate(tokenCreateDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postClient(endpoints_1.TOKEN_CREATE, Object.assign({ encryptionKey: this.encryptionKey, supplyKey: "default" }, tokenCreateDto));
        });
    }
    tokenMint(tokenMintDto) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tokenMintDto.amount && (tokenMintDto.amount > 10 || tokenMintDto.amount < 1))
                throw new Error("Amount to mint must be 0 < n <= 10");
            return yield this.postClient(endpoints_1.TOKEN_MINT, Object.assign({ encryptionKey: this.encryptionKey, supplyKey: "default", metadatas: [] }, tokenMintDto));
        });
    }
    dealCreate(dealCreate) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((!dealCreate.hbarTransfers &&
                !dealCreate.ftTransfers &&
                !dealCreate.nftTransfers) ||
                (!dealCreate.hbarTransfers.length &&
                    !dealCreate.ftTransfers.length &&
                    !dealCreate.nftTransfers.length))
                throw new Error("At least one transfer must be provided");
            return yield this.postClient(endpoints_1.DEAL_CREATE, Object.assign({ hbarTransfers: [], ftTransfers: [], nftTransfers: [] }, dealCreate));
        });
    }
    getClient(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}${endpoint}`, {
                headers: {
                    "x-api-key": this.apiKey,
                },
            });
            const json = yield response.json();
            if (!response.ok) {
                throw new Error(`Error getting from GoMint API: ${json.error}`);
            }
            return json;
        });
    }
    postClient(endpoint, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.baseUrl}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": this.apiKey,
                },
                body: JSON.stringify(body),
            });
            const json = yield response.json();
            if (!response.ok) {
                throw new Error(`Error posting to GoMint API: ${json.error}, ${json.message}`);
            }
            return json;
        });
    }
}
exports.GoMintClient = GoMintClient;
