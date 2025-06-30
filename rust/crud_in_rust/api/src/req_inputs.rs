use serde::{Deserialize, Serialize};


#[derive(Serialize, Deserialize)]
pub struct UserInput {
    pub name: String,
    pub age: String
}


#[derive(Serialize, Deserialize)]
pub struct NameInput {
    pub name: String,
}
