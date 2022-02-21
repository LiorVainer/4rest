import axios from "axios";
import cachios from "cachios";

import forest, { ForestInstance } from "../../src";

export const forestInstance: ForestInstance = forest.create(
  cachios.create(axios)
);

test("Forest Instance Defined", () => {
  expect(forestInstance).toBeDefined();
});
