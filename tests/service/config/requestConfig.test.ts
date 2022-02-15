import axios from "axios";

import MockAdapter from "axios-mock-adapter";

import { User, UserWithId } from "../../types/user";
import arpeggios, { ArpeggiosInstance, ArpeggiosService } from "../../../src";

export let arpeggiosInstance: ArpeggiosInstance;
export let userService: ArpeggiosService<UserWithId, User, number>;

beforeAll(() => {
  arpeggiosInstance = arpeggios.create({ axios });
  userService = arpeggiosInstance.createService<UserWithId, User, number>("user", {
    requestConfigByMethod: { getAll: { params: { page: 1, size: 10 } }, getById: { maxRedirects: 3 } },
    requestConfig: { headers: { Authentication: "Bearer Header" } },
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

describe("Custom Requests Config ", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("getAll", async () => {
    mock.onGet("user").reply((config) => {
      expect(config.headers).toEqual({ Accept: "application/json, text/plain, */*" });

      expect(config.params).toEqual({ page: 1, size: 10 });

      return [200];
    });

    const response = await userService.getAll();

    expect(response.status).toEqual(200);
  });

  test("getById", async () => {
    mock.onGet("user/36").reply((config) => {
      expect(config.headers).toEqual({ Accept: "application/json, text/plain, */*" });
      expect(config.maxRedirects).toEqual(3);

      return [200];
    });

    const response = await userService.getById(36);

    expect(response.status).toEqual(200);
  });

  test("Rest Methods", async () => {
    mock.onDelete("user").reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers.Authentication).toEqual("Bearer Header");
      return [200];
    });

    mock.onDelete("user/3").reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers.Authentication).toEqual("Bearer Header");
      return [200];
    });

    mock.onPost("user").reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers.Authentication).toEqual("Bearer Header");
      return [200];
    });

    mock.onPatch("user").reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers.Authentication).toEqual("Bearer Header");
      return [200];
    });

    mock.onPut("user").reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers.Authentication).toEqual("Bearer Header");
      return [200];
    });

    await userService.deleteAll();
    await userService.deleteById(3);
    await userService.put({} as User);
    await userService.post({} as User);
    await userService.patch({} as User);
  });
});
