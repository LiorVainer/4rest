import axios from "axios";

import MockAdapter from "axios-mock-adapter";

import { User, UserWithId } from "../../../types/user";
import forest, { ForestInstance, ForestService } from "../../../../src";

export let forestInstance: ForestInstance;
export let userService: ForestService<UserWithId, User, number>;

beforeAll(() => {
  forestInstance = forest.create({
    globalServiceConfig: {
      requestConfigByMethod: {
        getById: { maxRedirects: 3 },
      },
      requestConfig: { headers: { Authentication: "Bearer Header" } },
    },
  });
  userService = forestInstance.createService<UserWithId, User, number>("user", {
    requestConfigByMethod: {
      getAll: { params: { page: 5, size: 7 } },
    },
    requestConfig: { headers: { Authentication: "No Bearer Header" } },
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

  test("Rest Methods", async () => {
    const id = 1;
    mock.onGet("user/36").reply((config) => {
      expect(config.headers?.Authentication).toEqual("No Bearer Header");
      expect(config.maxRedirects).toEqual(3);

      return [200];
    });
    mock.onGet("user").reply((config) => {
      expect(config.headers?.Authentication).toEqual("No Bearer Header");
      expect(config.params).toEqual({ page: 5, size: 7 });

      return [200];
    });

    mock.onDelete("user").reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers?.Authentication).toEqual("No Bearer Header");
      return [200];
    });

    mock.onDelete(`user/${id}`).reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers?.Authentication).toEqual("No Bearer Header");
      return [200];
    });

    mock.onPost("user").reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers?.Authentication).toEqual("No Bearer Header");
      return [200];
    });

    mock.onPatch(`user`).reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers?.Authentication).toEqual("No Bearer Header");
      return [200];
    });

    mock.onPatch(`user/${id}`).reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers?.Authentication).toEqual("No Bearer Header");
      return [200];
    });

    mock.onPut(`user`).reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers?.Authentication).toEqual("No Bearer Header");
      return [200];
    });

    mock.onPut(`user/${id}`).reply((config) => {
      expect(config.maxRedirects).toEqual(undefined);
      expect(config.headers?.Authentication).toEqual("No Bearer Header");
      return [200];
    });

    const methodsPromises = [];

    methodsPromises.push(userService.getAll());
    methodsPromises.push(userService.getById(36));
    methodsPromises.push(userService.deleteAll());
    methodsPromises.push(userService.deleteById(id));
    methodsPromises.push(userService.post({} as User));
    methodsPromises.push(userService.put({} as User));
    methodsPromises.push(userService.patch({} as User));
    methodsPromises.push(userService.putById(id, {} as User));
    methodsPromises.push(userService.patchById(id, {} as User));

    try {
      const res = await Promise.all(methodsPromises);
      expect(res.map((res) => res.status)).toEqual([200, 200, 200, 200, 200, 200, 200, 200, 200]);
    } catch (e) {
      console.log(e);
    }
  });
});
