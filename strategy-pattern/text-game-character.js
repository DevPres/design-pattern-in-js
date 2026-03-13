// Imports must come first — classes are not hoisted like functions
const { AggressiveEncounter, PeacefulEncounter } = require('./text-game-strategy');

// Base Character class (interface-like)
class Character {
  constructor(name, encounterStrategy) {
    this.name = name;
    this.encounterStrategy = encounterStrategy;
  }

  // Method to change the encounter strategy at runtime
  setEncounterStrategy(strategy) {
    this.encounterStrategy = strategy;
  }

  // Method to perform an encounter using the current strategy
  encounter() {
    return this.encounterStrategy.encounter(this.name);
  }
}

// Concrete Troll class
class Troll extends Character {
  constructor(name) {
    // By default, Trolls are aggressive
    super(name, new AggressiveEncounter());
  }
}

// Concrete Dwarf class
class Dwarf extends Character {
  constructor(name) {
    // By default, Dwarves are peaceful
    super(name, new PeacefulEncounter());
  }
}

// Re-export for use in other files
module.exports = {
  Character,
  Troll,
  Dwarf
};