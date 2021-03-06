import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { userService } from "../base/index.test";
import { User } from "../../types/user";

describe("HTTP PATCH Method", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("patch", async () => {
    const userPatchData: Partial<User> = { name: "John Smith" };

    mock.onPatch("user").reply((request) => {
      expect(JSON.parse(request.data)).toEqual(userPatchData);
      return [200];
    });

    const response = await userService.patch(userPatchData);

    expect(response.status).toBe(200);
  });

  test("patchById", async () => {
    const id = 1;
    const userPatchData: Partial<User> = { name: "John Smith" };

    mock.onPatch(`user/${id}`).reply((request) => {
      expect(JSON.parse(request.data)).toEqual(userPatchData);
      return [200];
    });

    const response = await userService.patchById(id, userPatchData);

    expect(response.status).toBe(200);
  });
});
