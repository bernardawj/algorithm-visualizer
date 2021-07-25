import { Random } from "./random.js";

export class Generator {

    static generateArray(array, min, max, size) {
        array.splice(0);
        for (let i = 0; i < size; i++) {
            array.push(Random.getRandomNumber(min, max));
        }
    }
}
