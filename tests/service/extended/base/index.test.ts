import axios from "axios";

import { User, UserWithId } from "../../../types/user";
import forest, { ForestInstance, ForestService, ForestServiceConfig } from "../../../../src";

export const requestInterceptor = axios.interceptors.request.use((request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

export const forestInstance: ForestInstance = forest.create();
export let userService: UserService;

export class UserService extends ForestService<UserWithId, User> {
  constructor(config?: ForestServiceConfig) {
    super("user", forestInstance, config);
  }

  public getByName = (name: string) => this.methods.getByParam<UserWithId, string>("name")(name);
  public getByNameWithQuery = (name: string) => this.methods.get<UserWithId>("name", { params: { name } })();
  public isEmailTaken = (email: string) => this.methods.getByParam<boolean, string>(["email", "taken"])(email);
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
