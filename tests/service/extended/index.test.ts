import axios from "axios";

import cachios from "cachios";

import { User, UserWithId } from "../../types/user";
import prest, { PrestInstance, PrestService, ServiceConfig } from "../../../src";

export const prestInstance: PrestInstance = prest.create(cachios.create(axios));
export let userService: UserService;

export class UserService extends PrestService<UserWithId, User> {
  constructor(config?: ServiceConfig) {
    super("user", prestInstance, config);
  }

  public getByName = this.methods.getByParam<UserWithId, string>("name");
  public isEmailTaken = this.methods.getByParam<boolean, string>(["email", "taken"]);
}

beforeAll(() => {
  userService = new UserService();
});

describe("Prest Classes", () => {
  test("Prest Instance Defined", () => {
    expect(prestInstance).toBeDefined();
  });

  test("Prest Service Defined", () => {
    expect(userService).toBeDefined();
  });
});
