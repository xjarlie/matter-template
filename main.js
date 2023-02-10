import './lib/matter.js';
import { keyMapper } from './lib/keyMap.js';
import { tickCounter } from './lib/tickCounter.js';
import { global } from './lib/global.js';
import Character from './Character.js';
import Platform from './Platform.js';
import Alf from './Alf.js';
import MovingPlatform from './MovingPlatform.js';
import PassiveEnemy from './PassiveEnemy.js';

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
            width: 1000,
            height: 700,
            wireframes: false,
            background: 'black'
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
    global.world = engine.world;
    global.engine = engine;
    global.render = render;
    global.runner = runner;

    // Set function to run every game tick
    Matter.Events.on(runner, 'tick', tickCounter);

    // Check for keypresses and store them
    window.addEventListener('keydown', e => keyMapper(e))
    window.addEventListener('keyup', e => keyMapper(e))

    // Add entities here
    const player = new Character(50, 50, 50, 50);

    const ground = new Platform(100, 600, 400, 30);
    ground.add();

    const enemy1 = new PassiveEnemy(600, 400)
    enemy1.add();

    const platform1 = new Platform(500, 500, 300, 30);
    platform1.body.render.fillStyle = '#ff00f0';
    platform1.add();

    const mouseConstraint = Matter.MouseConstraint.create(engine);
    Matter.Events.on(mouseConstraint, "mousedown", function() {
        console.log(mouseConstraint.constraint.pointA)
    });

    // const trickPlatform = new Platform(600, 200, 200, 20);
    // trickPlatform.group = 'trick';

    // trickPlatform.tick = function() {
    //     if (trickPlatform.body.position.x < 400) {
    //         Matter.Body.setVelocity(trickPlatform.body, { x: 1, y: 0 })
    //     } else {
    //         Matter.Body.setVelocity(trickPlatform.body, { x: -1, y: 0 })
    //     }
    //     console.log(trickPlatform.body.position);
    //     Matter.Body.setAngle(trickPlatform.body, 0);
    // }
    // trickPlatform.add();
    // Matter.Body.setStatic(trickPlatform.body, false);

    const movingPlatform = new MovingPlatform(600, 300, 200, 20);
    movingPlatform.add();

    const myplayer = new Alf();
    myplayer.add();

    // const pipe1 = new Pipe();
    // pipe1.add();

    // const pipe2 = new Pipe();
    // Matter.Body.setPosition(pipe2.body, { x: pipe2.body.position.x, y: 600 })
    // pipe2.add();

}
window.onload = main;

function stop() {

    const { Engine, Render, Runner, Composite, World } = Matter;

    World.clear(global.world);
    Engine.clear(global.engine);
    Render.stop(global.render);
    Runner.stop(global.runner);
    global.render.canvas.remove();
    global.render.canvas = null;
    global.render.context = null;
    global.render.textures = {};

}

export { stop, main };