#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env, Symbol};

#[contract]
pub struct DisputeArbitrationContract;

#[contractimpl]
impl DisputeArbitrationContract {
    pub fn initialize(e: Env, admin: Address) {
        let admin_key = Symbol::new(&e, "admin");
        e.storage().instance().set(&admin_key, &admin);
    }

    pub fn open_dispute(e: Env, land_id: Symbol, claimant: Address, description: Symbol) {
        let key = land_id;
        let data = (claimant, description, Symbol::new(&e, "Pending"));
        e.storage().instance().set(&key, &data);
    }

    pub fn get_dispute(e: Env, land_id: Symbol) -> Option<(Address, Symbol, Symbol)> {
        let key = land_id;
        e.storage()
            .instance()
            .get::<_, (Address, Symbol, Symbol)>(&key)
    }

    pub fn resolve(e: Env, land_id: Symbol, ruling: Symbol) {
        let key = land_id;
        let data = e
            .storage()
            .instance()
            .get::<_, (Address, Symbol, Symbol)>(&key);
        if let Some((claimant, description, _)) = data {
            let new_data = (claimant, description, ruling);
            e.storage().instance().set(&key, &new_data);
        }
    }

    pub fn reject(e: Env, land_id: Symbol) {
        let key = land_id;
        let data = e
            .storage()
            .instance()
            .get::<_, (Address, Symbol, Symbol)>(&key);
        if let Some((claimant, description, _)) = data {
            let new_data = (claimant, description, Symbol::new(&e, "Rejected"));
            e.storage().instance().set(&key, &new_data);
        }
    }
}
