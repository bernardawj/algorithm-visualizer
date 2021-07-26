import { Component } from "./component.js";
import { Generator } from "../utilities/generator.js";
import { ElementAttribute } from "./element-attribute.js";

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
        this.arrayValueAddBtn = document.getElementById("modal__customised-array-add");
        this.customisedArrayModal = document.getElementById("modal__customised-array");
        this.modalBtns = document.querySelectorAll("[data-toggle='modal']");

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

        // Event handler to toggle modal
        const modalBtnHandler = () => {
            if (this.customisedArrayModal.classList.contains("show")) {
                this.closeModal();
            }
            else {
                this.showModal();
            }
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
        this.customisedArray(visualizer);
        this.hamburger();

        for (const modalBtn of this.modalBtns) {
            modalBtn.addEventListener("click", modalBtnHandler);
        }

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

    customisedArray(visualizer) {
        const numbers = [];
        const input = document.getElementById("modal__customised-array-input");
        const generateBtn = document.getElementById("modal__customised-array-generate");
        const arrayValues = document.getElementById("array-box__values");

        // Event handler to add values into custom array
        const arrayValueAddBtnHandler = (evt) => {
            if (!visualizer.isRunning) {
                const value = parseInt(input.value);
                numbers.push(value);

                resetDisplay();
                populateDisplay();
            }
        };

        const resetDisplay = () => {
            arrayValues.textContent = "";
        };

        const populateDisplay = () => {
            for (let i = 0; i < numbers.length; i++) {
                const aSettings = [
                    new ElementAttribute("href", "javascript:;"),
                    new ElementAttribute("class", "array-value-remove"),
                    new ElementAttribute("data-index", i)
                ];

                let a;
                if (i !== numbers.length - 1) {
                    a = Component.createRootElement("a", aSettings, "", `${numbers[i]} &times;, `);
                }
                else {
                    a = Component.createRootElement("a", aSettings, "", `${numbers[i]} &times;`);
                }
                a.addEventListener("click", removeValueHandler);

                arrayValues.appendChild(a);
            }
        };

        const removeValueHandler = evt => {
            const index = parseInt(evt.target.dataset.index);
            numbers.splice(index, 1);

            resetDisplay();
            populateDisplay();
        };

        const generateBtnHandler = el => {
            if (!visualizer.isRunning) {
                const closeBtn = el.target.parentNode.querySelector("[data-toggle='modal']");

                if (numbers.length === 0) {
                    return;
                }

                visualizer.array.splice(0, visualizer.array.length, ...numbers);

                visualizer.reRender();
                closeBtn.click();
            }
        };

        this.arrayValueAddBtn.addEventListener("click", arrayValueAddBtnHandler);
        generateBtn.addEventListener("click", generateBtnHandler);
    }

    showSidebar() {
        this.overlay.classList.add("overlay--active");
        this.hamburgerBtn.classList.add("hamburger--active");

        for (const element of this.sidebarElements) {
            element.classList.remove("show-desktop");
        }
    }

    resetSidebar() {
        this.overlay.classList.remove("overlay--active");
        this.hamburgerBtn.classList.remove("hamburger--active");

        for (const element of this.sidebarElements) {
            element.classList.add("show-desktop");
        }
    }

    showModal() {
        this.customisedArrayModal.classList.add("show");
    }

    closeModal() {
        this.customisedArrayModal.classList.remove("show");
    }
}