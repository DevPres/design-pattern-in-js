# Strategy Pattern - Text Adventure Game

A text-based adventure game built in JavaScript that demonstrates the **Strategy design pattern** in two distinct ways.

## Project Structure

```
index.js                  - Entry point
text-game-main.js         - TextGame bootstrap class
scene.js                  - Scene (context for Scenario strategies)
scenarios.js              - Scenario base class + 5 concrete scenarios
text-game-strategy.js     - EncounterStrategy interface + concrete strategies
text-game-character.js    - Character (context for Encounter strategies)
text-game-enclosure.js    - EncounterLogEnclosure (Decorator pattern bonus)
```

## Where the Strategy Pattern Is Used

### 1. Encounter Strategy (explicit, textbook Strategy pattern)

**Files:** `text-game-strategy.js`, `text-game-character.js`

This is the classic Strategy pattern applied to how characters behave during encounters.

| Role | Class | Location |
|------|-------|----------|
| Strategy interface | `EncounterStrategy` | `text-game-strategy.js:1` |
| Concrete strategy | `AggressiveEncounter` | `text-game-strategy.js:7` |
| Concrete strategy | `PeacefulEncounter` | `text-game-strategy.js:13` |
| Context | `Character` | `text-game-character.js:3` |

**How it works:**

- `EncounterStrategy` defines the contract: an `encounter(characterName)` method that must be implemented by subclasses. Calling it directly throws an error, acting as an abstract interface.
- `AggressiveEncounter` implements the strategy with a hostile message.
- `PeacefulEncounter` implements the strategy with a friendly message.
- `Character` is the **context** class. It holds a reference to an `encounterStrategy` and delegates its `encounter()` call to it. It also exposes `setEncounterStrategy(strategy)` to allow swapping the strategy at runtime.
- `Troll` and `Dwarf` are `Character` subclasses that set a default strategy in their constructors (`AggressiveEncounter` and `PeacefulEncounter`, respectively).

**Runtime strategy swap** happens in `scenarios.js:84`:

```js
self.npc.setEncounterStrategy(new AggressiveEncounter())
```

When the player refuses the Dwarf's help, the Dwarf's behavior changes from peaceful to aggressive on the fly. This runtime interchangeability is the defining characteristic of the Strategy pattern.

---

### 2. Scenario Strategy (structural Strategy pattern)

**Files:** `scenarios.js`, `scene.js`

The game's scene system follows the same Strategy structure to swap game scenarios at runtime.

| Role | Class | Location |
|------|-------|----------|
| Strategy interface | `Scenario` | `scenarios.js:13` |
| Concrete strategy | `ScenarioInitial` | `scenarios.js:25` |
| Concrete strategy | `ScenarioOutsideCell` | `scenarios.js:59` |
| Concrete strategy | `ScenarioSleep` | `scenarios.js:95` |
| Concrete strategy | `ScenarioTrollEncounter` | `scenarios.js:126` |
| Concrete strategy | `ScenarioScream` | `scenarios.js:142` |
| Context | `Scene` | `scene.js:1` |

**How it works:**

- `Scenario` is the base class with a `run()` method that concrete scenarios override to define different game logic (presenting choices, handling input, transitioning to other scenarios).
- `Scene` is the **context** class. It holds a reference to the current `scenario`, exposes `setScenario(scenario)` to swap it at runtime, and delegates its `run()` call to `this.scenario.run()`.
- Throughout gameplay, scenarios swap themselves by calling `self.scene.setScenario(new SomeOtherScenario())` followed by `self.game.runScene()`, dynamically changing the behavior of the scene.

For example, in `ScenarioInitial.run()` (`scenarios.js:41-53`):

```js
if (key.indexOf('1') == 0) {
    self.scene.setScenario(new ScenarioOutsideCell());
    self.game.runScene();
}
```

The player's choice determines which scenario strategy is loaded into the scene context, changing the game's behavior entirely at runtime.

---

### Summary Diagram

```
          ENCOUNTER STRATEGY                    SCENARIO STRATEGY
          ==================                    =================

  EncounterStrategy (interface)           Scenario (interface)
  + encounter(name)                       + run()
        ^         ^                         ^  ^  ^  ^  ^
        |         |                         |  |  |  |  |
  Aggressive  Peaceful               Initial  OutsideCell  Sleep
  Encounter   Encounter              TrollEncounter  Scream

  Context: Character                  Context: Scene
  - encounterStrategy                 - scenario
  - setEncounterStrategy()            - setScenario()
  - encounter() --> delegates         - run() --> delegates
```

Both instances follow the canonical Strategy pattern: an interface defines the algorithm, concrete classes implement variants, and a context holds a reference to the current strategy and delegates to it -- with the ability to swap strategies at runtime.

## Running the Game

```bash
node index.js
```
