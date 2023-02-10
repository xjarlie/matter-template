import { global } from "./global.js";

export default function getByKey(key) {
    let entities = global.entities;
    entities = entities.filter(e => e.key === key);

    return entities[0];
}
