import forest, { ForestInstance } from "../../src";

export const forestInstance: ForestInstance = forest.create({
  headers: { "X-Custom-Header": "Custom Value" },
  baseURL: "http://localhost:5000",
});

test("Forest Instance Defined", () => {
  expect(forestInstance).toBeDefined();
});

test("Axios Instance Defined", () => {
  expect(forestInstance.axiosInstance).toBeDefined();
  expect(forestInstance.axiosInstance.get).toBeDefined();
  expect(forestInstance.axiosInstance.defaults.baseURL).toBeDefined();
  expect(forestInstance.axiosInstance.defaults.headers).toBeDefined();
});
