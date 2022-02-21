import forest, { ForestInstance } from "../../src";

export const forestInstance: ForestInstance = forest.create({
  headers: { "X-Custom-Header": "Custom Value" },
});

test("Forest Instance Defined", () => {
  expect(forestInstance).toBeDefined();
});
