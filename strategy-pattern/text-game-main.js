
const { Troll, Dwarf } = require('./text-game-character');
const { AggressiveEncounter, PeacefulEncounter } = require('./text-game-strategy');
const { EncounterLogEnclosure } = require('./text-game-enclosure');
const { ScenarioInitial } = require('./scenarios');
const { Scene } = require('./scene');


class TextGame {
    constructor() {
        this.troll = new Troll("Grimm the Troll");
        this.dwarf = new Dwarf("Bronn the Dwarf");
        this.scene = new Scene(this)
        this.scene.setScenario(new ScenarioInitial());
    }

    runScene() {
        this.scene.run()
    }

    showNormalEncounters() {
        console.log("=== NORMAL ENCOUNTERS (Strategy Pattern) ===");
        console.log(this.troll.encounter()); // Aggressive by default
        console.log(this.dwarf.encounter()); // Peaceful by default
        console.log("");
    }

    showTransparentEnclosure() {
        console.log("=== TRANSPARENT ENCLOSURE (Logging) ===");

        const loggedTroll = new EncounterLogEnclosure(this.troll);
        const loggedDwarf = new EncounterLogEnclosure(this.dwarf);

        console.log(loggedTroll.encounter());
        console.log(loggedDwarf.encounter());

        console.log("--- Encounter log captured by the enclosure ---");
        loggedTroll.getEncounterLog().forEach(entry =>
            console.log(`[${entry.timestamp}] ${entry.character}: "${entry.message}"`)
        );
        loggedDwarf.getEncounterLog().forEach(entry =>
            console.log(`[${entry.timestamp}] ${entry.character}: "${entry.message}"`)
        );

        console.log(`\nloggedTroll.name === troll.name: ${loggedTroll.name === this.troll.name}`);
        console.log("");
    }


    showStrategyFlexibility() {
        console.log(this.troll.encounter()); // Aggressive

        this.troll.setEncounterStrategy(new PeacefulEncounter());
        console.log(this.troll.encounter()); // Now peaceful

        this.troll.setEncounterStrategy(new AggressiveEncounter());
        console.log(this.troll.encounter()); // Back to aggressive
        console.log("");
    }

    run() {
        this.runScene()
    }
}

module.exports = { TextGame };
