import axios from "axios";

import { User, UserWithId } from "../../types/user";
import arpeggios, { ArpeggiosInstance, ArpeggiosService, ServiceConfig } from "../../../src";

export let arpeggiosInstance: ArpeggiosInstance;
export let userService: UserService;

export class UserService extends ArpeggiosService<UserWithId, User> {
  constructor(config?: ServiceConfig) {
    super("user", arpeggiosInstance, config);
  }

  public getAll = this.methods.get<UserWithId[]>();
  public getByName = this.methods.getByParam<UserWithId, string>("name");
  public isEmailTaken = this.methods.getByParam<boolean, string>(["email", "taken"]);
}

beforeAll(() => {
  arpeggiosInstance = arpeggios.create({ axios });
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
