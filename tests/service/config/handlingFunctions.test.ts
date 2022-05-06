import axios from "axios";

import MockAdapter from "axios-mock-adapter";

import { User, UserWithId } from "../../types/user";
import forest, { ForestInstance, ForestService } from "../../../src";

export let forestInstance: ForestInstance;
export let userService: ForestService<UserWithId, User, number>;

beforeAll(() => {
  forestInstance = forest.create();
  userService = forestInstance.createService<UserWithId, User, number>("user", {
    onError: (error) => {
      return { error, msg: "error" };
    },
    onErrorByMethod: {
      getById: (error) => {
        return { error, msg: "errorByMethod" };
      },
    },
    onSuccess: (response) => response.data,
    onSuccessByMethod: {
      getById: (response) => response.status,
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

    expect(response).toEqual(usersData);
  });

  test("onSuccessByMethod Handle", async () => {
    const userData = { id: 1, name: "John Smith" };
    mock.onGet("user/1").reply(200, userData);
    const response = await userService.getById(1);

    expect(response).toEqual(200);
  });

  test("onError Handle", async () => {
    mock.onGet("user").reply(500);
    const response: any = await userService.getAll();

    expect(response.error instanceof Error).toEqual(true);
    expect(response.msg).toEqual("error");
  });

  test("onErrorByMethod Handle", async () => {
    mock.onGet("user/1").reply(500);
    const response: any = await userService.getById(1);

    expect(response.error instanceof Error).toEqual(true);
    expect(response.msg).toEqual("errorByMethod");
  });
});
