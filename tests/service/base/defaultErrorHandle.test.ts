import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { userService } from "./index.test";

describe("Default Error Handle ", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("get", async () => {
    mock.onGet("user").reply(500);

    try {
      await userService.getAll();
    } catch (error) {
      expect(error instanceof Error).toEqual(true);
    }
  });
});
