class Scenario {
    scene;
}


class ScenarioInitial extends Scenario {
    run() {
        console.log("You are in a basement inside a cell. The cell door is open. What do you want to do? \n",
            "    1 - I leave the cell  \n",
            "    2 - I go back to slee \n",
            "    3 - I scream from fear\n"
        );

        process.stdin.resume();
    }
}


module.exports = { ScenarioInitial, Scenario }
