// --- TRANSPARENT ENCLOSURE ---
// Wraps a character and adds encounter logging around it.
// It does NOT touch the character's behavior or alter what encounter() returns.
// The enclosed character is completely unaware it is being wrapped.
class MonitoredEncounter {
    constructor(character) {
        this.wrappedCharacter = character;
        this.encounterTimes = 0
    }


    setBehavior(behavior) {
        this.wrappedCharacter.setBehavior(behavior);
    }

    setAttack(attack) {
        this.wrappedCharacter.setAttack(attack);
    }

    encounter() {
        this.encounterTimes += 1;
        console.log(`You encounted this NPC ${this.encounterTimes} ${this.encounterTimes > 1 ? 'times' : 'time'}`);
        let result = this.wrappedCharacter.encounter();

        return result;
    }
    executeAttack({ target }) {
        return this.wrappedCharacter.executeAttack({ target });
    }
}

class RelaxedEncounter {
    constructor(character) {
        this.wrappedCharacter = character;
    }

    setAttack(attack) {
        this.wrappedCharacter.setAttack(attack);
    }


    setBehavior(behavior) {
        this.wrappedCharacter.setBehavior(behavior);
    }

    encounter() {
        let result = this.wrappedCharacter.encounter();

        result += `\nYou slept well, so he looks you differently`;
        return result;
    }
    executeAttack({ target }) {
        return this.wrappedCharacter.executeAttack({ target });
    }

}


module.exports = {
    MonitoredEncounter,
    RelaxedEncounter
};
