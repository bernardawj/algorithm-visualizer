import { SortingAlgorithm } from "./sorting-algorithm.js";

export class SelectionSortingAlgorithm extends SortingAlgorithm {

    constructor() {
        super();
    }

    static sort(array, descendingOrder = false) {
        // A sorting algorithm that selects the smallest/biggest value (depending on what operation you are doing)
        // and moves it from an unsorted subarray to a sorted subarray
        // Time complexity = O(n^2)

        if (!descendingOrder) {
            for (let i = 0; i < array.length; i++) {
                let min = array[i];
                let index = i;

                // Find the min value of the unsorted subarray
                for (let j = i; j < array.length; j++) {
                    if (array[j] < min) {
                        // Update minimum value and index
                        min = array[j];
                        index = j;
                    }
                }

                // Swap the value from the unsorted subarray to the sorted subarray
                SelectionSortingAlgorithm.swap(array, i, index);
            }
        }
        else {
            for (let i = array.length - 1; i >= 0; i--) {
                let min = array[i];
                let index = i;

                // Find the min value of the unsorted subarray
                for (let j = i; j >= 0; j--) {
                    if (array[j] < min) {
                        // Update minimum value and index
                        min = array[j];
                        index = j;
                    }
                }

                // Swap the value from the unsorted subarray to the sorted subarray
                SelectionSortingAlgorithm.swap(array, i, index);
            }
        }
    }
}
