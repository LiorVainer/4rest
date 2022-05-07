import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { UserWithId } from "../../../types/user";

import { userService } from "./index.test";
import { ZodError } from "zod";

describe("Custom Service Method ", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("getAll onSuccess", async () => {
    const responseDataUsersData: string[] = ["John Smith", "Jane Doe"];
    mock.onGet("user").reply(200, responseDataUsersData);

    const response = await userService.getAll();
    expect(response).toBe(200);
  });

  test("getAll onError", async () => {
    mock.onGet("user").reply(500);
    const response: any = await userService.getAll();

    expect(response.error instanceof Error).toEqual(true);
    expect(response.msg).toEqual("error");
  });

  test("getByName onSuccess", async () => {
    const usersData: UserWithId[] = [
      { _id: 1, name: "John Smith", email: "john.smith@gmail.com" },
      { _id: 2, name: "Jane Doe", email: "jane.doe@gmail.com" },
    ];

    const name = "John Smith";
    const matchUser = { _id: 1, name: "John Smith", email: "john.smith@gmail.com" };
    mock.onGet(`user/${name}/name`).reply(
      200,
      usersData.find((user) => user.name === name)
    );

    const response = await userService.getByName(name);

    expect(response).toEqual(matchUser);
  });

  test("getByName onError", async () => {
    const name = "John Smith";

    mock.onGet(`user/${name}/name`).reply(500);
    const response: any = await userService.getByName(name);

    expect(response.error instanceof Error).toEqual(true);
    expect(response.msg).toEqual("custom");
  });
});
