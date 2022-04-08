import axios from "axios";

import MockAdapter from "axios-mock-adapter";

import { User, UserWithId } from "../../types/user";
import forest, { ForestInstance, ForestService } from "../../../src";

export let forestInstance: ForestInstance;
export let userService: ForestService<UserWithId, User, number>;

beforeAll(() => {
  forestInstance = forest.create(axios);
  userService = forestInstance.createService<UserWithId, User, number>("user", {
    requestConfigByMethod: {
      getAll: { params: { page: 1, size: 10 } },
      getById: { maxRedirects: 3 },
    },
    requestConfig: { headers: { Authentication: "Bearer Header" } },
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
      expect(config.headers).toEqual({
        Accept: "application/json, text/plain, */*",
      });

      expect(config.params).toEqual({ page: 1, size: 10 });

      return [200];
    });

    const response = await userService.getAll();

    expect(response.status).toEqual(200);
  });

  test("getById", async () => {
    mock.onGet("user/36").reply((config) => {
      expect(config.headers).toEqual({
        Accept: "application/json, text/plain, */*",
      });
      expect(config.maxRedirects).toEqual(3);

      return [200];
    });

    const response = await userService.getById(36);

    expect(response.status).toEqual(200);
  });

  test("Rest Methods", async () => {
    const id = 1;
    mock.onDelete("user").reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers?.Authentication).toEqual("Bearer Header");
      return [200];
    });

    mock.onDelete(`user/${id}`).reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers?.Authentication).toEqual("Bearer Header");
      return [200];
    });

    mock.onPost("user").reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers?.Authentication).toEqual("Bearer Header");
      return [200];
    });

    mock.onPatch(`user/${id}`).reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers?.Authentication).toEqual("Bearer Header");
      return [200];
    });

    mock.onPut(`user/${id}`).reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers?.Authentication).toEqual("Bearer Header");
      return [200];
    });

    const methodsPromises = [];
    methodsPromises.push(userService.deleteAll());
    methodsPromises.push(await userService.deleteById(id));
    methodsPromises.push(await userService.post({} as User));
    methodsPromises.push(await userService.put(id, {} as User));
    methodsPromises.push(await userService.patch(id, {} as User));

    const res = await Promise.all(methodsPromises);

    expect(res.map((res) => res.status)).toEqual([200, 200, 200, 200, 200]);
  });
});
