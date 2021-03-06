import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import forest, { ForestInstance, ForestService } from "../../../../src";
import { User, UserWithId } from "../../../types/user";

export let forestInstance: ForestInstance;
export let userService: ForestService<UserWithId, User, number>;

beforeAll(() => {
  forestInstance = forest.create({
    globalServiceConfig: {
      payloadKey: "update",
      payloadKeyByMethod: { post: "data" },
    },
  });
  userService = forestInstance.createService<UserWithId, User, number>("user", {
    payloadKey: "serviceUpdate",
    payloadKeyByMethod: { post: "serviceData" },
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
      expect(JSON.parse(config.data)).toEqual({ serviceData: {} });

      return [200];
    });

    const response = await userService.post({} as User);

    expect(response.status).toEqual(200);
  });

  test("patch", async () => {
    mock.onPatch("user").reply((config) => {
      expect(JSON.parse(config.data)).toEqual({ serviceUpdate: {} });

      return [200];
    });

    const response = await userService.patch({} as User);

    expect(response.status).toEqual(200);
  });

  test("patchById", async () => {
    const id = 1;

    mock.onPatch(`user/${id}`).reply((config) => {
      expect(JSON.parse(config.data)).toEqual({ serviceUpdate: {} });

      return [200];
    });

    const response = await userService.patchById(id, {} as User);

    expect(response.status).toEqual(200);
  });

  test("put", async () => {
    mock.onPut("user").reply((config) => {
      expect(JSON.parse(config.data)).toEqual({ serviceUpdate: {} });

      return [200];
    });

    const response = await userService.put({} as User);

    expect(response.status).toEqual(200);
  });

  test("putById", async () => {
    const id = 1;

    mock.onPut(`user/${id}`).reply((config) => {
      expect(JSON.parse(config.data)).toEqual({ serviceUpdate: {} });

      return [200];
    });

    const response = await userService.putById(id, {} as User);

    expect(response.status).toEqual(200);
  });
});
