import { Component } from "../component.js";
import { Alert } from "../alerts/alert.js";

export class Visualizer extends Component {

    constructor() {
        super();

        // Settings
        this.tabletSize = 991;
        this.windowWidth = window.innerWidth;
        this.containerHeightPercentage = 90;
        this.minValue = 50;
        this.maxValue = 500;
        this.size = 25;
        this.speed = 50;

        // Attributes
        this.array = [];
        this.elements = [];
        this.isRunning = false;

        // DOM elements
        this.visualizerEl = document.getElementById("visualizer__wrapper");
        this.visualizerContainer = this.visualizerEl.firstElementChild;
        this.visualizer = this.visualizerContainer.firstElementChild;

        // Alert
        this.alert = new Alert();

        this.loadEventHandlers();
    }

    render(refreshSizing = false) {
        this.updateContainerSizing();
        if (!refreshSizing) {
            this.renderArrayData();
        } else {
            this.updateArrayDimensions();
        }
    }

    reset() {
        this.elements.splice(0);
        Visualizer.removeAllChildElements(this.visualizer);
    }

    reRender() {
        this.reset();
        this.render(false);
    }

    updateContainerSizing() {
        this.visualizerContainer.style.height = (this.containerHeightPercentage / 100) * this.visualizerEl.clientHeight + "px";
    }

    loadEventHandlers() {
        // Event handler for resizing window
        const windowResizeHandler = () => {
            this.render(true);
        }

        window.addEventListener("resize", windowResizeHandler);
    }
}
