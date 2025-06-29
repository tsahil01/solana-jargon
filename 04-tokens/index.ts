import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));

const walletAddress = `9ZNcgvaySfMnKWuiDuQ85nsL8JrbKTiZCQU8KgYP9JAr`;

async function airDrop(publicKey: string, amount: number) {
    const airDropSignature = await connection.requestAirdrop(new PublicKey(publicKey), amount * LAMPORTS_PER_SOL);
    await connection.confirmTransaction(airDropSignature);
    console.log(`Airdropped ${amount} SOL to ${publicKey.toString()}`);
}

// airDrop(walletAddress, 2);

const payer = Keypair.fromSecretKey(Uint8Array.from([100, 44, 148, 253, 145, 174, 203, 49, 93, 236, 83, 251, 228, 248, 49, 51, 152, 18, 85, 255, 122, 251, 115, 187, 166, 226, 27, 191, 59, 40, 66, 182, 156, 249, 42, 255, 163, 150, 8, 153, 86, 64, 56, 76, 126, 111, 191, 5, 95, 19, 187, 210, 55, 175, 9, 144, 245, 243, 180, 253, 63, 55, 8, 140]));

const mintAuthority = payer;


async function createMintForToken(payer: Keypair, mintAuthority: Keypair) {
    const mint = await createMint(connection, payer, mintAuthority.publicKey, null, 0);
    return mint;
}

async function mintNewToken(mint: PublicKey, mintAuthority: Keypair, destination: PublicKey, amount: number) {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(connection, mintAuthority, mint, new PublicKey(destination));

    console.log('Token account created at', tokenAccount.address.toBase58());
    await mintTo(
        connection,
        payer,
        mint,
        tokenAccount.address,
        payer,
        amount
    )
    console.log('Minted', amount, 'tokens to', tokenAccount.address.toBase58());
}


async function main() {
    const mint = await createMintForToken(payer, mintAuthority);
    console.log(`Mint Address: ${mint.toString()}`);
    await mintNewToken(mint, mintAuthority, mintAuthority.publicKey, 1000);
}
main()