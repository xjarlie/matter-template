import './lib/matter.js';
import Entity from "./Entity.js";
import { keyMap } from "./lib/keyMap.js";
import collisions from './collisions.js';
import getByGroup from './lib/getByGroup.js';
import { ticks } from './lib/tickCounter.js';
import Bullet from './Bullet.js';

class Alf extends Entity {
    constructor() {
        super()

        this.body = Matter.Bodies.rectangle(60, 120, 32, 64, {
            collisionFilter: {
                category: collisions.character, // The collision category this entity belongs to
                mask: collisions.ground | collisions.enemy // The collision categories this entity collides with
            },
            render: {
                sprite: {
                    texture: 'rightbig.png',
                    xScale: 1,
                    yScale: 1
                }
            },
            label: this.key,
            mass: 1,
            friction: 0
        })

        this.group = 'character';

        this.facing = 1;
        this.lastTouchedGround = 0;
        this.lastFired = 0;
        this.fireDelay = 0;

    }

    tick() {

        Matter.Body.setAngle(this.body, 0);

        if (keyMap['ArrowRight'] === true) {

            Matter.Body.applyForce(this.body, this.body.position, { x: 0.001, y: 0 })
            this.facing = 1;

        }

        if (keyMap['ArrowLeft'] === true) {

            Matter.Body.applyForce(this.body, this.body.position, { x: -0.001, y: 0 })
            this.facing = -1;
        }

        // if (Matter.Query.collides(this.body, getByGroup('platform').bodies).length > 0) {
        //     this.lastTouchedGround = ticks;
        // }

        //console.log(this.lastTouchedGround);


        if (Matter.Query.collides(this.body, getByGroup('platform').bodies).length > 0) {

            if (keyMap['ArrowUp'] === true) {

                Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -0.08 })

            }

        }

        if (Matter.Query.collides(this.body, getByGroup('enemy').bodies).length > 0) {

            Matter.Body.setPosition(this.body, { x: 60, y: 120 })

        }

        if (this.facing === 1) {
            this.body.render.sprite.texture = 'rightbig.png';
        }

        if (this.facing === -1) {
            this.body.render.sprite.texture = 'leftbig.png';
        }

        if (keyMap[' '] === true) {

            if (ticks > this.lastFired + this.fireDelay) {
                const bullet = new Bullet(this.body.position.x, this.body.position.y, 0.5 * this.facing, 0);
                bullet.add();
                this.lastFired = ticks;
            }


        }

    }
}

export default Alf