import { User, UserWithIdSchema, UserWithId, UserSchema } from "../../../types/user";
import forest, { ForestInstance, ForestService } from "../../../../src";

export let forestInstance: ForestInstance;
export let userService: ForestService<UserWithId, User, number>;

beforeAll(() => {
  forestInstance = forest.create();
  userService = forestInstance.createService<UserWithId, User, number>("user", {
    validation: {
      onMethods: {
        post: { types: { requestPayload: UserSchema, resoponseData: UserWithIdSchema } },
        getById: { types: { resoponseData: UserSchema.strict() } },
      },
      types: { resoponseData: UserWithIdSchema },
    },
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
