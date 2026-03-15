// --- TRANSPARENT ENCLOSURE ---
// Wraps a character and adds encounter logging around it.
// It does NOT touch the character's strategy or alter what encounter() returns.
// The enclosed character is completely unaware it is being wrapped.
class MonitoredEncounter {
    constructor(character) {
        this.wrappedCharacter = character;
        this.encouterTimes = 0
    }

    encounter() {
        this.encouterTimes += 1;
        console.log(`You encounted this NPC ${this.encouterTimes} ${this.encouterTimes > 1 ? 'times' : 'time'}`)
        let result = this.wrappedCharacter.encounter();

        return result;
    }

    setEncounterStrategy(strategy) {
        this.wrappedCharacter.setEncounterStrategy(strategy)
    }

}


module.exports = {
    MonitoredEncounter
};
