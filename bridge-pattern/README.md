# Text Adventure Game - Design Patterns Demo

A text-based adventure game written in Node.js that demonstrates several
design patterns, with a focus on the **Bridge pattern**.

## How to Run

```
node index.js
```

No dependencies required. Requires Node.js.

## Bridge Pattern

### The Problem

When you have two independent dimensions of variation — in this case, *how* a
character attacks (melee vs ranged) and *what weapon* they use (sword, bow,
fists) — a naive inheritance approach would require a subclass for every
combination: `MeleeSwordAttack`, `MeleeBowAttack`, `RangedSwordAttack`, etc.
Adding a new weapon or attack type would multiply the number of classes.

### The Solution

The Bridge pattern separates these two hierarchies so they can vary
independently, connected by a composition reference (the "bridge").

In `attack-system.js`, two hierarchies exist side by side:

**Implementation side (Weapon):**

```
Weapon (base)
  ├── Sword
  ├── Bow
  └── Fists
```

**Abstraction side (Attack):**

```
Attack (base, holds a Weapon reference)
  ├── MeleeAttack
  └── RangedAttack
```

The bridge is the `this.weapon` reference inside `Attack`:

```js
class Attack {
    constructor(weapon) {
        this.weapon = weapon;  // <-- the bridge
    }
}

class MeleeAttack extends Attack {
    execute(attackerName, targetName) {
        return `${attackerName} charges forward and ${this.weapon.hit(targetName)}!`;
    }
}
```

Any `Attack` subclass delegates the weapon-specific behavior to the `Weapon`
object it holds. This means:

- `new MeleeAttack(new Sword())` — melee attack with a sword
- `new MeleeAttack(new Fists())` — melee attack bare-handed
- `new RangedAttack(new Bow())` — ranged attack with a bow

Adding a new weapon (e.g., `Axe`) requires only one new class, not one per
attack type. Adding a new attack style (e.g., `StealthAttack`) similarly
requires only one new class.

### How Characters Use It

Characters compose an `Attack` object, which in turn holds a `Weapon`:

```js
// In characters.js
class Character {
    constructor(name, behavior, attack) {
        this.attack = attack;
    }
    executeAttack({ target }) {
        return this.attack.execute(this.name, target);
    }
}

// In factories.js — creating a dwarf with MeleeAttack + Sword
new Dwarf("Jhonny the dwarf", new PeacefulBehavior(), new MeleeAttack(new Sword()))
```

The character doesn't know which weapon or attack style it has — it just
calls `this.attack.execute()`, and the Bridge handles the rest.
