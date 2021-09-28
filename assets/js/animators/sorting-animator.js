import { Animator } from "./animator.js";
import { action } from "./animation-action.js";
import { Sidebar } from "../components/sidebar.js";

export class SortingAnimator extends Animator {

    constructor(visualizer) {
        super(visualizer);
    }

    animate(sidebar) {
        // Check if sidebar is in a valid state
        if (!sidebar || !(sidebar instanceof Sidebar)) {
            throw new Error("Sidebar is not initialized.");
        }

        const animateProcess = (currentIndex = 0) => {
            if (this.visualizer.isPausing) {
                return;
            }

            // Reset element classes
            this.resetElementClasses();

            // Check if there are any animations
            // Exit if animations are completed
            if (this.animations.length === 0 || currentIndex >= this.animations.length) {
                this.currentAnimation = 0;
                sidebar.disableButtonList();
                this.completedAnimation();
                setTimeout(() => {
                    this.resetElementClasses(true);
                    sidebar.enableControls();
                    this.visualizer.resetStatus();
                }, 1000);
                return;
            }

            let tempSpeed = this.visualizer.speed;
            const currentAnimation = this.animations[currentIndex];
            const indexes = currentAnimation.indexes;

            switch (currentAnimation.action) {
                case action.SEARCH:
                    this.searchAnimation(indexes);
                    break;
                case action.FOUND_MINIMUM:
                    this.foundMinAnimation(indexes);
                    break;
                case action.PRE_SWAP:
                    this.preSwapAnimation(indexes);
                    break;
                case action.SWAP:
                    this.swapAnimation(indexes);
                    break;
                case action.SWAPPED:
                    this.swappedAnimation(indexes);
                    break;
                case action.FINAL:
                case action.PIVOT:
                    this.finalAnimation(indexes);
                    break;
            }

            this.animationTimeout = setTimeout(animateProcess, tempSpeed, ++currentIndex);
            this.currentAnimation = currentIndex;
        }

        animateProcess(this.currentAnimation);
    }

    searchAnimation(indexes) {
        this.visualizer.elements[indexes[0]].classList.add("visualizer__list-searching-position");
    }

    foundMinAnimation(indexes) {
        const previousMinIndex = indexes[0];
        const currentMinIndex = indexes[1];

        // Clear the class list of the previous found minimum value element
        this.visualizer.elements[previousMinIndex].classList.remove("visualizer__list-found-minimum-position");
        this.visualizer.elements[currentMinIndex].classList.add("visualizer__list-found-minimum-position");
    }

    preSwapAnimation(indexes) {
        const className = "visualizer__list-pre-swapped-position";
        this.addClassesToElements(indexes, className);
    }

    swapAnimation(indexes) {
        // Elements
        const placeholderElement = document.createElement("li");
        const selectedElement = this.visualizer.elements[indexes[0]];
        const swappingElement = this.visualizer.elements[indexes[1]];

        // Add swapping position classes to selected and swapping elements
        const className = "visualizer__list-swapping-position";
        this.addClassesToElements(indexes, className);

        // Animate element insertions in visualizer list
        const visualizerList = document.querySelector("#visualizer__list");
        visualizerList.insertBefore(placeholderElement, selectedElement);
        visualizerList.insertBefore(selectedElement, swappingElement);
        visualizerList.insertBefore(swappingElement, placeholderElement);
        visualizerList.removeChild(placeholderElement);

        // Reset elements list
        this.visualizer.elements.splice(0);
        for (const element of visualizerList.children) {
            this.visualizer.elements.push(element);
        }
    }

    swappedAnimation(indexes) {
        const className = "visualizer__list-swapped-position";
        this.addClassesToElements(indexes, className);
    }

    finalAnimation(indexes) {
        // Set final animated position for elements
        for (const index of indexes) {
            this.visualizer.elements[index].classList.add("visualizer__list-final-position");
        }
    }

    addClassesToElements(indexes, className) {
        this.visualizer.elements[indexes[0]].classList.add(className);
        this.visualizer.elements[indexes[1]].classList.add(className);
    }
}
