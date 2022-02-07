import { ArpeggiosConfig, ArpeggiosService } from "../../arpeggios/service";
import { ObjectId } from "mongodb";
import arpeggios, { Arpeggios } from "../..";
import { User, UserWithId } from "./types";

export class UserService extends ArpeggiosService<UserWithId, User> {
  constructor(config?: ArpeggiosConfig) {
    super("user", config);
  }

  public getAll = this.service.get<UserWithId[]>("all");
  public getByFullname = this.service.getByParam<UserWithId, string>(
    "fullName"
  );
  public isEmailTaken = this.service.getByParam<boolean, string>([
    "email",
    "taken",
  ]);
}

const arpeggiosInstance = arpeggios.create({
  axiosRequestConfig: {
    baseURL: "https://5988808c-7225-4abf-8aa4-3b48bc78c300.mock.pstmn.io",
  },
});

const userService = new UserService({
  instance: arpeggiosInstance,
});

async function getUserByFullname(fullname: string) {
  const user: User = await userService.getByFullname(fullname);
  console.log(user);
}

async function isEmailTaken(email: string) {
  const isEmailTaken: boolean = await userService.isEmailTaken(email);
}

// const userService = new ArpeggiosService<User>("/user", {
//   routes: { getAll: ["get", "all"], deleteAll: "all", deleteById: "id", post: "create", patch: "update" },
//   instance: arpeggiosInstance,
// });

async function getUsers() {
  const users: User[] = await userService.getAll();
  console.log(users);
}

async function getUserById(id: ObjectId) {
  const user: User = await userService.getById(id);
}

async function deleteAllUsers(id: ObjectId) {
  const user: User = await userService.getById(id); // default id type is mongodb ObjectId
}

async function deleteUserById(id: ObjectId) {
  const user: User = await userService.getById(id); // default id type is mongodb ObjectId
}

async function createUser(newUser: User) {
  const userCreated: User = await userService.post(newUser);
}

async function updateUser(partialUser: Partial<User>) {
  const updatedUser: User = await userService.patch(partialUser);
}

getUsers();
