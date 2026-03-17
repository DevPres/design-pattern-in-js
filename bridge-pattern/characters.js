const { MeleeAttack, Fists } = require('./attack-system');
const { AggressiveBehavior, PeacefulBehavior } = require('./behavior');

class Character {
    constructor(name, behavior, attack) {
        this.name = name;
        this.behavior = behavior;
        this.attack = attack
    }

    setBehavior(behavior) {
        this.behavior = behavior;
    }

    setAttack(attack) {
        this.attack = attack;
    }

    executeAttack({ target }) {
        return this.attack.execute(this.name, target)
    }

    encounter() {
        return this.behavior.encounter(this.name);
    }
}

class Troll extends Character {
    constructor(name, behavior, attack) {
        super(name, behavior, attack)
    }
}

class Dwarf extends Character {
    constructor(name, behavior, attack) {
        super(name, behavior, attack);
    }
}

module.exports = {
    Character,
    Troll,
    Dwarf
};
