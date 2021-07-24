import { SortingAlgorithm } from "./sorting-algorithm.js";

export class MergeSortingAlgorithm extends SortingAlgorithm {

    constructor() {
        super();
    }

    static sort(array, descendingOrder = false) {
        // One of the quickest sorting algorithm that uses divide and conquer to split its values up to sub-arrays and
        // merge them back according to its value Time complexity = O(nLog(n))

        MergeSortingAlgorithm.split(array, descendingOrder);
    }

    static split(array, descendingOrder) {
        // Base condition
        if (array.length <= 1) {
            return;
        }

        // Split the array
        let mid = Math.ceil((0 + array.length) / 2);
        let leftArray = [], rightArray = [];

        // Populate the array values
        for (let i = 0; i < array.length; i++) {
            if (i < mid) {
                leftArray[i] = array[i];
            }
            else {
                rightArray[i - mid] = array[i];
            }
        }

        // Divide left and right arrays
        MergeSortingAlgorithm.split(leftArray, descendingOrder);
        MergeSortingAlgorithm.split(rightArray, descendingOrder);

        // Then merge back both arrays
        MergeSortingAlgorithm.merge(array, leftArray, rightArray, descendingOrder);
    }

    static merge(mainArray, leftArray, rightArray, descendingOrder) {
        let leftIndex = 0, rightIndex = 0, arrayIndex = 0;

        // Merge the array values until one side is exhausted
        while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
            const condition = !descendingOrder ? leftArray[leftIndex] < rightArray[rightIndex] : leftArray[leftIndex] > rightArray[rightIndex];
            if (condition) {
                mainArray[arrayIndex++] = leftArray[leftIndex++];
            }
            else {
                mainArray[arrayIndex++] = rightArray[rightIndex++];
            }
        }

        // Loop through each array to add remaining values
        while (leftIndex < leftArray.length) {
            mainArray[arrayIndex++] = leftArray[leftIndex++];
        }

        while (rightIndex < rightArray.length) {
            mainArray[arrayIndex++] = rightArray[rightIndex++];
        }
    }
}
