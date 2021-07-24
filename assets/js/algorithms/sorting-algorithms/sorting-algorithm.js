import { Algorithm } from "../../algorithm.js";

export class SortingAlgorithm extends Algorithm {

    constructor() {
        super();
    }

    static swap(array, index1, index2) {
        const temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    }
}
