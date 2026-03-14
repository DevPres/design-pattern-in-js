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
        this.game
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
        // on any data into stdin
        process.stdin.once('data', function (key) {
            // ctrl-c ( end of text )
            if (key === '\u0003') {
                process.exit();
            }

            // without rawmode, it returns EOL with the string
            if (key.indexOf('1') == 0) {
                console.log("press 1");
            }

            if (key.indexOf('2') == 0) {
                self.scene.setScenario(new ScenarioSleep());
                self.game.runScene();
            }

            // write the key to stdout all normal like
            // process.stdout.write( key );
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
        // on any data into stdin
        process.stdin.once('data', function (key) {
            // ctrl-c ( end of text )
            if (key === '\u0003') {
                process.exit();
            }

            // without rawmode, it returns EOL with the string
            if (key.indexOf('1') == 0) {
                console.log("press 1");
            }

            if (key.indexOf('2') == 0) {
                self.game.runScene();
            }

            // write the key to stdout all normal like
            // process.stdout.write( key );
        });


    }
}


module.exports = { ScenarioInitial, ScenarioSleep, Scenario }
