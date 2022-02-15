import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { userService } from "../base/index.test";

describe("HTTP GET Method ", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("getAll", async () => {
    const usersData = [{ id: 1, name: "John Smith" }];
    mock.onGet("user").reply(200, usersData);

    const response = await userService.getAll();
    expect(response.data).toEqual(usersData);
  });

  test("getById", async () => {
    const firstUser = { id: 1, name: "John Smith" };
    const secondUser = { id: 2, name: "Jane Doe" };

    mock.onGet("user/1").reply(200, firstUser);
    mock.onGet("user/2").reply(200, secondUser);

    const response = await userService.getById(1);

    expect(response.data).toEqual(firstUser);
  });
});
