#![no_std]

use soroban_sdk::{contract, contractimpl, Address, BytesN, Env, Symbol, Vec};

#[contract]
pub struct BoundaryHashContract;

#[contractimpl]
impl BoundaryHashContract {
    pub fn initialize(e: Env, admin: Address) {
        let admin_key = Symbol::new(&e, "admin");
        e.storage().instance().set(&admin_key, &admin);
    }

    pub fn register_boundary(e: Env, land_id: Symbol, boundary_hash: BytesN<32>) {
        let key = land_id;
        e.storage().instance().set(&key, &boundary_hash);
    }

    pub fn get_boundary(e: Env, land_id: Symbol) -> Option<BytesN<32>> {
        let key = land_id;
        e.storage().instance().get::<_, BytesN<32>>(&key)
    }

    pub fn verify_boundary(e: Env, land_id: Symbol, boundary_hash: BytesN<32>) -> bool {
        let key = land_id;
        e.storage()
            .instance()
            .get::<_, BytesN<32>>(&key)
            .map(|h| h == boundary_hash)
            .unwrap_or(false)
    }
}
