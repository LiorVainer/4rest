import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { userService } from "../base/index.test";
import { User } from "../../types/user";

describe("HTTP PUT Method", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("put", async () => {
    const id = 1;
    const userPutData: Partial<User> = { name: "John Smith", email: "john.smith@gmail.com" };

    mock.onPut(`user/${id}`).reply((request) => {
      expect(JSON.parse(request.data)).toEqual(userPutData);
      return [200];
    });

    const response = await userService.put(id, userPutData);

    expect(response.status).toBe(200);
  });
});
