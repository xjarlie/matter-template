import './lib/matter.js';
import Entity from "./Entity.js";
import { keyMap } from "./lib/keyMap.js";
import collisions from './collisions.js';
import getByGroup from './lib/getByGroup.js';
import { ticks } from './lib/tickCounter.js';

class Alf extends Entity {
    constructor() {
        super()

        this.body = Matter.Bodies.rectangle(40, 60, 32, 64, {
            collisionFilter: {
                category: collisions.character, // The collision category this entity belongs to
                mask: collisions.ground // The collision categories this entity collides with
            },
            render: {
                sprite: {
                    texture: 'right.png',
                    xScale: 1,
                    yScale: 1
                }
            },
            label: this.key,
            mass: 1,
            friction: 0
        })

        this.facing = 'right';
        this.lastTouchedGround = 0;

    }

    tick() {

        Matter.Body.setAngle(this.body, 0);

        if (keyMap['ArrowRight'] === true) {

            Matter.Body.applyForce(this.body, this.body.position, { x: 0.001, y: 0 })
            this.facing = 'right';

        }

        if (keyMap['ArrowLeft'] === true) {

            Matter.Body.applyForce(this.body, this.body.position, { x: -0.001, y: 0 })
            this.facing = 'left';
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

        if (this.facing === 'right') {
            this.body.render.sprite.texture = 'rightbig.png';
        }

        if (this.facing === 'left') {
            this.body.render.sprite.texture = 'leftbig.png';
        }

    }
}

export default Alf