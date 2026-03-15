// Strategy Pattern Implementation

// Strategy Interface
class EncounterStrategy {
    // Each strategy must implement this method
    encounter(characterName) {
        throw new Error("EncounterStrategy.encounter method must be implemented");
    }
}

// Concrete Strategy: Aggressive Encounter
class AggressiveEncounter extends EncounterStrategy {
    encounter(characterName) {
        return `${characterName} lets out a fierce roar and swings their weapon menacingly! Prepare for battle!`;
    }
}

// Concrete Strategy: Peaceful Encounter
class PeacefulEncounter extends EncounterStrategy {
    encounter(characterName) {
        return `${characterName} greets you calmly and offers a friendly handshake.`;
    }
}

module.exports = {
    EncounterStrategy,
    AggressiveEncounter,
    PeacefulEncounter
};
