import axios from "axios";

import prest, { PrestInstance } from "../../src";

const prestInstance: PrestInstance = prest.create(axios);

test("Prest Instance Defined", () => {
  expect(prestInstance).toBeDefined();
});
