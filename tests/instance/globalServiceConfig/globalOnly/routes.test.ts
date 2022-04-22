import axios from "axios";

import { User, UserWithId } from "../../../types/user";
import forest, { ForestInstance, ForestService } from "../../../../src";
import MockAdapter from "axios-mock-adapter";

export let forestInstance: ForestInstance;
export let userService: ForestService<UserWithId, User, number>;

beforeAll(() => {
  forestInstance = forest.create({
    globalServiceConfig: {
      routes: { getAll: ["get", "all"], post: "create", deleteAll: "reset" },
    },
  });
  userService = forestInstance.createService<UserWithId, User, number>("user");
});

describe("Forest Classes", () => {
  test("Forest Instance Defined", () => {
    expect(forestInstance).toBeDefined();
  });

  test("Forest Service Defined", () => {
    expect(userService).toBeDefined();
  });
});

describe("Custom Routes Methods ", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("getAll custom route", async () => {
    mock.onGet("user/get/all").reply(200);

    const response = await userService.getAll();

    expect(response.status).toEqual(200);
  });

  test("post custom route", async () => {
    const newUser: User = { name: "John Smith", email: "john.smith@gmail.com" };
    mock.onPost("user/create").reply(200);

    const response = await userService.post(newUser);

    expect(response.status).toEqual(200);
  });

  test("deleteAll custom route", async () => {
    mock.onDelete("user/reset").reply(200);

    const response = await userService.deleteAll();

    expect(response.status).toEqual(200);
  });
});
