// Abstract Factory Pattern Implementation

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
        return new MonitoredEncounter(new Dwarf("Jhonny the dwarf"));
    }
    createTroll() {
        return new Troll("Troll the Troll");
    }
}

// Concrete Factory 2: Relaxed world (player slept well)
class RelaxedNpcFactory extends NpcFactory {
    createDwarf() {
        return new MonitoredEncounter(new RelaxedEncounter(new Dwarf("Jhonny the dwarf")));
    }
    createTroll() {
        return new Troll("Troll the Troll");
    }
}

module.exports = { NpcFactory, NormalNpcFactory, RelaxedNpcFactory };
