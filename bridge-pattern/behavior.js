// Strategy Pattern Implementation

// Strategy Interface
class EncounterBehavior {
    // Each strategy must implement this method
    encounter(characterName) {
        throw new Error("EncounterBehavior.encounter method must be implemented");
    }
}

// Concrete Strategy: Aggressive Encounter
class AggressiveBehavior extends EncounterBehavior {
    encounter(characterName) {
        return `${characterName} lets out a fierce roar and swings their weapon menacingly! Prepare for battle!`;
    }
}

// Concrete Strategy: Peaceful Encounter
class PeacefulBehavior extends EncounterBehavior {
    encounter(characterName) {
        return `${characterName} greets you calmly and offers a friendly handshake.`;
    }
}

module.exports = {
    EncounterBehavior,
    AggressiveBehavior,
    PeacefulBehavior
};
