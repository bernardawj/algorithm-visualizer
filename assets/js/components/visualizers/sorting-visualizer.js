import { Visualizer } from "./visualizer.js";
import { ElementAttribute } from "../element-attribute.js";

export class SortingVisualizer extends Visualizer {

    constructor() {
        super();

        // Settings
        this.itemMarginSize = 3;
        this.hideTextWidth = 25;
        this.increaseTextWidth = 75;
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
                `height: ${itemHeight}px`,
                `width: ${itemWidth}px`,
                `margin-right: ${itemMargin}px`
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
