import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { userService } from "./index.test";
import { ZodError } from "zod";

describe("HTTP GET Method ", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("getAll valid", async () => {
    const usersData = [{ _id: 1, name: "John Smith" }];
    mock.onGet("user").reply(200, usersData);

    const response = await userService.getAll();
    expect(response.data).toEqual(usersData);
  });

  test("getAll not valid", async () => {
    const usersData = [{ name: "John Smith" }];
    mock.onGet("user").reply(200, usersData);

    try {
      await userService.getAll();
    } catch (err) {
      expect(err instanceof ZodError).toBeTruthy();
    }
  });

  test("getById valid", async () => {
    const firstUser = { name: "John Smith" };
    const secondUser = { name: "Jane Doe" };

    mock.onGet("user/1").reply(200, firstUser);
    mock.onGet("user/2").reply(200, secondUser);

    const response = await userService.getById(1);

    expect(response.data).toEqual(firstUser);
  });

  test("getById not valid", async () => {
    const firstUser = { _id: 1, name: "John Smith" };
    const secondUser = { _id: 2, name: "Jane Doe" };

    mock.onGet("user/1").reply(200, firstUser);
    mock.onGet("user/2").reply(200, secondUser);

    try {
      await userService.getById(1);
    } catch (err) {
      expect(err instanceof ZodError).toBeTruthy();
    }
  });
});
