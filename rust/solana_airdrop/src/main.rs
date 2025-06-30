use solana_client::{client_error::ClientError, rpc_client::RpcClient};
use solana_sdk::{
    native_token::LAMPORTS_PER_SOL,
    pubkey::Pubkey,
    signature::{Keypair, Signature},
    signer::Signer,
};

fn air_drop_sol(conn: RpcClient, pubkey: Pubkey, amt: u64) -> Result<Signature, ClientError> {
    let amt_in_lamports = LAMPORTS_PER_SOL * amt;
    conn.request_airdrop(&pubkey, amt_in_lamports)
}

fn main() {
    let rpc_url = String::from("https://api.devnet.solana.com/");
    let conn = RpcClient::new(rpc_url);

    let key_pair = Keypair::new();
    let pub_key = key_pair.pubkey();
    let amt = 1;

    let air_drop = air_drop_sol(conn, pub_key, amt);
    match air_drop {
        Ok(signature) => println!("Sign: {}", signature),
        Err(err) => println!("Error: {}", err),
    }
}
