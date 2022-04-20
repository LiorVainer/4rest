import axios from "axios";

import forest, { ForestInstance } from "../../src";

const forestInstance: ForestInstance = forest.create(axios);

test("Forest Instance Defined", () => {
  expect(forestInstance).toBeDefined();
});

test("Axios Instance Defined", () => {
  expect(forestInstance.axiosInstance).toBeDefined();
  expect(forestInstance.axiosInstance.get).toBeDefined();
});
