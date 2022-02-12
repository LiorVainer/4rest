import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { userService } from "../base/index.test";

describe("HTTP PUT Method", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("put", async () => {
    const userPutData = { name: "John Smith" };

    mock.onPut("user").reply((request) => {
      expect(JSON.parse(request.data)).toEqual(userPutData);
      return [200];
    });

    await userService.put(userPutData);
  });
});
