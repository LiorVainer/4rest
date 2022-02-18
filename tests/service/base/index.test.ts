import axios from "axios";

import { User, UserWithId } from "../../types/user";
import restigo, { RestigoInstance, RestigoService } from "../../../src";

export let restigoInstance: RestigoInstance;
export let userService: RestigoService<UserWithId, User, number>;

beforeAll(() => {
  restigoInstance = restigo.create(axios);
  userService = restigoInstance.createService<UserWithId, User, number>("user");
});

describe("Restigo Classes", () => {
  test("Restigo Instance Defined", () => {
    expect(restigoInstance).toBeDefined();
  });

  test("Restigo Service Defined", () => {
    expect(userService).toBeDefined();
  });
});
