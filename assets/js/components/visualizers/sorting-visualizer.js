import { Visualizer } from "./visualizer.js";
import { ElementAttribute } from "../element-attribute.js";
import { SortingAnimator } from "../../animators/sorting-animator.js";
import { sortingType } from "../../algorithms/sorting-algorithms/sorting-type.js";
import { BubbleSortingAlgorithm } from "../../algorithms/sorting-algorithms/bubble-sorting-algorithm.js";
import { InsertionSortingAlgorithm } from "../../algorithms/sorting-algorithms/insertion-sorting-algorithm.js";
import { SelectionSortingAlgorithm } from "../../algorithms/sorting-algorithms/selection-sorting-algorithm.js";
import { MergeSortingAlgorithm } from "../../algorithms/sorting-algorithms/merge-sorting-algorithm.js";
import { QuickSortingAlgorithm } from "../../algorithms/sorting-algorithms/quick-sorting-algorithm.js";

export class SortingVisualizer extends Visualizer {

    constructor() {
        super();

        // Settings
        this.itemMarginSize = 3;
        this.hideTextWidth = 25;
        this.increaseTextWidth = 75;
        this.isDescendingOrder = false;

        // Animator
        this.animator = new SortingAnimator(this);
    }

    visualize(sidebar, selectedAlgorithm) {
        // Execute algorithm based on selection
        switch (selectedAlgorithm) {
            case sortingType.BUBBLE_SORT:
                BubbleSortingAlgorithm.sort(this.animator, this.array, this.isDescendingOrder);
                break;
            case sortingType.INSERTION_SORT:
                InsertionSortingAlgorithm.sort(this.animator, this.array, this.isDescendingOrder);
                break;
            case sortingType.SELECTION_SORT:
                SelectionSortingAlgorithm.sort(this.animator, this.array, this.isDescendingOrder);
                break;
            case sortingType.MERGE_SORT:
                MergeSortingAlgorithm.sort(this.animator, this.array, this.isDescendingOrder);
                break;
            case sortingType.QUICK_SORT:
                QuickSortingAlgorithm.sort(this.animator, this.array, this.isDescendingOrder);
                break;
        }

        this.animator.animate(sidebar);
    }

    stopVisualizer(sidebar) {
        this.resetStatus();
        this.animator.animate(sidebar);
        this.animator.resetAnimations();
        this.reRender();
    }

    pauseVisualizer(sidebar) {
        this.isPausing = !this.isPausing;
        if (!this.isPausing) {
            this.animator.animate(sidebar);
        }
    }

    renderArrayData() {
        // Create un-ordered list element
        const ulSettings = [
            new ElementAttribute("id", "visualizer__list")
        ]
        const ul = SortingVisualizer.createRootElement("ul", ulSettings);

        // Remove all rendered elements
        this.elements.splice(0);

        // Render array elements based on value that are randomly generated for that array
        const highestValue = Math.max(...this.array);
        for (const number of this.array) {
            // Calculated values
            const itemHeight = this.calculateVisualizerItemHeight(number, highestValue, this.visualizerContainer.clientHeight);
            const itemWidth = this.calculateVisualizerItemWidth(this.array.length, this.visualizerContainer.clientWidth);
            const itemMargin = this.calculateVisualizerItemMarginWidth(this.array.length);

            // Set styles for each array elements
            const styles = [
                `height: ${ itemHeight }px`,
                `width: ${ itemWidth }px`,
                `margin-right: ${ itemMargin }px`
            ];

            // Increase font size if item width is larger than expected
            if (itemWidth > this.increaseTextWidth) {
                styles.push("font-size: 24px");
                styles.push("line-height: 2em");
            }

            // Rendered array element does not have enough space
            if (itemWidth < this.hideTextWidth) {
                styles.push("color: transparent");
            }

            // Set element attributes for the creation of each array elements and append to un-ordered list
            const liSettings = [
                new ElementAttribute("class", "array-element"),
                new ElementAttribute("style", styles.join("; "))
            ];
            const li = SortingVisualizer.createRootElement("li", liSettings, number);

            // Push created elements to the elements array
            this.elements.push(li);
            ul.appendChild(li);
        }

        // Populate visualizer with rendered un-ordered list
        this.visualizer.appendChild(ul);
    }

    updateArrayDimensions() {
        const visualizerList = document.getElementById("visualizer__list");
        const visualizerItems = visualizerList.children;

        // Update array elements sizes based on windows size
        const highestValue = Math.max(...this.array);
        for (const item of visualizerItems) {
            // Calculated values
            const itemHeight = this.calculateVisualizerItemHeight(item.textContent, highestValue, this.visualizerContainer.clientHeight);
            const itemWidth = this.calculateVisualizerItemWidth(this.array.length, this.visualizerContainer.clientWidth);
            const itemMargin = this.calculateVisualizerItemMarginWidth(this.array.length);

            const styles = [
                `height: ${ itemHeight }px`,
                `width: ${ itemWidth }px`,
                `margin-right: ${ itemMargin }px`
            ];

            // Increase font size if item width is larger than expected
            if (itemWidth > this.increaseTextWidth) {
                styles.push("font-size: 24px");
                styles.push("line-height: 2em");
            }

            // Check if item size is lesser
            if (itemWidth < this.hideTextWidth) {
                styles.push("color: transparent");
            }

            item.setAttribute("style", styles.join("; "));
        }
    }

    calculateVisualizerItemHeight(value, highestValue, containerHeight) {
        return (value / highestValue) * containerHeight;
    }

    calculateVisualizerItemWidth(size, containerWidth) {
        const threshold = 0.03;
        return (containerWidth / size) - this.itemMarginSize - threshold;
    }

    calculateVisualizerItemMarginWidth(size) {
        return parseFloat((this.itemMarginSize + (this.itemMarginSize / size)).toString());
    }
}
