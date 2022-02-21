import axios from "axios";

import cachios from "cachios";

import { User, UserWithId } from "../../types/user";
import forest, {
  ForestInstance,
  ForestService,
  ServiceConfig,
} from "../../../src";
import { ServiceMethodResponse } from "../../../src/types/promise";
import { fallback } from "../../../src/utils/general";

export const forestInstance: ForestInstance = forest.create(
  cachios.create(axios)
);
export let userService: UserService;

export class UserService extends ForestService<UserWithId, User> {
  constructor(config?: ServiceConfig) {
    super("user", forestInstance, config);
  }

  public override getAll<User>(): ServiceMethodResponse<User> {
    return this.methods.get<User>(
      this.config.routes?.getAll,
      fallback(
        this.config.requestConfigByMethod?.getAll,
        this.config.requestConfig
      )
    )();
  }
  public getByName = this.methods.getByParam<UserWithId, string>("name");
  public isEmailTaken = this.methods.getByParam<boolean, string>([
    "email",
    "taken",
  ]);
}

beforeAll(() => {
  userService = new UserService();
});

describe("Forest Classes", () => {
  test("Forest Instance Defined", () => {
    expect(forestInstance).toBeDefined();
  });

  test("Forest Service Defined", () => {
    expect(userService).toBeDefined();
  });
});
