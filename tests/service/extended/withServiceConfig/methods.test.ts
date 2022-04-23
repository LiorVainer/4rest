import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { UserWithId } from "../../../types/user";

import { Authorization, userService } from "./index.test";

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
    mock.onGet("user").reply((config) => {
      expect(config.headers?.Authorization).toEqual(Authorization);

      return [200, responseDataUsersData];
    });

    const response = await userService.getAll();
    expect("id" in response).toBeFalsy();
    expect("length" in response).toBeTruthy();
  });

  test("getByName", async () => {
    const usersData: UserWithId[] = [
      { _id: 1, name: "John Smith", email: "john.smith@gmail.com" },
      { _id: 2, name: "Jane Doe", email: "jane.doe@gmail.com" },
    ];

    const name = "John Smith";
    const matchUser = { _id: 1, name: "John Smith", email: "john.smith@gmail.com" };
    mock.onGet(`user/name/${name}`).reply((config) => {
      expect(config.headers?.Authorization).toEqual(Authorization);
      return [200, usersData.find((user) => user.name === name)];
    });

    const response = await userService.getByName("John Smith");

    expect(response).toEqual(matchUser);
  });

  test("getByNameWithQuery", async () => {
    const usersData: UserWithId[] = [
      { _id: 1, name: "John Smith", email: "john.smith@gmail.com" },
      { _id: 2, name: "Jane Doe", email: "jane.doe@gmail.com" },
    ];

    const name = "John Smith";
    const matchUser = { _id: 1, name: "John Smith", email: "john.smith@gmail.com" };

    mock.onGet(`user/name`).reply((config) => {
      expect(config.headers?.Authorization).toEqual(Authorization);
      console.log("config.params", config.params.name);

      return [200, usersData.find((user) => user.name === config.params.name)];
    });

    const response = await userService.getByNameWithQuery(name);

    expect(response).toEqual(matchUser);
  });

  test("isEmailTaken", async () => {
    const usersData: UserWithId[] = [
      { _id: 1, name: "John Smith", email: "john.smith@gmail.com" },
      { _id: 2, name: "Jane Doe", email: "jane.doe@gmail.com" },
    ];

    const trueEmail = "john.smith@gmail.com";
    const falseEmail = "liorvainer@gmail.com";

    mock.onGet(`user/email/taken/${trueEmail}`).reply((config) => {
      expect(config.headers?.Authorization).toEqual(Authorization);
      return [200, usersData.find((user) => user.email === trueEmail) ? true : false];
    });

    mock.onGet(`user/email/taken/${falseEmail}`).reply((config) => {
      expect(config.headers?.Authorization).toEqual(Authorization);
      return [200, usersData.find((user) => user.email === falseEmail) ? true : false];
    });

    const isEmailTakenTrue = await userService.isEmailTaken(trueEmail);
    const isEmailTakenFalse = await userService.isEmailTaken(falseEmail);

    expect(isEmailTakenTrue).toBeTruthy();
    expect(isEmailTakenFalse).toBeFalsy();
  });
});
