import axios from "axios";

import forest, { ForestInstance } from "../../src";

const forestInstance: ForestInstance = forest.create(axios);

test("Forest Instance Defined", () => {
  expect(forestInstance).toBeDefined();
});
