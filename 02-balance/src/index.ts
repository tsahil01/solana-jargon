import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

const devNetEndpoint = 'https://api.devnet.solana.com';

export async function showBalance(address: PublicKey) {
    try {
        const conn = new Connection(devNetEndpoint, 'confirmed');
        const accInfo = await conn.getAccountInfo(address);
        return (accInfo?.lamports!) / LAMPORTS_PER_SOL;
    } catch (err) {
        console.log('Err: ', err);
    }
}


async function main() {
    const wallet = new PublicKey('5CfQxQ43M7gFcv6gvnhpi5WsLSvUF4KVWqgM3h3Tayu3');

    // const balance = await showBalance(wallet);
    // console.log(balance)
}

main()