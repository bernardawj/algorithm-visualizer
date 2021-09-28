import { Animation } from "./animation.js";

export class Animator {

    constructor(visualizer) {
        // Check if visualizer is in a valid state
        if (!visualizer) {
            throw new Error("Invalid visualizer.");
        }

        this.currentAnimation = 0;
        this.animationTimeout = null;
        this.animations = [];
        this.visualizer = visualizer;
    }

    resetAnimations() {
        this.animations.splice(0);
    }

    addAnimation(animation) {
        // Check if added animation is in valid state
        if (!animation) {
            throw new Error("Invalid animation.");
        }

        // Check if animation is an instance of Animation class
        if (!(animation instanceof Animation)) {
            throw new Error("Added animation is not an instance of Animation class.");
        }

        this.animations.push(animation);
    }

    completedAnimation() {
        this.resetAnimations();
        for (const element of this.visualizer.elements) {
            element.classList.add("visualizer__list-animation-completed");
        }
    }

    resetElementClasses(hardReset = false) {
        const classesToRemove = [
            "visualizer__list-searching-position",
            "visualizer__list-pre-swapped-position",
            "visualizer__list-swapping-position"
        ];

        if (hardReset) {
            classesToRemove.push("visualizer__list-pivot-position");
            classesToRemove.push("visualizer__list-final-position");
            classesToRemove.push("visualizer__list-animation-completed");
        }

        for (const element of this.visualizer.elements) {
            for (const cl of classesToRemove) {
                element.classList.remove(cl);
            }

            if (element.classList.contains("visualizer__list-swapped-position")) {
                element.setAttribute("class", "");
            }
        }
    }
}
