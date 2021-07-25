import { Component } from "../component.js";

export class Visualizer extends Component {

    constructor() {
        super();

        // Settings
        this.containerHeightPercentage = 90;
        this.minValue = 50;
        this.maxValue = 500;
        this.size = 25;
        this.speed = 50;

        // Attributes
        this.array = [];
        this.elements = [];

        // DOM elements
        this.visualizerEl = document.getElementById("visualizer__wrapper");
        this.visualizerContainer = this.visualizerEl.firstElementChild;
        this.visualizer = this.visualizerContainer.firstElementChild;
    }

    render() {
        this.updateContainerSizing();
        this.renderArrayData();
    }

    reset() {
        this.elements.splice(0);
        Visualizer.removeAllChildElements(this.visualizer);
    }

    reRender() {
        this.reset();
        this.render();
    }

    updateContainerSizing() {
        this.visualizerContainer.style.height = (this.containerHeightPercentage / 100) * this.visualizerEl.clientHeight + "px";
    }
}
