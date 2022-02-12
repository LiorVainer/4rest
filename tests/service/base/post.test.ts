import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { userService } from "../base/index.test";

axios.interceptors.response.use((response) => {
  console.log("Response:", JSON.stringify(response, null, 2));
  return response;
});

describe("HTTP POST Method", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("post", async () => {
    const userData = { id: 1, name: "John Smith" };

    mock.onPost("user").reply((request) => {
      expect(JSON.parse(request.data)).toEqual(userData);
      return [200];
    });

    await userService.post(userData);
  });
});
