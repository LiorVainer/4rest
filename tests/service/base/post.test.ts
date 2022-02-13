import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { userService } from "../base/index.test";
import { User } from "../../types/user";

describe("HTTP POST Method", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("post", async () => {
    const userPostData: User = { name: "John Smith", email: "john.smith@gmail.com" };

    mock.onPost("user").reply((request) => {
      expect(JSON.parse(request.data)).toEqual(userPostData);
      return [200];
    });

    await userService.post(userPostData);
  });
});
