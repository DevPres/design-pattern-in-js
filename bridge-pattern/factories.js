// Abstract Factory Pattern Implementation

const { MeleeAttack, Fists, Sword } = require('./attack-system');
const { PeacefulBehavior, AggressiveBehavior } = require('./behavior');
const { Dwarf, Troll } = require('./characters');
const { MonitoredEncounter, RelaxedEncounter } = require('./modifiers');

// Abstract Factory
class NpcFactory {
    createDwarf() {
        throw new Error("NpcFactory.createDwarf must be implemented");
    }
    createTroll() {
        throw new Error("NpcFactory.createTroll must be implemented");
    }
}

// Concrete Factory 1: Normal world (player did not sleep)
class NormalNpcFactory extends NpcFactory {
    createDwarf() {
        return new MonitoredEncounter(new Dwarf("Jhonny the dwarf", new PeacefulBehavior(), new MeleeAttack(new Sword())));
    }
    createTroll() {
        return new Troll("Troll the Troll", new AggressiveBehavior(), new MeleeAttack(new Fists()));
    }
}

// Concrete Factory 2: Relaxed world (player slept well)
class RelaxedNpcFactory extends NpcFactory {
    createDwarf() {
        return new MonitoredEncounter(new RelaxedEncounter(new Dwarf("Jhonny the dwarf", new PeacefulBehavior(), new MeleeAttack(new Sword()))));
    }
    createTroll() {
        return new Troll("Troll the Troll", new AggressiveBehavior(), new MeleeAttack(new Fists()));
    }
}

module.exports = { NpcFactory, NormalNpcFactory, RelaxedNpcFactory };
