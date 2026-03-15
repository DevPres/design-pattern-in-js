# Strategy Pattern with Transparent Enclosure

This project is similar to the **Strategy Pattern** implementation, but with an additional **Transparent Enclosure**  to monitor encounters with NPCs.

## Overview

The core functionality remains the same: characters can have different encounter strategies (Aggressive or Peaceful) that define how they interact with the player. However, this version adds a monitoring layer that tracks how many times we encounter specific NPCs without altering their behavior.

## Transparent Enclosure: MonitoredEncounter

The `MonitoredEncounter` class (in `modifiers.js`) wraps a character and adds encounter logging around it. Key characteristics:

- **Transparent**: The enclosed character is completely unaware it is being wrapped
- **Non-invasive**: It does NOT touch the character's strategy or alter what `encounter()` returns
- **Monitoring**: It tracks and logs how many times the NPC has been encountered

### How It Works

```javascript
const dwarf = new Dwarf("Jhonny the dwarf");
const monitoredDwarf = new MonitoredEncounter(dwarf);

// Every call to encounter() logs the encounter count
monitoredDwarf.encounter(); // "You encountered this NPC 1 time"
monitoredDwarf.encounter(); // "You encountered this NPC 2 times"
```

The `MonitoredEncounter` also proxies method calls to the wrapped character, so you can still call `setEncounterStrategy()` on it:

```javascript
monitoredDwarf.setEncounterStrategy(new AggressiveEncounter());
```

## Checking Modifiers

To check the encounter count for a monitored NPC, access the internal counter directly:

```javascript
// Access the wrapped character to get encounter count
const wrapped = monitoredDwarf.wrappedCharacter;
console.log(wrapped.encouterTimes); // Note: typo in original code ("encouterTimes" instead of "encounterTimes")
```


## Running the Project

```bash
node index.js
```

