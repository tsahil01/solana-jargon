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
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"));
const walletAddress = `9ZNcgvaySfMnKWuiDuQ85nsL8JrbKTiZCQU8KgYP9JAr`;
function airDrop(publicKey, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const airDropSignature = yield connection.requestAirdrop(new web3_js_1.PublicKey(publicKey), amount * web3_js_1.LAMPORTS_PER_SOL);
        yield connection.confirmTransaction(airDropSignature);
        console.log(`Airdropped ${amount} SOL to ${publicKey.toString()}`);
    });
}
// airDrop(walletAddress, 2);
const payer = web3_js_1.Keypair.fromSecretKey(Uint8Array.from([100, 44, 148, 253, 145, 174, 203, 49, 93, 236, 83, 251, 228, 248, 49, 51, 152, 18, 85, 255, 122, 251, 115, 187, 166, 226, 27, 191, 59, 40, 66, 182, 156, 249, 42, 255, 163, 150, 8, 153, 86, 64, 56, 76, 126, 111, 191, 5, 95, 19, 187, 210, 55, 175, 9, 144, 245, 243, 180, 253, 63, 55, 8, 140]));
const mintAuthority = payer;
function createMintForToken(payer, mintAuthority) {
    return __awaiter(this, void 0, void 0, function* () {
        const mint = yield (0, spl_token_1.createMint)(connection, payer, mintAuthority.publicKey, null, 0);
        return mint;
    });
}
function mintNewToken(mint, mintAuthority, destination, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenAccount = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, mintAuthority, mint, new web3_js_1.PublicKey(destination));
        console.log('Token account created at', tokenAccount.address.toBase58());
        yield (0, spl_token_1.mintTo)(connection, payer, mint, tokenAccount.address, payer, amount);
        console.log('Minted', amount, 'tokens to', tokenAccount.address.toBase58());
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const mint = yield createMintForToken(payer, mintAuthority);
        console.log(`Mint Address: ${mint.toString()}`);
        yield mintNewToken(mint, mintAuthority, mintAuthority.publicKey, 1000);
    });
}
main();
