#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env, Symbol};

#[contract]
pub struct RWAMicroSharePoolContract;

#[contractimpl]
impl RWAMicroSharePoolContract {
    pub fn initialize(e: Env, admin: Address) {
        let admin_key = Symbol::new(&e, "admin");
        e.storage().instance().set(&admin_key, &admin);
    }

    pub fn create_pool(e: Env, land_id: Symbol, total_shares: u64, price: i128) {
        let key = land_id;
        let data = (total_shares, total_shares, price, Symbol::new(&e, "Active"));
        e.storage().instance().set(&key, &data);
    }

    pub fn get_pool(e: Env, land_id: Symbol) -> Option<(u64, u64, i128, Symbol)> {
        let key = land_id;
        e.storage()
            .instance()
            .get::<_, (u64, u64, i128, Symbol)>(&key)
    }

    pub fn invest(e: Env, land_id: Symbol, investor: Address, shares: u64) {
        let key = land_id.clone();
        let data = e
            .storage()
            .instance()
            .get::<_, (u64, u64, i128, Symbol)>(&key);
        if let Some((total, available, price, status)) = data {
            let new_available = available - shares;
            let new_data = (total, new_available, price, status);
            e.storage().instance().set(&key, &new_data);

            let investor_key = (land_id, investor);
            let investor_data = shares;
            e.storage().instance().set(&investor_key, &investor_data);
        }
    }

    pub fn get_shares(e: Env, land_id: Symbol, investor: Address) -> Option<u64> {
        let key = (land_id, investor);
        e.storage().instance().get::<_, u64>(&key)
    }
}
