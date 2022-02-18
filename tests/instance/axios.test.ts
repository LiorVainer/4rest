import axios from "axios";

import restigo, { RestigoInstance } from "../../src";

const restigoInstance: RestigoInstance = restigo.create(axios);

test("Restigo Instance Defined", () => {
  expect(restigoInstance).toBeDefined();
});
