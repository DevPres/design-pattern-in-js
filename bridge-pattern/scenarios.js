const { AggressiveBehavior } = require("./behavior.js")
const { NormalNpcFactory, RelaxedNpcFactory } = require("./factories.js")


function generateQuestion(question, options) {
    let questionText = `${question}\n`
    for (let i = 0; i < options.length; i++) {
        questionText += `   ${i + 1}- ${options[i]}\n`
    }
    return questionText
}

class Scenario {
    scene;
    game;
    run() {
        console.error("Run function not implemented yet");
    }
    changeScenario(scenario) {
        this.scene.setScenario(scenario);
    }
}


class ScenarioInitial extends Scenario {
    run() {
        console.log(generateQuestion('You are in a basement inside a cell. The cell door is open. What do you want to do?', [
            'I leave the cell',
            'I go back sleep',
            'I scream from fear'
        ]))

        const self = this
        process.stdin.resume();

        process.stdin.once('data', function (key) {
            if (key === '\u0003') {
                process.exit();
            }

            if (key.indexOf('1') == 0) {
                self.scene.setScenario(new ScenarioOutsideCell(new NormalNpcFactory()));
                self.game.runScene();
            }

            if (key.indexOf('2') == 0) {
                self.scene.setScenario(new ScenarioSleep());
                self.game.runScene();
            }
            if (key.indexOf('3') == 0) {
                self.scene.setScenario(new ScenarioScream());
                self.game.runScene();
            }

        });
    }
}

// ScenarioOutsideCell now receives a factory instead of hardcoding NPC creation.
// This merges the old ScenarioOutsideCell and ScenarioOutsideCellRelaxed into one class.
class ScenarioOutsideCell extends Scenario {
    constructor(factory) {
        super();
        this.npc = factory.createDwarf();
    }
    run() {
        console.log(this.npc.encounter())

        console.log(generateQuestion('Jhonny offers to help you go outside', [
            'accept the help',
            'refuse rudely',
        ]))
        const self = this
        process.stdin.resume();
        process.stdin.once('data', function (key) {
            if (key === '\u0003') {
                process.exit();
            }

            if (key.indexOf('1') == 0) {
                self.scene.setScenario(new ScenarioTrollEncounter());
                self.game.runScene();
            }

            if (key.indexOf('2') == 0) {
                self.npc.setBehavior(new AggressiveBehavior())
                console.log("You died. You had no weapon, why refuse the help?")
                process.exit();
            }

        });
    }
}

class ScenarioSleep extends Scenario {

    run() {

        console.log(generateQuestion('You wake up again in a basement inside a cell. The cell door is open. What do you want to do?', [
            'I leave the cell',
            'I go back sleep again',
            'I scream from fear'
        ]))
        const self = this
        process.stdin.resume();
        process.stdin.once('data', function (key) {
            if (key === '\u0003') {
                process.exit();
            }

            // Passes RelaxedNpcFactory so the dwarf encounter is enhanced
            if (key.indexOf('1') == 0) {
                self.scene.setScenario(new ScenarioOutsideCell(new RelaxedNpcFactory()));
                self.game.runScene()
            }

            if (key.indexOf('2') == 0) {
                self.game.runScene();
            }

        });


    }
}

class ScenarioTrollEncounter extends Scenario {
    constructor() {
        super();
        this.npc = new NormalNpcFactory().createTroll();
    }

    run() {
        console.log("Jhonny indicates the way to the exit. After some steps you listen strange sounds")
        console.log(this.npc.encounter());
        console.log("Jhonny run away. You die. Never trust an helpful dwarf/")

        process.exit()

    }
}

class ScenarioScream extends Scenario {

    run() {
        console.log("You just die. Why you scream? Are you fool?")

        process.exit()

    }
}


module.exports = { ScenarioTrollEncounter, ScenarioScream, ScenarioOutsideCell, ScenarioInitial, ScenarioSleep, Scenario }
