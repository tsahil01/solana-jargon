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

export async function showBalance(address: PublicKey) {
    try {
        const conn = new Connection(devNetEndpoint, 'confirmed');
        const accInfo = await conn.getAccountInfo(address);
        return (accInfo?.lamports!) / LAMPORTS_PER_SOL;
    } catch (err) {
        console.log('Err: ', err);
    }
}

export async function sendSol(from: Keypair, to: PublicKey, amt: number) {
    try {
        const conn = new Connection(devNetEndpoint, "confirmed");
        const senderUser = await conn.getAccountInfo(from.publicKey);
        if ((senderUser?.lamports!) < (amt * LAMPORTS_PER_SOL)) {
            throw Error(`Tere bank main paisa nahi hai. Garib!`)
        }
        const tnxs = new Transaction();

        const instruction = SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: to,
            lamports: (amt * LAMPORTS_PER_SOL)
        });

        tnxs.add(instruction);

        const res = await sendAndConfirmTransaction(conn, tnxs, [from]);
        console.log(res);
    } catch (e) {
        console.log("Error", e);
    }

}

async function main() {
    const wallet = new PublicKey('5CfQxQ43M7gFcv6gvnhpi5WsLSvUF4KVWqgM3h3Tayu3');

    // const airDropSol = await airDrop(wallet, 2);
    // console.log(airDropSol)

    // const balance = await showBalance(wallet);
    // console.log(balance)

    // const secret = Uint8Array.from([209,5,253, ....])
    // const from = Keypair.fromSecretKey(secret);
    // const to = new PublicKey('Ca46CufgJoeR2Et3fHCH7vwB51DGTTT4AYWVLAXZgDvo');
    // const transferSol = await sendSol(from, to, 1);
    // console.log(transferSol)

}

main()