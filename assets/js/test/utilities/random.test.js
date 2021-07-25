import { Random } from "../../utilities/random.js";

test("Should give you a random number between 1 to 10", () => {
    const randomValue = Random.getRandomNumber(1, 10);

    expect(randomValue).toBeGreaterThanOrEqual(1);
    expect(randomValue).toBeLessThanOrEqual(10);
});