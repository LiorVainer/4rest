import axios from "axios";

import MockAdapter from "axios-mock-adapter";

import { User, UserWithId } from "../../../types/user";
import forest, { ForestInstance, ForestService } from "../../../../src";

export let forestInstance: ForestInstance;
export let userService: ForestService<UserWithId, User, number>;

beforeAll(() => {
  forestInstance = forest.create({
    globalServiceConfig: {
      onError: (error) => {
        return { error, msg: "error" };
      },
      onSuccess: (response) => response.data,
    },
  });
  userService = forestInstance.createService<UserWithId, User, number>("user", {
    onError: (error) => {
      return { error, msg: error.message };
    },
    onSuccess: (response) => response.status,
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

describe("Custom Response and Error Handling", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("onSuccess Handle", async () => {
    const usersData = [{ id: 1, name: "John Smith" }];
    mock.onGet("user").reply(200, usersData);
    const response = await userService.getAll();

    expect(response).toEqual(200);
  });

  test("onError Handle", async () => {
    mock.onGet("user").reply(500);
    const response: any = await userService.getAll();

    expect(response.error instanceof Error).toEqual(true);
    expect(response.msg).toEqual("Request failed with status code 500");
  });
});
