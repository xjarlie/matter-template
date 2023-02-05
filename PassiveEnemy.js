import './lib/matter.js';
import collisions from "./collisions.js";
import Entity from "./Entity.js";
import { global } from "./lib/global.js";
import { ticks } from './lib/tickCounter.js';
import getByGroup from './lib/getByGroup.js';

class PassiveEnemy extends Entity {
    constructor(points = []) {
        super();

        this.body = Matter.Bodies.rectangle(400, 60, 32, 64, {
            collisionFilter: {
                category: collisions.enemy | collisions.character, // The collision category this entity belongs to
                mask: collisions.ground | collisions.character | collisions.bullet // The collision categories this entity collides with
            },
            render: {
                fillStyle: 'red'
            },
            label: this.key,
            mass: 1,
            friction: 0
        })

        this.points = points;

        this.facing = 'right';
        this.target = 0;
        this.speed = 1;
        this.group = 'enemy';
        this.pauseTicks = 100;
        this.paused = 0;
    }

    tick() {

        Matter.Body.setAngle(this.body, 0);

        const position = this.body.position;
        const target = this.points[this.target];

        if (target && ticks > (this.paused + this.pauseTicks)) {

            const xDirectionToTarget = -Math.sign(Math.round(position.x) - Math.round(target.x));

            Matter.Body.setVelocity(this.body, { x: xDirectionToTarget * this.speed, y: this.body.velocity.y });
    
            if (Math.round(target.x) === Math.round(position.x)) {
                this.target++;
                if (this.target >= this.points.length) {
                    this.target = 0;
                }
                this.paused = ticks;
            }
    

        }

        if (Matter.Query.collides(this.body, getByGroup('bullet').bodies).length > 0) {
            //this.remove();
        }


        //Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -0.001 })

    }
}

export default PassiveEnemy;