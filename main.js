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
        },
        timing: {
            timeScale: 1
        }
    });

    // Create a renderer
    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1280,
            height: 720,
            wireframes: false,
            background: '#021703'
        }
    });

    // Add the engine, and an empty list of 'bodies' to the world
    World.add(engine.world, []);

    // Start the renderer
    Render.run(render);
    const runner = Runner.create();

    // // Ensure that the physics runs at a constant speed regardless of framerate
    // runner.isFixed = false;

    Runner.run(runner, engine);


    // let last_run = 0;
    // let last_delta = 0;

    // function get_delta_correction() {
    //     let delta = 1000 / 60;//default used on first loop only
    //     let correction = 1.0;//also default for first iterations
    //     if (last_run == 0) {//first run -> no delta, no correction
    //         const this_run = Date.now();
    //         last_run = this_run;
    //     }
    //     else {
    //         if (last_delta == 0) {//second run -> first delta but no correction yet
    //             const this_run = Date.now();
    //             delta = this_run - last_run;
    //             if (delta > 100) {//avoids instabilities after pause (window in background) or with slow cpu
    //                 delta = 100;
    //             }
    //             last_run = this_run;
    //             last_delta = delta;
    //         }
    //         else {//run > 2 => delta + correction
    //             const this_run = Date.now();
    //             delta = this_run - last_run;
    //             if (delta > 100) {//avoids instabilities after pause (window in background) or with slow cpu
    //                 delta = 100;
    //             }
    //             correction = delta / last_delta;
    //             last_run = this_run;
    //             last_delta = delta;
    //         }
    //     }
    //     return { delta: delta, correction: correction };
    // }

    // function run() {
    //     const { delta, correction } = get_delta_correction();
    //     Matter.Engine.update(engine, delta, correction);
    //     tickCounter();
    //     requestAnimationFrame(run);

    // }

    // requestAnimationFrame(run);



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

    const platform1 = new Platform(500, 500, 300, 30);
    platform1.body.render.fillStyle = '#ff00f0';
    platform1.add();

    const movingPlatform = new MovingPlatform(600, 300, 200, 20, 600, 200);
    movingPlatform.add();

    const platform2 = new Platform(600, 150, 200, 20);
    platform2.add();

    const myplayer = new Alf();
    myplayer.add();

    const enemy1 = new PassiveEnemy([{ x: 370, y: 200 }, { x: 490, y: 200 }, { x: 630, y: 200 }]);
    enemy1.add();

    const enemy2 = new PassiveEnemy([{ x: 500, y: 0 }, { x: 700, y: 0 }]);
    Matter.Body.setPosition(enemy2.body, {x: 597, y: 76})
    enemy2.pauseTicks = 30;
    enemy2.speed = 1.5;
    enemy2.add();

    const mouse = Matter.MouseConstraint.create(engine);
    console.log(mouse.constraint.pointA)

    Matter.Events.on(mouse, "mousedown", () => {
        console.log(mouse.constraint.pointA);
    })

    // Walls
    const leftWall = new Platform(0, 360, 30, 730);
    leftWall.group = 'wall';
    leftWall.add();

    const rightWall = new Platform(1280, 360, 30, 730);
    rightWall.group = 'wall';
    rightWall.add();

    const topWall = new Platform(640, 0, 1280, 30);
    topWall.group = 'wall';
    topWall.add();

    const bottomWall = new Platform(640, 720, 1280, 30);
    bottomWall.add();



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