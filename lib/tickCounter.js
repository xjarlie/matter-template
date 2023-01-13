import { global } from "./global.js";
let ticks = 0;

// Everything inside this function runs every game tick
function tickCounter() { 

    const entities = global.entities;
    for (const i in entities) {
        entities[i].tick();
    }

    ticks++;
}

export { tickCounter, ticks };