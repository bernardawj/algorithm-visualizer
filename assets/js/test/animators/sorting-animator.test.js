import { SortingVisualizer } from "../../components/visualizers/sorting-visualizer";
import { SortingAnimator } from "../../animators/sorting-animator";
import { Sidebar } from "../../components/sidebar";

jest.mock("../../components/visualizers/sorting-visualizer");
jest.mock("../../components/sidebar");
const visualizer = new SortingVisualizer();
const sidebar = new Sidebar(visualizer);

beforeEach(() => {
    SortingVisualizer.mockClear();
    Sidebar.mockClear();
});

describe("Sorting Animator Class", () => {
    test("should throw an error if sidebar is not initialized when passed into animate function", () => {
        const animator = new SortingAnimator(visualizer);
        expect(() => {
            animator.animate(null);
        }).toThrow(new Error("Sidebar is not initialized."));
    });

    test("should throw an error if sidebar is not an instance of Sidebar when passed into animate function", () => {
        const animator = new SortingAnimator(visualizer);
        expect(() => {
            animator.animate(visualizer);
        }).toThrow(new Error("Sidebar is not initialized."));
    });

    test("should not throw an error if sidebar is an instance of Sidebar when passed into animate function", () => {
       const animator = new SortingAnimator(visualizer);
       expect(() => {
           animator.animate(sidebar);
       }).not.toThrow(new Error("Sidebar is not initialized."));
    });
});
