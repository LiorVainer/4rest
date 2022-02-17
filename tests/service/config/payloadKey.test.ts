import axios from "axios";

import MockAdapter from "axios-mock-adapter";

import { User, UserWithId } from "../../types/user";
import prest, { PrestInstance, PrestService } from "../../../src";

export let prestInstance: PrestInstance;
export let userService: PrestService<UserWithId, User, number>;

beforeAll(() => {
  prestInstance = prest.create(axios);
  userService = prestInstance.createService<UserWithId, User, number>("user", {
    payloadKey: "update",
    payloadKeyByMethod: { post: "data" },
  });
});

describe("Prest Classes", () => {
  test("Prest Instance Defined", () => {
    expect(prestInstance).toBeDefined();
  });

  test("Prest Service Defined", () => {
    expect(userService).toBeDefined();
  });
});

describe("Custom Payload Body Key Config ", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("post", async () => {
    mock.onPost("user").reply((config) => {
      expect(JSON.parse(config.data)).toEqual({ data: {} });

      return [200];
    });

    const response = await userService.post({} as User);

    expect(response.status).toEqual(200);
  });

  test("patch", async () => {
    mock.onPatch("user").reply((config) => {
      expect(JSON.parse(config.data)).toEqual({ update: {} });

      return [200];
    });

    const response = await userService.patch({} as User);

    expect(response.status).toEqual(200);
  });

  test("put", async () => {
    mock.onPut("user").reply((config) => {
      expect(JSON.parse(config.data)).toEqual({ update: {} });

      return [200];
    });

    const response = await userService.put({} as User);

    expect(response.status).toEqual(200);
  });
});
