import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { UserWithId } from "../../../types/user";

import { userService } from "./index.test";

export const requestInterceptor = axios.interceptors.request.use((request) => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

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

    const response = await userService.getAll();
    expect("id" in response.data).toBeFalsy();
    expect("length" in response.data).toBeTruthy();
  });

  test("getByName", async () => {
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

    const response = await userService.getByName("John Smith");

    expect(response.data).toEqual(matchUser);
  });

  test("getByNameWithQuery", async () => {
    const usersData: UserWithId[] = [
      { _id: 1, name: "John Smith", email: "john.smith@gmail.com" },
      { _id: 2, name: "Jane Doe", email: "jane.doe@gmail.com" },
    ];

    const name = "John Smith";
    const matchUser = { _id: 1, name: "John Smith", email: "john.smith@gmail.com" };

    mock.onGet(`user/name`).reply((config) => {
      return [200, usersData.find((user) => user.name === config.params.name)];
    });

    const response = await userService.getByNameWithQuery(name);

    expect(response.data).toEqual(matchUser);
  });

  test("isEmailTaken", async () => {
    const usersData: UserWithId[] = [
      { _id: 1, name: "John Smith", email: "john.smith@gmail.com" },
      { _id: 2, name: "Jane Doe", email: "jane.doe@gmail.com" },
    ];

    const trueEmail = "john.smith@gmail.com";
    const falseEmail = "liorvainer@gmail.com";

    mock
      .onGet(`user/email/taken/${trueEmail}`)
      .reply(200, usersData.find((user) => user.email === trueEmail) ? true : false);
    mock
      .onGet(`user/email/taken/${falseEmail}`)
      .reply(200, usersData.find((user) => user.email === falseEmail) ? true : false);

    const isEmailTakenTrue = await userService.isEmailTaken(trueEmail);
    const isEmailTakenFalse = await userService.isEmailTaken(falseEmail);

    expect(isEmailTakenTrue.data).toBeTruthy();
    expect(isEmailTakenFalse.data).toBeFalsy();
  });
});
