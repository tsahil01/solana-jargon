import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

const devNetEndpoint = 'https://api.devnet.solana.com';

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
    // const secret = Uint8Array.from([209,5,253, ....])
    // const from = Keypair.fromSecretKey(secret);
    // const to = new PublicKey('Ca46CufgJoeR2Et3fHCH7vwB51DGTTT4AYWVLAXZgDvo');
    // const transferSol = await sendSol(from, to, 1);
    // console.log(transferSol)

}

main()