#![no_std]

use soroban_sdk::{contract, contractimpl, Address, BytesN, Env, Symbol};

#[contract]
pub struct LandRegistryContract;

#[contractimpl]
impl LandRegistryContract {
    pub fn initialize(e: Env, admin: Address) {
        let admin_key = Symbol::new(&e, "admin");
        e.storage().instance().set(&admin_key, &admin);
    }

    pub fn register_land(e: Env, land_id: Symbol, owner: Address, boundary_hash: BytesN<32>) {
        let key = land_id;
        let data = (owner, boundary_hash);
        e.storage().instance().set(&key, &data);
    }

    pub fn get_owner(e: Env, land_id: Symbol) -> Option<Address> {
        let key = land_id;
        e.storage()
            .instance()
            .get::<_, (Address, BytesN<32>)>(&key)
            .map(|(o, _)| o)
    }

    pub fn get_boundary(e: Env, land_id: Symbol) -> Option<BytesN<32>> {
        let key = land_id;
        e.storage()
            .instance()
            .get::<_, (Address, BytesN<32>)>(&key)
            .map(|(_, h)| h)
    }

    pub fn transfer_land(e: Env, land_id: Symbol, new_owner: Address) {
        let key = land_id;
        let boundary_hash = e
            .storage()
            .instance()
            .get::<_, (Address, BytesN<32>)>(&key)
            .map(|(_, h)| h);
        if let Some(h) = boundary_hash {
            let data = (new_owner, h);
            e.storage().instance().set(&key, &data);
        }
    }

    pub fn verify_ownership(e: Env, land_id: Symbol, address: Address) -> bool {
        let key = land_id;
        e.storage()
            .instance()
            .get::<_, (Address, BytesN<32>)>(&key)
            .map(|(o, _)| o == address)
            .unwrap_or(false)
    }
}
