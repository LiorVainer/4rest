import { ArpeggiosConfig, ArpeggiosService } from "arpeggios/service";
import axios from "axios";
import { ObjectId } from "mongodb";
import arpeggios, { Arpeggios } from "../";

export interface User {
  fullName: string;
  email: string;
  password: string;
  address: string;
}

export interface UserWithId extends User {
  _id: ObjectId;
}

const arpeggiosInstance = arpeggios.create();

export class UserService extends ArpeggiosService<UserWithId, User> {
  public getAll = this.service.get<UserWithId[]>(["get"]);
}

const userService = new UserService("/user", {});

const userServiceTwo = new ArpeggiosService<User>("/user", {
  routes: {
    post: "create", // route: "/user/create"
    getAll: ["get", "all"], // route: "/user/get/all"
  },
  instance: arpeggiosInstance,
});
