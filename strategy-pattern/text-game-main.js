
const { ScenarioInitial } = require('./scenarios');
const { Scene } = require('./scene');


class TextGame {
    constructor() {
        this.scene = new Scene(this)
        this.scene.setScenario(new ScenarioInitial());
    }

    runScene() {
        this.scene.run()
    }

    run() {
        this.runScene()
    }
}

module.exports = { TextGame };
