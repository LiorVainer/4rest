import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { userService } from "../base/index.test";

describe("HTTP DELETE Method ", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("deleteAll", async () => {
    const usersData = [{ id: 1, name: "John Smith" }];
    mock.onDelete("user").reply(200, usersData);

    const response = await userService.deleteAll();
    expect(response.data).toEqual(usersData);
  });

  test("deleteById", async () => {
    const firstUser = { id: 1, name: "John Smith" };
    const secondUser = { id: 2, name: "Jane Doe" };

    mock.onDelete("user/1").reply(200, firstUser);
    mock.onDelete("user/2").reply(200, secondUser);

    const response = await userService.deleteById(1);

    expect(response.data).toEqual(firstUser);
  });
});
