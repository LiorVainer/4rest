import axios from "axios";

import { User, UserWithId } from "../../types/user";
import restigo, { RestigoInstance, RestigoService } from "../../../src";
import MockAdapter from "axios-mock-adapter";

export let restigoInstance: RestigoInstance;
export let userService: RestigoService<UserWithId, User, number>;

beforeAll(() => {
  restigoInstance = restigo.create(axios);
  userService = restigoInstance.createService<UserWithId, User, number>("user", {
    routes: { getAll: ["get", "all"], post: "create", deleteAll: "reset" },
  });
});

describe("Restigo Classes", () => {
  test("Restigo Instance Defined", () => {
    expect(restigoInstance).toBeDefined();
  });

  test("Restigo Service Defined", () => {
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
