// Bridge Pattern Implementation
//
// The Bridge separates two independent hierarchies:
//
//   Attack (abstraction)          Weapon (implementation)
//          │                              │
//   MeleeAttack                        Sword
//   RangedAttack                       Bow
//                                      Fists
//
// Attack holds a reference to a Weapon — that reference IS the bridge.
// Both sides can grow independently without subclass explosion.


// --- IMPLEMENTATION SIDE ---
// Weapon defines the low-level "how it hits" behavior.

class Weapon {
    hit(targetName) {
        throw new Error("Weapon.hit must be implemented");
    }
}

class Sword extends Weapon {
    hit(targetName) {
        return `slashes ${targetName} with a steel sword`;
    }
}

class Bow extends Weapon {
    hit(targetName) {
        return `fires an arrow at ${targetName} from a distance`;
    }
}

class Fists extends Weapon {
    hit(targetName) {
        return `punches ${targetName} bare-handed`;
    }
}


// --- ABSTRACTION SIDE ---
// Attack defines the high-level "how the character engages".
// It delegates the low-level hit detail to the Weapon it holds.

class Attack {
    constructor(weapon) {
        this.weapon = weapon;   // <-- the bridge
    }

    execute(attackerName, targetName) {
        throw new Error("Attack.execute must be implemented");
    }
}

class MeleeAttack extends Attack {
    execute(attackerName, targetName) {
        return `${attackerName} charges forward and ${this.weapon.hit(targetName)}!`;
    }
}

class RangedAttack extends Attack {
    execute(attackerName, targetName) {
        return `${attackerName} keeps their distance and ${this.weapon.hit(targetName)}!`;
    }
}


module.exports = { Attack, MeleeAttack, RangedAttack, Weapon, Sword, Bow, Fists };
