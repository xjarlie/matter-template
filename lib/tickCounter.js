import { global } from "./global.js";
import { main, stop } from '../main.js'
import { keyMap } from "./keyMap.js";
let ticks = 0;
let tps = 0;
let deltaT = 0;

let lastTickTime = 0;

// Everything inside this function runs every game tick
function tickCounter() {

    const entities = global.entities;
    for (const i in entities) {
        entities[i].tick();
    }

    if (keyMap['f'] === true) {
        stop()
        main()
    }

    const now = Date.now();
    deltaT = now - lastTickTime;
    const deltaTSeconds = deltaT / 1000;
    lastTickTime = now;
    tps = 1 / deltaTSeconds;

    ticks++;
}

export { tickCounter, ticks };