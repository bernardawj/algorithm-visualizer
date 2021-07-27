import { Algorithm } from "../algorithm.js";
import { Animation } from "../../animators/animation.js";
import { action } from "../../animators/animation-action.js";

export class SortingAlgorithm extends Algorithm {

    constructor() {
        super();
    }

    static swap(animator, array, index1, index2) {
        const temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;

        // Animations
        animator.addAnimation(new Animation(action.PRE_SWAP, [index1, index2]));
        animator.addAnimation(new Animation(action.SWAP, [index1, index2]));
        animator.addAnimation(new Animation(action.SWAPPED, [index1, index2]));
    }
}
