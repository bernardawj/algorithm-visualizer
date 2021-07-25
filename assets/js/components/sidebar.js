import { Component } from "./component.js";
import { Generator } from "../utilities/generator.js";

export class Sidebar extends Component {

    constructor(visualizer) {
        super();

        // Check if visualizer is in a valid state
        if (!visualizer) {
            throw new Error("Visualizer is not initialized.");
        }

        // DOM elements
        this.generatorBtn = document.getElementById("sidebar__random-array");
        this.maxValueRange = document.getElementById("sidebar__settings-max-value");
        this.sizeRange = document.getElementById("sidebar__settings-size");
        this.speedRange = document.getElementById("sidebar__settings-speed");
        this.reverseCbx = document.getElementById("sidebar__algorithms-reverse");
        this.hamburgerBtn = document.getElementById("sidebar__hamburger");
        this.overlay = document.getElementById("overlay");
        this.sidebarElements = document.getElementsByClassName("sidebar__element");

        // Initialize
        this.loadSettings(visualizer);
        this.loadEventHandlers(visualizer);
    }

    loadSettings(visualizer) {
        this.maxValueRange.value = visualizer.maxValue;
        this.sizeRange.value = visualizer.size;
        this.speedRange.value = visualizer.speed;
    }

    loadEventHandlers(visualizer) {
        // Event handler to generate random array
        const generatorBtnHandler = () => {
            Generator.generateArray(visualizer.array, visualizer.minValue, visualizer.maxValue, visualizer.size);
            visualizer.reRender();
        };

        // Event handler to update max value of array item
        const maxValueRangeHandler = () => {
            visualizer.maxValue = this.maxValueRange.value;
            Generator.generateArray(visualizer.array, visualizer.minValue, visualizer.maxValue, visualizer.size);
            visualizer.reRender();
        };

        // Event handler to update size of array
        const sizeRangeHandler = () => {
            visualizer.size = this.sizeRange.value;
            Generator.generateArray(visualizer.array, visualizer.minValue, visualizer.maxValue, visualizer.size);
            visualizer.reRender();
        };

        // Event handler to update speed of visualizer
        const speedRangeHandler = () => {
            visualizer.speed = this.speedRange.value;
        };

        // Event handler for toggling reverse checkbox
        const reverseCbxHandler = (evt) => {
            visualizer.isDescendingOrder = evt.target.checked;
        };

        const windowResizeHandler = () => {
            visualizer.windowWidth = window.innerWidth;
            if (visualizer.windowWidth > visualizer.tabletSize) {
                this.resetSidebar();
            }
        };

        this.generatorBtn.addEventListener("click", generatorBtnHandler);
        this.maxValueRange.addEventListener("input", maxValueRangeHandler);
        this.sizeRange.addEventListener("input", sizeRangeHandler);
        this.speedRange.addEventListener("input", speedRangeHandler);
        this.reverseCbx.addEventListener("change", reverseCbxHandler);
        this.hamburger();

        window.addEventListener("resize", windowResizeHandler);
    }

    hamburger() {
        const hamburgerBtnHandler = () => {
            for (const element of this.sidebarElements) {
                element.classList.toggle("show-desktop");
            }

            this.hamburgerBtn.classList.toggle("hamburger--active");
            this.overlay.classList.toggle("overlay--active");
        }

        this.hamburgerBtn.addEventListener("click", hamburgerBtnHandler);
    }

    showSidebar() {
        this.overlay.classList.add("overlay--active");
        this.hamburgerBtn.classList.add("hamburger--active");

        for (const element of this.sidebarElements) {
            element.classList.remove("show-desktop");
        }
    };

    resetSidebar() {
        this.overlay.classList.remove("overlay--active");
        this.hamburgerBtn.classList.remove("hamburger--active");

        for (const element of this.sidebarElements) {
            element.classList.add("show-desktop");
        }
    };
}
