import { ObjectId } from "mongodb";

import arpeggios, { ArpeggiosService, ServiceConfig } from "../../src/";

import { User, UserWithId } from "./types";

export class UserService extends ArpeggiosService<UserWithId, User> {
  constructor(config?: ServiceConfig) {
    super("user");
  }

  public getAll = this.methods.get<UserWithId[]>();
  public getByFullname = this.methods.getByParam<UserWithId, string>("fullName");
  public isEmailTaken = this.methods.getByParam<boolean, string>(["email", "taken"]);
}

const userService = new UserService({});

async function getUserByFullname(fullname: string) {
  const user: User = await userService.getByFullname(fullname);
  console.log(user);
}

async function isEmailTaken(email: string) {
  const isEmailTaken: boolean = await userService.isEmailTaken(email);
}

const userService1 = arpeggios.create().createService<UserWithId, User>("user");

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
