// --- TRANSPARENT ENCLOSURE ---
// Wraps a character and adds encounter logging around it.
// It does NOT touch the character's strategy or alter what encounter() returns.
// The enclosed character is completely unaware it is being wrapped.
class EncounterLogEnclosure {
    constructor(character) {
        this.wrappedCharacter = character;
        this.log = [];
    }

    encounter() {
        const result = this.wrappedCharacter.encounter();

        this.log.push({
            character: this.wrappedCharacter.name,
            timestamp: new Date().toISOString(),
            message: result
        });

        return result;
    }

    get name() {
        return this.wrappedCharacter.name;
    }

    set name(value) {
        this.wrappedCharacter.name = value;
    }

    getEncounterLog() {
        return this.log;
    }
}

module.exports = {
    EncounterLogEnclosure,
};
