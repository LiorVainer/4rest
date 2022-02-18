import restigo, { RestigoInstance } from "../../src";

export const restigoInstance: RestigoInstance = restigo.create({ headers: { "X-Custom-Header": "Custom Value" } });

test("Restigo Instance Defined", () => {
  expect(restigoInstance).toBeDefined();
});
