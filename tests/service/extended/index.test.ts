import axios from "axios";

import { User, UserWithId } from "../../types/user";
import arpeggios, { ArpeggiosInstance, ArpeggiosService, Service, ServiceConfig } from "../../../src";

export const arpeggiosInstance: ArpeggiosInstance = arpeggios.create(axios);
export let userService: UserService;

@Service(arpeggiosInstance, "user")
export class UserService extends ArpeggiosService<UserWithId, User> {
  constructor(config?: ServiceConfig) {
    super("user", arpeggiosInstance, config);
  }

  public getByName = this.methods.getByParam<UserWithId, string>("name");
  public isEmailTaken = this.methods.getByParam<boolean, string>(["email", "taken"]);
}

beforeAll(() => {
  userService = new UserService();
});

describe("Arrpegios Classes", () => {
  test("Arrpegios Instance Defined", () => {
    expect(arpeggiosInstance).toBeDefined();
  });

  test("Arpeggios Service Defined", () => {
    expect(userService).toBeDefined();
  });
});
