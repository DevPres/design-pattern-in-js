// Enclosure and Decorator Pattern Implementations

// --- TRANSPARENT ENCLOSURE ---
// Wraps a character and adds encounter logging around it.
// It does NOT touch the character's strategy or alter what encounter() returns.
// The enclosed character is completely unaware it is being wrapped.
class EncounterLogEnclosure {
    constructor(character) {
        this.wrappedCharacter = character;
        this.log = [];
    }

    // Same interface as Character — delegates 100% transparently
    encounter() {
        const result = this.wrappedCharacter.encounter();

        // Add surrounding structure (logging) without touching the result
        this.log.push({
            character: this.wrappedCharacter.name,
            timestamp: new Date().toISOString(),
            message: result
        });

        return result;
    }

    // Forwards name access directly to the wrapped character
    get name() {
        return this.wrappedCharacter.name;
    }

    set name(value) {
        this.wrappedCharacter.name = value;
    }

    // Extra capability added by the enclosure — not part of Character interface
    getEncounterLog() {
        return this.log;
    }
}

module.exports = {
    EncounterLogEnclosure,
};
