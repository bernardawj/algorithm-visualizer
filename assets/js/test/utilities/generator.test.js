import { Generator } from "../../utilities/generator";

const array = [2, 10, 1, 1, 5, 3];

describe("Generator class", () => {
    describe("generateArray function", () => {
        test("should generate an array values of minimum 10 and maximum 20", () => {
            const replicatedArray = JSON.parse(JSON.stringify(array));
            const min = 10, max = 20;
            Generator.generateArray(replicatedArray, min, max, 10);

            let isValid = true;
            for (let i = 0; i < array.length; i++) {
                if (replicatedArray[i] < 10 || replicatedArray > 20) {
                    isValid = false;
                    break;
                }
            }

            expect(isValid).toBe(true);
        })

        test("should generate an array size of 25", () => {
            const replicatedArray = JSON.parse(JSON.stringify(array));
            const size = 25;
            Generator.generateArray(replicatedArray, 10, 50, size);

            expect(replicatedArray.length).toBe(25);
        });

        test("should generate a new set of numbers in the array when generateArray is called", () => {
            const replicatedArray = JSON.parse(JSON.stringify(array));
            Generator.generateArray(replicatedArray, 10, 50, 6);

            let isSame = true;
            for (let i = 0; i < array.length; i++) {
                if (replicatedArray[i] !== array[i]) {
                    isSame = false;
                    break;
                }
            }

            expect(isSame).toBe(false);
        });
    })
});
