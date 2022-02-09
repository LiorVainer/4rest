import axios from "axios";
import { User, UserWithId } from "examples/UserService/types";
import arpeggios, { Arpeggios, ArpeggiosService } from "../../../index";

export let arpeggiosInstance: Arpeggios;
export let userService: ArpeggiosService<UserWithId, User, number>;

beforeAll(() => {
  arpeggiosInstance = arpeggios.create({ axios });
  userService = arpeggiosInstance.createService<UserWithId, User, number>(
    "user"
  );
});

test("Arrpegios Instance Defined", () => {
  expect(arpeggiosInstance).toBeDefined();
});

test("Arpeggios Service Defined", () => {
  expect(userService).toBeDefined();
});
