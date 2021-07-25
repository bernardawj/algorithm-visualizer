import { SortingVisualizer } from "../components/visualizers/sorting-visualizer.js";
import { Sidebar } from "../components/sidebar.js";
import { Generator } from "../utilities/generator.js";

export class SortingApp {

    constructor() {
        this.visualizer = new SortingVisualizer();
        new Sidebar(this.visualizer);

        this.loadVisualizer();
    }

    static init() {
        new SortingApp();
    }

    loadVisualizer() {
        Generator.generateArray(this.visualizer.array, this.visualizer.minValue, this.visualizer.maxValue, this.visualizer.size);
        this.visualizer.render(false);
    }
}

SortingApp.init();
