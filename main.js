import './lib/matter';
import { keyMap, keyMapper } from './lib/keyMap';
import Entity from './Entity';
import { tickCounter, ticks } from './lib/tickCounter';
import { global } from './lib/global';

function main() {

    const { Engine, Render, Runner, Composite, World } = Matter;

    // Create a running engine
    const engine = Engine.create({
        gravity: {
            x: 0,
            y: 1
        }
    });

    // Create a renderer
    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 640,
            wireframes: false``
        }
    });

    // Add the engine, and an empty list of 'bodies' to the world
    World.add(engine.world, []);

    // Start the renderer
    Render.run(render);
    const runner = Runner.create();

    // Ensure that the physics runs at a constant speed regardless of framerate
    runner.isFixed = false;

    Runner.run(runner, engine);

    // Define global variables:
    global.bodies = []; // List of physics 'bodies' in the world
    global.entities = []; // List of entities in the world
 

}
window.onload = main;