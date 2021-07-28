import { Sidebar } from "../../components/sidebar";
import { Visualizer } from "../../components/visualizers/visualizer";

// Mock class behaviors
jest.mock("../../components/visualizers/visualizer");
const visualizer = new Visualizer();

beforeEach(() => {
    Visualizer.mockClear();
});

describe("Sidebar Class", () => {
    describe("Initialization", () => {
        test("should throw an error if visualizer is not initialized", () => {
            expect(() => {
                new Sidebar(null);
            }).toThrow(new Error("Visualizer is not initialized."));
        });

        test("should not throw an error if visualizer is initialized", () => {
            expect(() => {
                new Sidebar(visualizer);
            }).not.toThrow(new Error("Visualizer is not initialized."));
        });
    });
});
