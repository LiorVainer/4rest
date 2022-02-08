import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import arpeggios, { ArpeggiosService } from "../";

import { UserWithId, User } from "examples/UserService/types";

const mock = new MockAdapter(axios);

const arrpegios = arpeggios.create({ axios });

const userService = new ArpeggiosService<User>("user", { instance: arrpegios });

userService.getAll().then((users) => {
  console.log(users);
});

mock.onGet("/user").reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});
