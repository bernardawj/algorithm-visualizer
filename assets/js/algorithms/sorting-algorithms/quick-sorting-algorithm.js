import { SortingAlgorithm } from "./sorting-algorithm.js";

export class QuickSortingAlgorithm extends SortingAlgorithm {

    constructor() {
        super();
    }

    static sort(array, descendingOrder = false) {
        // One of the quickest sorting algorithm that uses divide and conquer to split its values up to sub-arrays and compares values within the sub array
        // using the pivot point to determine the placement of each value
        // Time complexity = O(nLog(n))

        QuickSortingAlgorithm.split(array, descendingOrder);
    }

    static split(array, descendingOrder, low = 0, high = array.length) {
        // Base condition
        if (low >= high)
            return;

        // Find the pivoting point
        const pivot = QuickSortingAlgorithm.partition(array, descendingOrder, low, high);

        // Break down the array internally
        QuickSortingAlgorithm.split(array, descendingOrder, low, pivot);
        QuickSortingAlgorithm.split(array, descendingOrder, pivot + 1, high);
    }

    static partition(array, descendingOrder, low, high) {
        const pivot = array[low];
        let i = low, j = high;

        while (i < j) {
            // Find the pivoting point where j intersects with i
            let iCondition;
            do {
                i++;
                iCondition = !descendingOrder ? array[i] <= pivot : array[i] >= pivot;
            }
            while (iCondition);

            let jCondition;
            do {
                j--;
                jCondition = !descendingOrder ? array[j] > pivot : array[j] < pivot;
            }
            while (jCondition);

            // Swap the value when it reaches its intersecting point
            if (i < j) {
                QuickSortingAlgorithm.swap(array, i, j);
            }
        }

        // Swap the pivot point
        QuickSortingAlgorithm.swap(array, low, j);

        return j;
    }
}
