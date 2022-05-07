import { User, UserSchema, UserWithId, UserWithIdSchema } from "../../../types/user";
import forest, { ForestInstance, ForestService, ForestServiceConfig } from "../../../../src";

export const forestInstance: ForestInstance = forest.create();
export let userService: UserService;

export class UserService extends ForestService<UserWithId, User> {
  constructor() {
    super("user", forestInstance);
  }

  public getByName = (name: string) =>
    this.methodsCreator.getByParam<UserWithId, string>({
      suffix: "name",
      validation: { resoponseData: UserWithIdSchema },
    })(name);
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
