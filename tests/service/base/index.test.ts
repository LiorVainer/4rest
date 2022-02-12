import axios from "axios";

import { User, UserWithId } from "../../../examples/UserService/types";
import arpeggios, { ArpeggiosInstance, ArpeggiosService } from "../../../src";

export let arpeggiosInstance: ArpeggiosInstance;
export let userService: ArpeggiosService<UserWithId, User, number>;

beforeAll(() => {
  arpeggiosInstance = arpeggios.create({ axios });
  userService = arpeggiosInstance.createService<UserWithId, User, number>("user");
});

describe("Arrpegios Classes", () => {
  test("Arrpegios Instance Defined", () => {
    expect(arpeggiosInstance).toBeDefined();
  });

  test("Arpeggios Service Defined", () => {
    expect(userService).toBeDefined();
  });
});
