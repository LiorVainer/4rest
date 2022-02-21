</br>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 362.33 83.13"><defs><style>.a{fill:#276336;}</style></defs><path class="a" d="M98.92,20.6a173,173,0,0,1,25.77-1.74c12.29,0,21.07,1.73,27.1,6.3,5.11,3.93,7.88,9.66,7.88,17.48,0,10.07-7.5,17.21-13.88,19.54v.42c5.39,2.29,8.32,7.47,10.38,14.53,2.44,8.33,5.06,19.87,6.62,23H141.23c-1.22-2.33-3.3-8.67-5.63-18.6-2.19-9.72-5.22-11.83-12-11.84H119.8v30.44H98.92ZM119.8,54.52h5.85c8.27,0,13.07-4.07,13.07-10.26s-4.14-9.73-11.49-9.79a35.1,35.1,0,0,0-7.43.5Z" transform="translate(0 -18.24)"/><path class="a" d="M222.4,67.37H193.32v15.5h32.5v17.24H172.24V19.49h51.9V36.73H193.32V50.3H222.4Z" transform="translate(0 -18.24)"/><path class="a" d="M239.21,79A48.84,48.84,0,0,0,260,84c7.53,0,11.3-2.7,11.3-7,0-4-3.66-6.39-12.86-9.54-13.55-4.81-22.57-12.29-22.57-24.25,0-14.18,12-25,32.1-25,9.56,0,16.4,1.79,21.62,4.11l-4.45,16.86a42,42,0,0,0-17.41-3.83c-6.79,0-10.43,2.61-10.43,6.23,0,4.25,4.3,6,14.51,9.81,14.5,5.32,21,13,21,24.28,0,13.87-10.75,25.67-34.08,25.67-9.64,0-19-2.54-23.58-4.92Z" transform="translate(0 -18.24)"/><path class="a" d="M320.15,37.19H299.42V19.49h62.91v17.7h-21.1v62.92H320.15Z" transform="translate(0 -18.24)"/><path class="a" d="M57.53,18.36h0Z" transform="translate(0 -18.24)"/><path class="a" d="M84.35,82.58l-22.3.12-4.35,0v17.36H37.86V82.5H10.69A10.69,10.69,0,0,1,1.48,66.38L13.16,33.66H30.23l-.74,1.43L19.29,66.65l-.08.24H39l-.13-43.78a4.89,4.89,0,0,1,4.89-4.75h14a3.72,3.72,0,0,1,2.56,1.19l19.07,24.7c1.92,2.09.28,5.27-2.73,5.27H75.08l8.53,10a4.21,4.21,0,0,1-3.21,6.94H78.26L88,74.73A4.73,4.73,0,0,1,84.35,82.58Z" transform="translate(0 -18.24)"/></svg>
</br>
</br>

[![test coverage](https://badgen.net/badge/coverage/100%25/green?icon=github)](https://github.com/LiorVainer/forest)
[![npm version](https://badgen.net/badge/npm/v1.0.0/red?icon=https://www.svgrepo.com/show/354126/npm-icon.svg)](https://www.npmjs.com/package/forest)
[![install size](https://packagephobia.com/badge?p=forest)](https://packagephobia.com/result?p=forest)

## Description

<strong>4rest (Forest)</strong> is a promise based, HTTP REST Client built on top of [`axios`](https://www.npmjs.com/package/axios) and [`cachios`](https://www.npmjs.com/package/cachios) packages suggesting easy to use and extensively customizable and configurable service with CRUD methods and type safe requests to API.

<br />

<br />

## Installation

Using npm

```bash
  npm install 4rest
```

Using yarn

```bash
  yarn add 4rest
```

<br />

## Features

💎 <strong> Service with built in CRUD Methods: </strong>

- getAll
- getById
- deleteAll
- deleteById
- post
- patch
- put

<br />

🎨 <strong>Custom Services</strong> with option to add additional methods extending out CRUD methods that comes built in with the service

🧱 <strong>Services Built</strong> on fully configurable [`axios`](https://www.npmjs.com/package/axios) or [`cachios`](https://www.npmjs.com/package/cachios) Instances

⚙️ <strong>Convenient Configuration</strong> with custom routes, request configuration, and payload data (body property of request) key custom define

🛡️ <strong>Type Safe</strong> API fetching requests, payloads, and responses

🧪 <strong>Test Proof</strong> - _4rest_ has 100% test coverage

<br />

## Usage / Examples

### 🧱 <u>_Basic_</u>

#### 1) Create Instance

```typescript
import forest from "4rest";

const instance = forest.create({ baseURL: "http://localhost:5000" });
```

#### 2) Create Service

```typescript
import { instance } from "./forestInstance";
import { UserWithId, User } from "./types";

const userService = instance.createService<UserWithId, User>("user");
```

#### 3) Use Service

- #### GET

```typescript
// GET http://localhost:5000/user
async function getUsers() {
  const users: User[] = await (await userService.getAll()).data;
}

// GET http://localhost:5000/user/:id
async function getUserById(id: string) {
  const user: User = await (await userService.getById(id)).data;
}
```

- #### DELETE

```typescript
// DELETE http://localhost:5000/user
async function deleteAllUsers() {
  const usersDeleted: User[] = await (await userService.deleteAll()).data;
}

// DELETE http://localhost:5000/user/:id
async function deleteUserById(id: ObjectId) {
  const userDeleted: User = await (await userService.deleteById(id)).data;
}
```

- #### POST

```typescript
// POST http://localhost:5000/user
async function createUser(newUser: User) {
  const userCreated: User = await (await userService.post(newUser)).data;
}
```

- #### PATCH

```typescript
// PATCH http://localhost:5000/user
async function updateUser(partialUser: Partial<User>) {
  const updatedUser: User = await (await userService.patch(partialUser)).data;
}
```

- #### PUT

```typescript
// PUT http://localhost:5000/user
async function updateUser(partialUser: Partial<User>) {
  const updatedUser: User = await (await userService.put(partialUser)).data;
}
```

### 🎨 <u>_Custom_</u>

#### 1) Create Custom Service

```typescript
import { ForestService } from "4rest";

import { instance } from "./forestInstance";

export class UserService extends ForestService<UserWithId, User> {
  constructor(config?: ServiceConfig) {
    super("user", instance, config);
    /* prefix for request url is "user" */
  }

  public getByFullname = this.methods.getByParam<UserWithId, string>(
    "fullName"
  );
  public isEmailTaken = this.methods.getByParam<boolean, string>([
    "email",
    "taken",
  ]);
}
```

#### 2) Use Custom Service

```typescript
const userService = new UserService();

async function getUserByFullname(fullname: string) {
  const user: User = await (await userService.getByFullname(fullname)).data;
}

async function isEmailTaken(email: string) {
  const isEmailTaken: boolean = await (
    await userService.isEmailTaken(email)
  ).data;
}
```

<br>

## Types

<strong>Service</strong> has _generic types_ to control the following types of the service methods

- Response Data
- Payload Data
- Id Type

```typescript
class ForestService<ResponseData = any, PayloadData = Response, IdType = string>
```

By doing so, Typescript will force you to give it the parameters with matching types when calling the service methods or will recognize alone the response data type for more comfortable auto-completion in the future.

You pass this generic types when creating new service with `createService()` function of a `forestInstance`

<strong>Example:</strong>

```typescript
import { instance } from "./forestInstance";
import { UserWithId, User } from "./types";

const userService = instance.createService<UserWithId, User, string>("user");

// ResponseData - UserWithId
// PayloadData - User
// IdType - string
```

<strong>By default</strong> the service takes the types you passed to it and transform them to each service method in the following way:

#### getAll

- Response Data Type: `ResponseData[]`

#### getById

- Response Data Type: `ResponseData`
- Id Type: `IdType`

#### DeleteAll

- Response Data Type: `ResponseData[]`

#### deleteById

- Response Data Type: `ResponseData`
- Id Type: `IdType`

#### post

- Response Data Type: `ResponseData`
- Payload Data Type: `PayloadData`

#### patch

- Response Data Type: `ResponseData`
- Payload Data Type: `Partial<PayloadData>`

#### put

- Response Data Type: `ResponseData`
- Payload Data Type: `Partial<PayloadData>`

if you would like to change one or more of this method types, you can do it when calling the method by passing to it generic types that will be relevant to the this method only, at the place you are calling it.

<br>

<strong>Example:</strong>

Lets say you would like to change the type of the response data that comes back from calling to the post method from `ResponseData` to `boolean` because the API you working with is returns only with data that indicates whether or not an _User_ has been created successfully

You can do that in the following way:

```typescript
const data: boolean = await(
  await userService.post<boolean>(/* newUserData */)
).data;
```

<br>

## Configuration

### 📀 <strong>Forest Instance</strong>

<strong>Create Forest Instance based</strong> `axios` or `cachios` Instance with `forest.create()` Function

```typescript
import forest from "4rest";

/* Customised Forest Instance can be based on
   AxiosInstance, AxiosRequestConfig or CachiosInstance */

const forestInstance = forest.create(/* Here goes instance or config*/);
```

<strong>Options to configure</strong> `forest.create()`

```typescript
type InstanceConfig = AxiosInstance | CachiosInstance | AxiosRequestConfig;
```

</br>

### 📀 <strong>Forest Service</strong>

#### <u>Configure Service with `createService()` Method:</u>

#### 1) Methods REST Routes

You may want to change few of the built in service method _route_ to extend the _prefix_ based on the API you are working with.

Do it easily by configuring an extended route for each method you want.

_<strong>Note:</strong> method with no configured extended route will send request to basic route: `baseUrl/prefix` or `baseUrl/prefix/param`_

<strong>Example:</strong>

```typescript
import { instance } from "./forestInstance";

const userService = instance.createService<User>("user", {
  /* All Service built in CRUD methods route control ( string | string[] ) */
  routes: {
    getAll: ["get", "all"], // GET http://localhost:5000/user/get/all
    deleteAll: "all",       // DELETE http://localhost:5000/user/all
    deleteById: "id",       // DELETE http://localhost:5000/user/id/:id
    ...,
    post: "create",         // POST http://localhost:5000/user/create
    patch: "update"         // POST http://localhost:5000/user/update
  }
});
```

#### 2) Request Config

You can set a `requestConfig` of type `CachiosRequestConfig` for attaching metadata to a request (like headers, params, etc.)

`requestConfig` can be set for each method seperatly or make one general config for all methods

_<strong>Note:</strong> if a method has its own specific `requestConfig`, it will be used over the general one_

<strong>Example:</strong>

```typescript
import { instance } from "./forestInstance";

const userService = instance.createService<UserWithId, User, number>("user", {
  requestConfigByMethod: {
    /* Request Config Per Method */ getAll: { params: { page: 1, size: 10 } },
    getById: { maxRedirects: 3 },
  },
  requestConfig: {
    /* Request Config For All Methods */ headers: {
      Authentication: "Bearer Header",
    },
  },
});
```

#### 3) Payload Data Key

For HTTP methods with payload (Post, Patch, Put) you can set a `payloadKey` for setting the payload data on the key you want inside the body of the request

```typescript
// By Default
request: {
  body: data,
  ...
}

// After Setting payloadKey
request: {
  body: {
    [payloadKey]: data
  },
  ...
}
```

`payloadKey` can be set for each HTTP payload method seperatly or make one general config for all methods

_<strong>Note:</strong> if a method has its own specific `payloadKey`, it will be used over the general one_

<strong>Example:</strong>

```typescript
import { instance } from "./forestInstance";

const userService = instance.createService<UserWithId, User, number>("user", {
  payloadKey: "update",
  payloadKeyByMethod: { post: "data" },
});
```

## License

[MIT](https://github.com/LiorVainer/forest/blob/main/LICENSE)
