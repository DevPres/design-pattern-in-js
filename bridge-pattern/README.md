## Abstract Factory Pattern
This project is similar to the one in the `decorator-pattern` folder, but adds a demonstration of the **Abstract Factory Pattern**.

`factories.js` — creates families of related NPCs without the scenario knowing their concrete types.

```javascript
// Abstract Factory
class NpcFactory {
    createDwarf() { ... }
    createTroll() { ... }
}

// Normal world: plain monitored dwarf
class NormalNpcFactory extends NpcFactory {
    createDwarf() {
        return new MonitoredEncounter(new Dwarf("Jhonny the dwarf"));
    }
}

// Relaxed world: monitored + relaxed dwarf (player slept)
class RelaxedNpcFactory extends NpcFactory {
    createDwarf() {
        return new MonitoredEncounter(new RelaxedEncounter(new Dwarf("Jhonny the dwarf")));
    }
}
```

`ScenarioOutsideCell` receives a factory and calls `factory.createDwarf()` — it has no knowledge of which world variant it is running in. The caller decides:

```javascript
// Normal path
new ScenarioOutsideCell(new NormalNpcFactory())

// Relaxed path (after sleeping)
new ScenarioOutsideCell(new RelaxedNpcFactory())
```

This eliminated the duplicate `ScenarioOutsideCellRelaxed` class.

---

## Running the Demo

```bash
node index.js
```
