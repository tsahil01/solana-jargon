use std::{fmt::Error, str::FromStr};

use solana_client::rpc_client::RpcClient;
use solana_sdk::{instruction::Instruction, native_token::LAMPORTS_PER_SOL, pubkey::Pubkey, signature::Keypair, signer::Signer, system_instruction, system_program, sysvar::recent_blockhashes, transaction::Transaction};

fn send_sol(conn: &RpcClient, from:& Keypair, to_pub_key: &Pubkey, amt: &u64) -> Result<String, Error> {
    let amt_to_send = amt * LAMPORTS_PER_SOL;
    let from_balance = conn.get_balance(&from.pubkey())?;

    if from_balance < amt_to_send {
        return Err("Tere pas paisa nahi hai. Garib.");
    }

    let instruction = system_instruction::transfer(&from.pubkey(), to_pub_key, amt_to_send);
    let recent_blockhashe = conn.get_latest_blockhash()?;

    let tnx = Transaction::new_signed_with_payer(&[instruction], Some(&from.pubkey()), &[from], recent_blockhashe);

    let sign = conn.send_and_confirm_transaction(&tnx);
    Ok(sign);

}

fn main() {
    let rpc_url = "https://api.devnet.solana.com";
    let conn = RpcClient::new(rpc_url);
    let secret: [u8; 64] = [
        209, 5, 253, 94, 121, 46, 205, 168, 222, 88, 240, 131, 73, 248, 39, 159, 86, 54, 2, 62,
        167, 68, 49, 3, 37, 208, 193, 249, 24, 255, 178, 112, 62, 107, 146, 2, 29, 251, 217, 223,
        0, 242, 80, 67, 24, 18, 98, 36, 48, 149, 209, 205, 233, 114, 167, 255, 188, 154, 130, 180,
        100, 151, 170, 178,
    ];

    let from_key_pair = match Keypair::from_bytes(&secret) {
        Ok(key) => key,
        Err(err) => {
            println!("Invalid pvt Key {}", err);
            return;
        }
    };

    let to_pubkey = match Pubkey::from_str("Ca46CufgJoeR2Et3fHCH7vwB51DGTTT4AYWVLAXZgDvo") {
        Ok(key) => key,
        Err(err) => {
            println!("Invalid to public Key {}", err);
            return;
        }
    };

    let amt = 1;

}

// import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";

// const devNetEndpoint = 'https://api.devnet.solana.com';

// export async function sendSol(from: Keypair, to: PublicKey, amt: number) {
//     try {
//         const conn = new Connection(devNetEndpoint, "confirmed");
//         const senderUser = await conn.getAccountInfo(from.publicKey);
//         if ((senderUser?.lamports!) < (amt * LAMPORTS_PER_SOL)) {
//             throw Error(`Tere bank main paisa nahi hai. Garib!`)
//         }
//         const tnxs = new Transaction();

//         const instruction = SystemProgram.transfer({
//             fromPubkey: from.publicKey,
//             toPubkey: to,
//             lamports: (amt * LAMPORTS_PER_SOL)
//         });

//         tnxs.add(instruction);

//         const res = await sendAndConfirmTransaction(conn, tnxs, [from]);
//         console.log(res);
//     } catch (e) {
//         console.log("Error", e);
//     }

// }

// async function main() {
//     // const secret = Uint8Array.from([209,5,253, ....])
//     // const from = Keypair.fromSecretKey(secret);
//     // const to = new PublicKey('Ca46CufgJoeR2Et3fHCH7vwB51DGTTT4AYWVLAXZgDvo');
//     // const transferSol = await sendSol(from, to, 1);
//     // console.log(transferSol)

// }

// main()
