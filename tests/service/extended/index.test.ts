import axios from "axios";

import cachios from "cachios";

import { User, UserWithId } from "../../types/user";
import restigo, { RestigoInstance, RestigoService, ServiceConfig } from "../../../src";

export const restigoInstance: RestigoInstance = restigo.create(cachios.create(axios));
export let userService: UserService;

export class UserService extends RestigoService<UserWithId, User> {
  constructor(config?: ServiceConfig) {
    super("user", restigoInstance, config);
  }

  public getByName = this.methods.getByParam<UserWithId, string>("name");
  public isEmailTaken = this.methods.getByParam<boolean, string>(["email", "taken"]);
}

beforeAll(() => {
  userService = new UserService();
});

describe("Restigo Classes", () => {
  test("Restigo Instance Defined", () => {
    expect(restigoInstance).toBeDefined();
  });

  test("Restigo Service Defined", () => {
    expect(userService).toBeDefined();
  });
});
