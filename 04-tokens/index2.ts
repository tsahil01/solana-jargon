import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

async function airDrop(publicKey: PublicKey, amount: number) {
    const airDropSignature = await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airDropSignature);
    console.log(`Airdropped ${amount} SOL to ${publicKey.toString()}`);
}

async function createNewToken(mintWallet: Keypair) {
    const mint = await createMint(connection, mintWallet, mintWallet.publicKey, null, 5);
    return mint

}

async function createMintAccount(mint: PublicKey, mintAuthority: Keypair, sendTo: PublicKey, amt: number) {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, mintAuthority, mint, sendTo);
    console.log(`Token acc created at:`, tokenAccount.address.toBase58());

    await mintTo(connection, mintAuthority, mint, tokenAccount.address, mintAuthority, amt * LAMPORTS_PER_SOL);
    console.log(`Minted`, amt, 'tokens to', tokenAccount.address.toBase58());

}

async function main() {
    const mintWallet = await Keypair.generate();
    console.log(`New wallet created:`, mintWallet.publicKey);
    await airDrop(mintWallet.publicKey, 5);

    const newToken = await createNewToken(mintWallet);
    console.log(`New Token:`, newToken);

    await createMintAccount(newToken, mintWallet, mintWallet.publicKey, 5);
}


main();