import { BubbleSortingAlgorithm } from "../../algorithms/sorting-algorithms/bubble-sorting-algorithm";
import { InsertionSortingAlgorithm } from "../../algorithms/sorting-algorithms/insertion-sorting-algorithm";
import { SelectionSortingAlgorithm } from "../../algorithms/sorting-algorithms/selection-sorting-algorithm";
import { MergeSortingAlgorithm } from "../../algorithms/sorting-algorithms/merge-sorting-algorithm";
import { QuickSortingAlgorithm } from "../../algorithms/sorting-algorithms/quick-sorting-algorithm";

const array = [5, 1, 11, 10, 2, 8];

describe("Sorting Algorithms", () => {
    describe("Bubble Sort", () => {
        test("should sort in ascending order", () => {
            const replicatedArray = array.slice();
            BubbleSortingAlgorithm.sort(replicatedArray, false);

            expect(replicatedArray[0]).toBe(1);
            expect(replicatedArray[1]).toBe(2);
            expect(replicatedArray[2]).toBe(5);
            expect(replicatedArray[3]).toBe(8);
            expect(replicatedArray[4]).toBe(10);
            expect(replicatedArray[5]).toBe(11);
        });

        test("should sort in descending order", () => {
            const replicatedArray = array.slice();
            BubbleSortingAlgorithm.sort(replicatedArray, true);

            expect(replicatedArray[0]).toBe(11);
            expect(replicatedArray[1]).toBe(10);
            expect(replicatedArray[2]).toBe(8);
            expect(replicatedArray[3]).toBe(5);
            expect(replicatedArray[4]).toBe(2);
            expect(replicatedArray[5]).toBe(1);
        });
    });

    describe("Insertion Sort", () => {
        test("should sort in ascending order", () => {
            const replicatedArray = array.slice();
            InsertionSortingAlgorithm.sort(replicatedArray, false);

            expect(replicatedArray[0]).toBe(1);
            expect(replicatedArray[1]).toBe(2);
            expect(replicatedArray[2]).toBe(5);
            expect(replicatedArray[3]).toBe(8);
            expect(replicatedArray[4]).toBe(10);
            expect(replicatedArray[5]).toBe(11);
        });

        test("should sort in descending order", () => {
            const replicatedArray = array.slice();
            InsertionSortingAlgorithm.sort(replicatedArray, true);

            expect(replicatedArray[0]).toBe(11);
            expect(replicatedArray[1]).toBe(10);
            expect(replicatedArray[2]).toBe(8);
            expect(replicatedArray[3]).toBe(5);
            expect(replicatedArray[4]).toBe(2);
            expect(replicatedArray[5]).toBe(1);
        });
    });

    describe("Selection Sort", () => {
        test("should sort in ascending order", () => {
            const replicatedArray = array.slice();
            SelectionSortingAlgorithm.sort(replicatedArray, false);

            expect(replicatedArray[0]).toBe(1);
            expect(replicatedArray[1]).toBe(2);
            expect(replicatedArray[2]).toBe(5);
            expect(replicatedArray[3]).toBe(8);
            expect(replicatedArray[4]).toBe(10);
            expect(replicatedArray[5]).toBe(11);
        });

        test("should sort in descending order", () => {
            const replicatedArray = array.slice();
            SelectionSortingAlgorithm.sort(replicatedArray, true);

            expect(replicatedArray[0]).toBe(11);
            expect(replicatedArray[1]).toBe(10);
            expect(replicatedArray[2]).toBe(8);
            expect(replicatedArray[3]).toBe(5);
            expect(replicatedArray[4]).toBe(2);
            expect(replicatedArray[5]).toBe(1);
        });
    });

    describe("Merge Sort", () => {
        test("should sort in ascending order", () => {
            const replicatedArray = array.slice();
            MergeSortingAlgorithm.sort(replicatedArray, false);

            expect(replicatedArray[0]).toBe(1);
            expect(replicatedArray[1]).toBe(2);
            expect(replicatedArray[2]).toBe(5);
            expect(replicatedArray[3]).toBe(8);
            expect(replicatedArray[4]).toBe(10);
            expect(replicatedArray[5]).toBe(11);
        });

        test("Should sort in descending order", () => {
            const replicatedArray = array.slice();
            MergeSortingAlgorithm.sort(replicatedArray, true);

            expect(replicatedArray[0]).toBe(11);
            expect(replicatedArray[1]).toBe(10);
            expect(replicatedArray[2]).toBe(8);
            expect(replicatedArray[3]).toBe(5);
            expect(replicatedArray[4]).toBe(2);
            expect(replicatedArray[5]).toBe(1);
        });
    });

    describe("Quick Sort", () => {
        test("should sort in ascending order", () => {
            const replicatedArray = array.slice();
            QuickSortingAlgorithm.sort(replicatedArray, false);

            expect(replicatedArray[0]).toBe(1);
            expect(replicatedArray[1]).toBe(2);
            expect(replicatedArray[2]).toBe(5);
            expect(replicatedArray[3]).toBe(8);
            expect(replicatedArray[4]).toBe(10);
            expect(replicatedArray[5]).toBe(11);
        });

        test("Should sort in descending order", () => {
            const replicatedArray = array.slice();
            QuickSortingAlgorithm.sort(replicatedArray, true);

            expect(replicatedArray[0]).toBe(11);
            expect(replicatedArray[1]).toBe(10);
            expect(replicatedArray[2]).toBe(8);
            expect(replicatedArray[3]).toBe(5);
            expect(replicatedArray[4]).toBe(2);
            expect(replicatedArray[5]).toBe(1);
        });
    });
});
