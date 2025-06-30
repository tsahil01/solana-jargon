use poem::{
    get, handler, listener::TcpListener, post, web::{Json, Path}, Route, Server
};

use crate::{req_inputs::UserInput, req_output::{NameOutput, UserOutput}};

pub mod req_inputs;
pub mod req_output;

#[handler]
fn hello(Path(name): Path<String>) -> Json<NameOutput> {
    let user = NameOutput {
        name
    };
    Json(user)
}

#[handler]
fn home() -> String {
    format!("Hello World!")
}

#[handler]
fn send_new_wallet(Json(data): Json<UserInput>) -> Json<UserOutput>{
    let name = data.name;
    let age = data.age;
    let res = UserOutput {
        name,
        age
    };
    Json(res)



}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    let app = Route::new()
    .at("/hello/:name", get(hello))
    .at("/", get(hello))
    .at("/newWallet", post(send_new_wallet));


    Server::new(TcpListener::bind("0.0.0.0:3000"))
        .name("hello-world")
        .run(app)
        .await
}