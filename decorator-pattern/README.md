# Decorator Pattern Demo

This project is similar to the one in the `transparent-enclosure` folder, but adds a demonstration of the **Decorator Pattern**.


## RelaxedEncounter (Decorator Pattern)

The `RelaxedEncounter` class demonstrates the **Decorator Pattern**. It wraps a character and **modifies** the behavior by adding extra content to the result.

```javascript
class RelaxedEncounter {
    encounter() {
        let result = this.wrappedCharacter.encounter();
        result += `\nYou slept well, so he looks at you differently`
        return result;
    }
}
```

Key characteristics:
- Dynamically adds responsibilities to an object
- Modifies the return value of the wrapped method
- Allows behavior extension without subclassing

## Key Differences

| Aspect | Transparent Enclosure (MonitoredEncounter) | Decorator (RelaxedEncounter) |
|--------|-------------------------------------------|------------------------------|
| Purpose | Monitoring/logging without changing behavior | Modifying/enhancing behavior |
| Return value | Unchanged | Modified with additional content |
| Wrapped object awareness | Unaware | Unaware |
| Use case | Cross-cutting concerns | Behavioral modification |

## Running the Demo

```bash
node main.js
```
