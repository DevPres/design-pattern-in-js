const { AggressiveBehavior, PeacefulBehavior } = require('./behavior');

class Character {
    constructor(name, characterBehavior) {
        this.name = name;
        this.characterBehavior = characterBehavior;
    }

    setBehavior(behavior) {
        this.characterBehavior = behavior;
    }

    encounter() {
        return this.characterBehavior.encounter(this.name);
    }
}

class Troll extends Character {
    constructor(name) {
        super(name, new AggressiveBehavior());
    }
}

class Dwarf extends Character {
    constructor(name) {
        super(name, new PeacefulBehavior());
    }
}

module.exports = {
    Character,
    Troll,
    Dwarf
};
