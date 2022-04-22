import axios from "axios";
import forest, { ForestInstance } from "../../../src";

describe("Axios Instance Forest Creation", () => {
  const forestInstance: ForestInstance = forest.create({
    axiosSettings: axios.create(),
  });

  test("Forest Instance Defined", () => {
    expect(forestInstance).toBeDefined();
  });

  test("Axios Instance Defined", () => {
    expect(forestInstance.axiosInstance).toBeDefined();
    expect(forestInstance.axiosInstance.get).toBeDefined();
  });
});
