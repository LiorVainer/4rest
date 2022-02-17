import axios from "axios";
import cachios from "cachios";

import prest, { PrestInstance } from "../../src";

export const prestInstance: PrestInstance = prest.create(cachios.create(axios));

test("Prest Instance Defined", () => {
  expect(prestInstance).toBeDefined();
});
