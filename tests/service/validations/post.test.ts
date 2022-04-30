import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { User, UserWithId } from "../../types/user";
import { userService } from "./index.test";
import { ZodError } from "zod";

describe("HTTP POST Method", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("post valid", async () => {
    const userPostData: User = { name: "John Smith", email: "john.smith@gmail.com" };
    const createdUser: UserWithId = { _id: 10, name: "John Smith", email: "john.smith@gmail.com" };

    mock.onPost("user").reply((request) => {
      expect(JSON.parse(request.data)).toEqual(userPostData);
      return [200, createdUser];
    });

    const response = await userService.post(userPostData);

    expect(response.status).toBe(200);
  });

  test("post not valid payload", async () => {
    const userPostData = { email: "john.smith@gmail.com" };
    const createdUser = { _id: 10, name: "John Smith", email: "john.smith@gmail.com" };

    mock.onPost("user").reply(() => {
      return [200, createdUser];
    });

    try {
      await userService.post(userPostData);
    } catch (err) {
      expect(err instanceof ZodError).toBeTruthy();
    }
  });

  test("post not valid response", async () => {
    const userPostData = { name: "John Smith", email: "john.smith@gmail.com" };
    const createdUser = { name: "John Smith", email: "john.smith@gmail.com" };

    mock.onPost("user").reply(() => {
      return [200, createdUser];
    });

    try {
      await userService.post(userPostData);
    } catch (err) {
      expect(err instanceof ZodError).toBeTruthy();
    }
  });
});
