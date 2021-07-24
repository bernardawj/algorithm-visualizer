import { SortingAlgorithm } from "./sorting-algorithm.js";

export class InsertionSortingAlgorithm extends SortingAlgorithm {

    constructor() {
        super();
    }

    static sort(array, descendingOrder = false) {
        // One of the slowest sorting algorithm that compares values with its predecessor to determine its position within the array
        // Time complexity = O(n^2)

        if (!descendingOrder) {
            for (let i = 0; i < array.length; i++) {
                let j = i;
                while (j > 0) {
                    if (array[j] < array[j - 1]) {
                        InsertionSortingAlgorithm.swap(array, j, j - 1);
                        j--;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        else {
            for (let i = array.length - 1; i >= 0; i--) {
                let j = i;
                while (j < array.length) {
                    if (array[j] < array[j + 1]) {
                        InsertionSortingAlgorithm.swap(array, j, j + 1);
                        j++;
                    }
                    else {
                        break;
                    }
                }
            }
        }
    }
}
