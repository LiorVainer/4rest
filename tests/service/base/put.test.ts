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
    const userPutData: Partial<User> = { name: "John Smith", email: "john.smith@gmail.com" };

    mock.onPut("user").reply((request) => {
      expect(JSON.parse(request.data)).toEqual(userPutData);
      return [200];
    });

    await userService.put(userPutData);
  });
});
