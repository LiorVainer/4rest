import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { userService } from "./index.test";
import { UserWithId } from "../../types/user";

describe("Custom Service Method ", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("getAll", async () => {
    const responseDataUsersData: string[] = ["John Smith", "Jane Doe"];
    mock.onGet("user").reply(200, responseDataUsersData);

    const usersDataFetched = await userService.getAll();
    expect("id" in usersDataFetched).toBeFalsy();
    expect("length" in usersDataFetched).toBeTruthy();
  });

  test("getByName", async () => {
    const usersData: UserWithId[] = [
      { _id: 1, name: "John Smith", email: "john.smith@gmail.com" },
      { _id: 2, name: "Jane Doe", email: "jane.doe@gmail.com" },
    ];

    const name = "John Smith";
    const matchUser = { _id: 1, name: "John Smith", email: "john.smith@gmail.com" };
    mock.onGet(`user/name/${name}`).reply(
      200,
      usersData.find((user) => user.name === name)
    );

    const userDataFetched = await userService.getByName("John Smith");

    expect(userDataFetched).toEqual(matchUser);
  });

  test("getById", async () => {});
});
