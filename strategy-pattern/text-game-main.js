// Main game file demonstrating both patterns

const { Troll, Dwarf } = require('./text-game-character');
const { AggressiveEncounter, PeacefulEncounter } = require('./text-game-strategy');
const { EncounterLogEnclosure } = require('./text-game-enclosure');

class TextGame {
    constructor() {
        this.troll = new Troll("Grimm the Troll");
        this.dwarf = new Dwarf("Bronn the Dwarf");
    }

    // Strategy pattern: each character uses its own strategy
    showNormalEncounters() {
        console.log("=== NORMAL ENCOUNTERS (Strategy Pattern) ===");
        console.log(this.troll.encounter()); // Aggressive by default
        console.log(this.dwarf.encounter()); // Peaceful by default
        console.log("");
    }

    // Transparent Enclosure: wraps characters to add logging
    // The character's strategy is NOT touched — behavior is identical
    showTransparentEnclosure() {
        console.log("=== TRANSPARENT ENCLOSURE (Logging) ===");

        const loggedTroll = new EncounterLogEnclosure(this.troll);
        const loggedDwarf = new EncounterLogEnclosure(this.dwarf);

        // Call encounter through the enclosure — same result as calling directly
        console.log(loggedTroll.encounter()); // Still aggressive — strategy untouched
        console.log(loggedDwarf.encounter()); // Still peaceful — strategy untouched
        console.log("");

        // The enclosure added surrounding structure (a log) without changing anything
        console.log("--- Encounter log captured by the enclosure ---");
        loggedTroll.getEncounterLog().forEach(entry =>
            console.log(`[${entry.timestamp}] ${entry.character}: "${entry.message}"`)
        );
        loggedDwarf.getEncounterLog().forEach(entry =>
            console.log(`[${entry.timestamp}] ${entry.character}: "${entry.message}"`)
        );

        // Transparency check: name access is forwarded directly to the wrapped character
        console.log(`\nloggedTroll.name === troll.name: ${loggedTroll.name === this.troll.name}`);
        console.log("");
    }


    // Strategy flexibility: swap strategies at runtime on a live character
    showStrategyFlexibility() {
        console.log("=== STRATEGY FLEXIBILITY (Runtime Swap) ===");
        console.log(this.troll.encounter()); // Aggressive

        this.troll.setEncounterStrategy(new PeacefulEncounter());
        console.log(this.troll.encounter()); // Now peaceful

        this.troll.setEncounterStrategy(new AggressiveEncounter());
        console.log(this.troll.encounter()); // Back to aggressive
        console.log("");
    }

    run() {
        console.log("TEXT GAME: STRATEGY, TRANSPARENT ENCLOSURE & DECORATOR PATTERNS\n");
        this.showNormalEncounters();
        this.showTransparentEnclosure();
        this.showStrategyFlexibility();
        console.log("=== GAME COMPLETE ===");
    }
}

module.exports = { TextGame };
