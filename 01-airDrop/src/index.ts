import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

const devNetEndpoint = 'https://api.devnet.solana.com';

export async function airDrop(address: PublicKey, amt: number) {
    try {
        const conn = new Connection(devNetEndpoint, 'confirmed');
        const signature = await conn.requestAirdrop(address, amt * LAMPORTS_PER_SOL);
        const tnx = await conn.confirmTransaction(signature);
        return tnx;
    } catch (err) {
        console.log(err);
    }
}


async function main() {
    const wallet = new PublicKey('5CfQxQ43M7gFcv6gvnhpi5WsLSvUF4KVWqgM3h3Tayu3');

    // const airDropSol = await airDrop(wallet, 2);
    // console.log(airDropSol)
}

main()