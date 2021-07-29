import { SortingVisualizer } from "../components/visualizers/sorting-visualizer.js";
import { Sidebar } from "../components/sidebar.js";
import { Generator } from "../utilities/generator.js";
import { Loader } from "../components/loader.js";

export class SortingApp {

    constructor() {
        this.loader = new Loader();
        this.visualizer = new SortingVisualizer();
        new Sidebar(this.visualizer);

        this.loadVisualizer();
        this.loader.load();
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
