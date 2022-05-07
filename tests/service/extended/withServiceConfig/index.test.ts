import axios from "axios";

import { User, UserWithId } from "../../../types/user";
import forest, { ForestInstance, ForestService, ForestServiceConfig } from "../../../../src";

export const forestInstance: ForestInstance = forest.create();
export let userService: UserService;

export class UserService extends ForestService<UserWithId, User> {
  constructor(config?: ForestServiceConfig) {
    super("user", forestInstance, config);
  }

  public getByName = (name: string) => this.methodsCreator.getByParam<UserWithId, string>({ suffix: "name" })(name);
  public getByNameWithQuery = (name: string) =>
    this.methodsCreator.get<UserWithId>({ route: "name", config: { params: { name } } })();
  public isEmailTaken = (email: string) =>
    this.methodsCreator.getByParam<boolean, string>({ route: ["email", "taken"] })(email);
}

export const Authorization = "Bearer 123";

beforeAll(() => {
  userService = new UserService({
    onSuccess: (response) => response.data,
    requestConfig: { headers: { Authorization } },
  });
});

describe("Forest Classes", () => {
  test("Forest Instance Defined", () => {
    expect(forestInstance).toBeDefined();
  });

  test("Forest Service Defined", () => {
    expect(userService).toBeDefined();
  });
});
