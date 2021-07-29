export class Loader {

    constructor() {
        // Settings
        this.fadeOutDelay = 500;

        // DOM elements
        this.loaderEl = document.getElementById("loader");
        this.progressEl = document.getElementById("loader__progress");
    }

    load() {
        const loadHandler = () => {
            this.progressEl.style.width = "100%";
        };

        const transitionEndedHandler = () => {
            setTimeout(() => {
                this.loaderEl.style.animation = "loaded 0.5s ease-in-out 0s 1 normal forwards";
            }, this.fadeOutDelay);
        };

        const animationEndedHandler = () => {
            document.getElementById("loader").style.display = "none";
        };

        window.addEventListener("load", loadHandler);
        this.progressEl.addEventListener("transitionend", transitionEndedHandler);
        this.loaderEl.addEventListener("animationend", animationEndedHandler);
    }
}
