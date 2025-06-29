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
function airDrop(publicKey, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        const airDropSignature = yield connection.requestAirdrop(publicKey, amount * web3_js_1.LAMPORTS_PER_SOL);
        yield connection.confirmTransaction(airDropSignature);
        console.log(`Airdropped ${amount} SOL to ${publicKey.toString()}`);
    });
}
function createNewToken(mintWallet) {
    return __awaiter(this, void 0, void 0, function* () {
        const mint = yield (0, spl_token_1.createMint)(connection, mintWallet, mintWallet.publicKey, null, 5);
        return mint;
    });
}
function createMintAccount(mint, mintAuthority, sendTo, amt) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenAccount = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, mintAuthority, mint, sendTo);
        console.log(`Token acc created at:`, tokenAccount.address.toBase58());
        yield (0, spl_token_1.mintTo)(connection, mintAuthority, mint, tokenAccount.address, mintAuthority, amt * web3_js_1.LAMPORTS_PER_SOL);
        console.log(`Minted`, amt, 'tokens to', tokenAccount.address.toBase58());
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const mintWallet = yield web3_js_1.Keypair.generate();
        console.log(`New wallet created:`, mintWallet.publicKey);
        yield airDrop(mintWallet.publicKey, 5);
        const newToken = createNewToken(mintWallet);
        console.log(`New Token:`, newToken);
    });
}
main();
