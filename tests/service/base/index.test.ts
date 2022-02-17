import axios from "axios";

import { User, UserWithId } from "../../types/user";
import prest, { PrestInstance, PrestService } from "../../../src";

export let prestInstance: PrestInstance;
export let userService: PrestService<UserWithId, User, number>;

beforeAll(() => {
  prestInstance = prest.create(axios);
  userService = prestInstance.createService<UserWithId, User, number>("user");
});

describe("Prest Classes", () => {
  test("Prest Instance Defined", () => {
    expect(prestInstance).toBeDefined();
  });

  test("Prest Service Defined", () => {
    expect(userService).toBeDefined();
  });
});
