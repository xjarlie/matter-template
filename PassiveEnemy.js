import './lib/matter.js';
import Entity from "./Entity.js";
import collisions from './collisions.js';
import getByGroup from './lib/getByGroup.js';
import { ticks } from './lib/tickCounter.js';

class PassiveEnemy extends Entity {
    constructor(posX, posY, positions) {
        super()

        this.body = Matter.Bodies.rectangle(posX, posY, 40, 20, {
            collisionFilter: {
                category: collisions.enemy,
                mask: collisions.ground | collisions.character
            },
            render: {
                fillStyle: 'red'
            },
            label: this.key,
            density: 0.01
        })

        this.positions = positions
        this.group = 'enemy'
        this.currentTarget = 0
        this.speed = 3
    }

    tick() {

        const position = this.body.position
        const target = this.positions[this.currentTarget]

        // console.log(ticks, this.paused + this.pauseTicks)

        if (target /*&& ticks > (this.paused + this.pauseTicks)*/) {
            const xDirectionToTarget = -Math.sign(Math.round(position.x) - Math.round(target.x))
            console.log(target);
            Matter.Body.setVelocity(this.body, { x: xDirectionToTarget * this.speed, y: this.body.velocity.y })

            console.log(target.x, Math.round(position.x))

            if (Math.ceil(position.x) == Math.floor(target.x) || Math.floor(position.x) == Math.ceil(target.x)) {

                this.currentTarget = this.currentTarget + 1
                
                if (this.currentTarget >= this.positions.length) {

                    this.currentTarget = 0
                }

            }
        }

        // const position = this.body.position;
        // const target = this.positions[this.currentTarget];

        // if (target && ticks > (this.paused + this.pauseTicks)) {

        //     const xDirectionToTarget = -Math.sign(Math.round(position.x) - Math.round(target.x));

        //     Matter.Body.setVelocity(this.body, { x: xDirectionToTarget * this.speed, y: this.body.velocity.y });
            
        //     console.log(Math.round(position.x), Math.round(target.x))
        //     if (Math.round(target.x) === Math.round(position.x)) {
        //         this.target++;
        //         if (this.target >= this.points.length) {
        //             this.target = 0;
        //         }
        //         this.paused = ticks;
        //     }
    

        // }



    }
}

export default PassiveEnemy