use chrono::{Local, Utc};

fn main() {
    let now = Utc::now();
    println!("now: {}", now);   
    
    let now2 = Local::now();
    println!("now: {}", now2);   

}