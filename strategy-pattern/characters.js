const { AggressiveEncounter, PeacefulEncounter } = require('./strategy');

class Character {
    constructor(name, encounterStrategy) {
        this.name = name;
        this.encounterStrategy = encounterStrategy;
    }

    setEncounterStrategy(strategy) {
        this.encounterStrategy = strategy;
    }

    encounter() {
        return this.encounterStrategy.encounter(this.name);
    }
}

class Troll extends Character {
    constructor(name) {
        super(name, new AggressiveEncounter());
    }
}

class Dwarf extends Character {
    constructor(name) {
        super(name, new PeacefulEncounter());
    }
}

module.exports = {
    Character,
    Troll,
    Dwarf
};
