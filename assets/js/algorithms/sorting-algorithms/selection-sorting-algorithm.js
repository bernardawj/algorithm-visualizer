import { SortingAlgorithm } from "./sorting-algorithm.js";
import { Animation } from "../../animators/animation.js";
import { action } from "../../animators/animation-action.js";

export class SelectionSortingAlgorithm extends SortingAlgorithm {

    constructor() {
        super();
    }

    static sort(animator, array, descendingOrder = false) {
        // A sorting algorithm that selects the smallest/biggest value (depending on what operation you are doing)
        // and moves it from an unsorted subarray to a sorted subarray
        // Time complexity = O(n^2)

        if (!descendingOrder) {
            for (let i = 0; i < array.length; i++) {
                let min = array[i];
                let index = i;
                animator.addAnimation(new Animation(action.SEARCH, [i]));

                // Find the min value of the unsorted subarray
                for (let j = i; j < array.length; j++) {
                    animator.addAnimation(new Animation(action.SEARCH, [j]));

                    if (array[j] < min) {
                        // Add animation based on
                        animator.addAnimation(
                            new Animation(action.FOUND_MINIMUM, [index, j])); // Previous index, new index

                        // Update minimum value and index
                        min = array[j];
                        index = j;
                    }
                }

                // Swap the value from the unsorted subarray to the sorted subarray
                SelectionSortingAlgorithm.swap(animator, array, i, index);
                animator.addAnimation(new Animation(action.FINAL, [i]));
            }
        } else {
            for (let i = array.length - 1; i >= 0; i--) {
                let min = array[i];
                let index = i;
                animator.addAnimation(new Animation(action.SEARCH, [i]));

                // Find the min value of the unsorted subarray
                for (let j = i; j >= 0; j--) {
                    animator.addAnimation(new Animation(action.SEARCH, [j]));

                    if (array[j] < min) {
                        // Add animation based on
                        animator.addAnimation(
                            new Animation(action.FOUND_MINIMUM, [index, j])); // Previous index, new index

                        // Update minimum value and index
                        min = array[j];
                        index = j;
                    }
                }

                // Swap the value from the unsorted subarray to the sorted subarray
                SelectionSortingAlgorithm.swap(animator, array, i, index);
                animator.addAnimation(new Animation(action.FINAL, [i]));
            }
        }
    }
}
