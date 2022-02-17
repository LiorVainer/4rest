import prest, { PrestInstance } from "../../src";

export const prestInstance: PrestInstance = prest.create({ headers: { "X-Custom-Header": "Custom Value" } });

test("Prest Instance Defined", () => {
  expect(prestInstance).toBeDefined();
});
