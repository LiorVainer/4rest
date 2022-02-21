</br>
<img src="https://raw.github.com/LiorVainer/4rest/main/assets/icon.svg">
</br>
</br>

[![test coverage](https://badgen.net/badge/coverage/100%25/green?icon=github)](https://github.com/LiorVainer/4rest)
[![npm version](https://badgen.net/badge/npm/v1.0.4/red?icon=https://www.svgrepo.com/show/354126/npm-icon.svg)](https://www.npmjs.com/package/4rest)
[![install size](https://packagephobia.com/badge?p=4rest)](https://packagephobia.com/result?p=4rest)

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
