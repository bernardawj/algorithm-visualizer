import { SortingAlgorithm } from "./sorting-algorithm.js";
import { Animation } from "../../animators/animation.js";
import { action } from '../../animators/animation-action.js';

export class BubbleSortingAlgorithm extends SortingAlgorithm {

    constructor() {
        super();
    }

    static sort(animator, array, descendingOrder = false) {
        // The slowest sorting algorithm that requires full passes to determine whether is the array sorted
        // Time complexity = O(n^2)

        if (!descendingOrder) {
            for (let i = 0; i < array.length; i++) {
                for (let j = 1; j < array.length - i; j++) {
                    // Add animation
                    animator.addAnimation(new Animation(action.SEARCH, [j]));

                    if (array[j - 1] > array[j]) {
                        BubbleSortingAlgorithm.swap(animator, array, j - 1, j);
                    }
                }
            }
        } else {
            let sorted = 0;
            for (let i = array.length - 1; i >= 0; i--) {
                for (let j = array.length - 2; j >= sorted; j--) {
                    // Add animation
                    animator.addAnimation(new Animation(action.SEARCH, [j]));

                    if (array[j + 1] > array[j]) {
                        BubbleSortingAlgorithm.swap(animator, array, j + 1, j);
                    }
                }
                sorted++;
            }
        }
    }
}
