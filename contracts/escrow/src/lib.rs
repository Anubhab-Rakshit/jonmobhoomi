#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env, Symbol};

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    pub fn initialize(e: Env, admin: Address) {
        let admin_key = Symbol::new(&e, "admin");
        e.storage().instance().set(&admin_key, &admin);
    }

    pub fn create(e: Env, land_id: Symbol, seller: Address, buyer: Address, amount: i128) {
        let key = land_id;
        let data = (seller, buyer, amount, Symbol::new(&e, "Pending"));
        e.storage().instance().set(&key, &data);
    }

    pub fn get_status(e: Env, land_id: Symbol) -> Option<Symbol> {
        let key = land_id;
        e.storage()
            .instance()
            .get::<_, (Address, Address, i128, Symbol)>(&key)
            .map(|(_, _, _, s)| s)
    }

    pub fn fund(e: Env, land_id: Symbol) {
        let key = land_id;
        let data = e
            .storage()
            .instance()
            .get::<_, (Address, Address, i128, Symbol)>(&key);
        if let Some((seller, buyer, amount, _)) = data {
            let new_data = (seller, buyer, amount, Symbol::new(&e, "Funded"));
            e.storage().instance().set(&key, &new_data);
        }
    }

    pub fn release(e: Env, land_id: Symbol) {
        let key = land_id;
        let data = e
            .storage()
            .instance()
            .get::<_, (Address, Address, i128, Symbol)>(&key);
        if let Some((seller, buyer, amount, _)) = data {
            let new_data = (seller, buyer, amount, Symbol::new(&e, "Released"));
            e.storage().instance().set(&key, &new_data);
        }
    }

    pub fn cancel(e: Env, land_id: Symbol) {
        let key = land_id;
        e.storage().instance().remove::<Symbol>(&key);
    }
}
