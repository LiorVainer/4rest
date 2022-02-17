import axios from "axios";

import MockAdapter from "axios-mock-adapter";

import { User, UserWithId } from "../../types/user";
import arpeggios, { ArpeggiosInstance, ArpeggiosService } from "../../../src";

export let arpeggiosInstance: ArpeggiosInstance;
export let userService: ArpeggiosService<UserWithId, User, number>;

beforeAll(() => {
  arpeggiosInstance = arpeggios.create(axios);
  userService = arpeggiosInstance.createService<UserWithId, User, number>("user", {
    payloadKey: "update",
    payloadKeyByMethod: { post: "data" },
  });
});


describe("Arrpegios Classes", () => {
  test("Arrpegios Instance Defined", () => {
    expect(arpeggiosInstance).toBeDefined();
  });

  test("Arpeggios Service Defined", () => {
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
