use serde::{Deserialize, Serialize};


#[derive(Serialize, Deserialize)]
pub struct UserOutput {
    pub name: String,
    pub age: String
}


#[derive(Serialize, Deserialize)]
pub struct NameOutput {
    pub name: String,
}
