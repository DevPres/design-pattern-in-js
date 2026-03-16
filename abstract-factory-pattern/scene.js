class Scene {
    constructor(game) {
        this.game = game;
        this.scenario = null;
    }

    setScenario(scenario) {
        this.scenario = scenario;
        this.scenario.scene = this;
        this.scenario.game = this.game;
    }

    run() {
        this.scenario.run();
    }
}

module.exports = { Scene }
