import { Visualizer } from "../../components/visualizers/visualizer";
import { Animator } from "../../animators/animator";
import { Animation } from "../../animators/animation";
import { action } from "../../animators/animation-action";

// Mock class behaviors
jest.mock("../../components/visualizers/visualizer");
const visualizer = new Visualizer();

beforeEach(() => {
    Visualizer.mockClear();
});

describe("Animator Class", () => {
    describe("Initialization", () => {
        test("should initialize with empty animations array", () => {
            const animator = new Animator(visualizer, 50);
            expect(animator.animations.length).toBe(0);
        });

        test("should throw error when an invalid visualizer is being input", () => {
            expect(() => {
                new Animator(null, 50);
            }).toThrow(new Error("Invalid visualizer."));
        });
    });

    describe("Function calls", () => {
        test("should reset animations", () => {
            const animator = new Animator(visualizer, 50);
            animator.animations = [
                new Animation(action.SEARCH, [0]),
                new Animation(action.SEARCH, [1]),
            ];

            animator.resetAnimations();

            expect(animator.animations.length).toBe(0);
        });

        test("should throw an error if added animation is not valid", () => {
            const animator = new Animator(visualizer, 50);

            expect(() => {
                animator.addAnimation(null);
            }).toThrow(new Error("Invalid animation."));
        });

        test("should throw an error if added animation is not an instance of Animation", () => {
            const animator = new Animator(visualizer, 50);
            const animation = {
                swapper: action.SWAP,
                indexes: [0, 1]
            };

            expect(() => {
                animator.addAnimation(animation);
            }).toThrow(new Error("Added animation is not an instance of Animation class."));
        });

        test("should add animation", () => {
            const animator = new Animator(visualizer, 50);
            const animation = new Animation(action.SWAP, [0, 1]);

            animator.addAnimation(animation);

            expect(animator.animations.length).toBe(1);
            expect(animator.animations[0].action).toBe(action.SWAP);
            expect(animator.animations[0].indexes[0]).toBe(0);
            expect(animator.animations[0].indexes[1]).toBe(1);
        });
    });
});
