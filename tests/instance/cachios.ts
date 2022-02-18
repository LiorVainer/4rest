import axios from "axios";
import cachios from "cachios";

import restigo, { RestigoInstance } from "../../src";

export const restigoInstance: RestigoInstance = restigo.create(cachios.create(axios));

test("Restigo Instance Defined", () => {
  expect(restigoInstance).toBeDefined();
});
