import {BigInt} from "@graphprotocol/graph-ts"
import {
    EthSale,
    AdminChanged,
    BeaconUpgraded,
    OwnershipTransferred,
    TokensPurchased,
    TokensSold,
    Upgraded
} from "../generated/EthSale/EthSale"
import {PurchaseEntity} from "../generated/schema"

export function handleAdminChanged(event: AdminChanged): void {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    let entity = PurchaseEntity.load(event.transaction.from.toHex())

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (!entity) {
        entity = new PurchaseEntity(event.transaction.from.toHex())

        // Entity fields can be set using simple assignments
    }

    // BigInt and BigDecimal math are supported

    // Entity fields can be set based on event parameters

    // Entities can be written to the store with `.save()`
    entity.save()

    // Note: If a handler doesn't require existing field values, it is faster
    // _not_ to load the entity from the store. Instead, create it fresh with
    // `new Entity(...)`, set the fields that should be updated and save the
    // entity back to the store. Fields that were not set or unset remain
    // unchanged, allowing for partial updates to be applied.

    // It is also possible to access smart contracts from mappings. For
    // example, the contract that has emitted the event can be connected to
    // with:
    //
    // let contract = Contract.bind(event.address)
    //
    // The following functions can then be called on this contract to access
    // state variables and other data:
    //
    // - contract.deadline(...)
    // - contract.factory(...)
    // - contract.getWallets(...)
    // - contract.name(...)
    // - contract.owner(...)
    // - contract.rate(...)
    // - contract.token(...)
    // - contract.totalReward(...)
}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
}

export function handleTokensPurchased(event: TokensPurchased): void {
    let entity = PurchaseEntity.load(event.transaction.from.toHex());

    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (!entity) {
        entity = new PurchaseEntity(event.transaction.from.toHex());
        entity.amount = event.params.amount;
        entity.account = event.params.account.toHex();
        entity.rate = event.params.rate;
        entity.reward = event.params.reward;
        entity.timestamp = event.block.timestamp;
        // Entity fields can be set using simple assignments
    }

    entity.save()
}

export function handleTokensSold(event: TokensSold): void {
}

export function handleUpgraded(event: Upgraded): void {
}
