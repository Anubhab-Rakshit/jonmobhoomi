#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env, Symbol};

#[contract]
pub struct OwnershipNFTContract;

#[contractimpl]
impl OwnershipNFTContract {
    pub fn initialize(e: Env, admin: Address) {
        let admin_key = Symbol::new(&e, "admin");
        e.storage().instance().set(&admin_key, &admin);
    }

    pub fn mint(e: Env, land_id: Symbol, owner: Address) {
        let key = land_id;
        e.storage().instance().set(&key, &owner);
    }

    pub fn owner_of(e: Env, land_id: Symbol) -> Option<Address> {
        let key = land_id;
        e.storage().instance().get::<_, Address>(&key)
    }

    pub fn transfer(e: Env, land_id: Symbol, to: Address) {
        let key = land_id;
        e.storage().instance().set(&key, &to);
    }

    pub fn exists(e: Env, land_id: Symbol) -> bool {
        let key = land_id;
        e.storage().instance().get::<_, Address>(&key).is_some()
    }
}
