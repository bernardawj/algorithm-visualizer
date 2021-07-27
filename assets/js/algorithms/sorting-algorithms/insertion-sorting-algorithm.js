import { SortingAlgorithm } from "./sorting-algorithm.js";
import { Animation } from "../../animators/animation.js";
import { action } from "../../animators/animation-action.js";

export class InsertionSortingAlgorithm extends SortingAlgorithm {

    constructor() {
        super();
    }

    static sort(animator, array, descendingOrder = false) {
        // One of the slowest sorting algorithm that compares values with its predecessor to determine its position
        // within the array
        // Time complexity = O(n^2)

        if (!descendingOrder) {
            for (let i = 0; i < array.length; i++) {
                let j = i;
                animator.addAnimation(new Animation(action.SEARCH, [i]));

                while (j > 0) {
                    if (array[j] < array[j - 1]) {
                        InsertionSortingAlgorithm.swap(animator, array, j, j - 1);
                        j--;
                    } else {
                        break;
                    }
                }
            }
        } else {
            for (let i = array.length - 1; i >= 0; i--) {
                let j = i;
                animator.addAnimation(new Animation(action.SEARCH, [i]));

                while (j < array.length) {
                    if (array[j] < array[j + 1]) {
                        InsertionSortingAlgorithm.swap(animator, array, j, j + 1);
                        j++;
                    } else {
                        break;
                    }
                }
            }
        }
    }
}
