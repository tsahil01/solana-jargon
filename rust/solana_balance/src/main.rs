use std::str::FromStr;

use solana_client::{ client_error::ClientError, rpc_client::RpcClient};
use solana_sdk::pubkey::Pubkey;

fn check_bal(conn: &RpcClient, pubkey: &Pubkey) -> Result<u64, ClientError> {
    conn.get_balance(pubkey)

}

fn main() {
    let rpc_url = "https://api.devnet.solana.com";
    let conn = RpcClient::new(rpc_url);
    let pub_key = Pubkey::from_str("Ca46CufgJoeR2Et3fHCH7vwB51DGTTT4AYWVLAXZgDvo");
    let pk = match pub_key {
        Ok(key) => key,
        Err(err) => {
            println!("Error: {}", err);
            return;
        }
    };

    let bal = check_bal(&conn, &pk);
    match bal {
        Ok(bal) => println!("Balance {}", bal),
        Err(err) => {
            println!("Error: {}", err);
        }
    }

}