#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env, Symbol};

#[contract]
pub struct AccessControlContract;

#[contractimpl]
impl AccessControlContract {
    pub fn initialize(e: Env, admin: Address) {
        let admin_key = Symbol::new(&e, "admin");
        e.storage().instance().set(&admin_key, &admin);
    }

    pub fn set_role(e: Env, address: Address, role: Symbol) {
        let key = address;
        e.storage().instance().set(&key, &role);
    }

    pub fn get_role(e: Env, address: Address) -> Option<Symbol> {
        let key = address;
        e.storage().instance().get::<_, Symbol>(&key)
    }

    pub fn check_admin(e: Env, address: Address) -> bool {
        let admin_key = Symbol::new(&e, "admin");
        e.storage()
            .instance()
            .get::<_, Address>(&admin_key)
            .map(|admin| address == admin)
            .unwrap_or(false)
    }
}
