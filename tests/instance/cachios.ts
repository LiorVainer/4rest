import axios from "axios";

import forest, { ForestInstance } from "../../src";

export const forestInstance: ForestInstance = forest.create(axios);

test("Forest Instance Defined", () => {
  expect(forestInstance).toBeDefined();
});
