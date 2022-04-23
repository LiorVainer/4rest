</br>
<img src="https://raw.github.com/LiorVainer/4rest/main/assets/4rest.svg">
</br>
</br>

[![test coverage](https://badgen.net/badge/coverage/100%25/green?icon=github)](https://github.com/LiorVainer/4rest)
[![npm version](https://img.shields.io/npm/v/4rest?color=f00e0e&logo=npm&style=flat)](https://www.npmjs.com/package/4rest)
[![install size](https://packagephobia.com/badge?p=4rest)](https://packagephobia.com/result?p=4rest)
[![minizipped size](https://img.shields.io/bundlephobia/minzip/4rest)](https://packagephobia.com/result?p=4rest)
[![License](https://img.shields.io/github/license/liorvainer/4rest?color=orange)](https://www.npmjs.com/package/4rest)

## Description

<strong>4rest (Forest)</strong> is a promise based, HTTP REST Client built on top of [`axios`](https://www.npmjs.com/package/axios) package suggesting easy to use and extensively customizable and configurable service with CRUD methods and type safe requests to API.

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

<h2>Table of contents</h2>

<ul>
<li><a href="#features">Features</a></li>
<li><a href="#usage">Usage / Examples</a>
<ul><li><a href="#usage/basic">Basic Service</a></li></ul>
<ul><li><a href="#usage/custom">Custom Service</a></li></ul>
<li><a href="#types">Service Types</a></li>
<li><a href="#config">Configuration</a>
<ul><li><a href="#config/instance">Instance</a><ul><li><a href="#config/instance/instance-creation">Instance Creation</a></li><li><a href="#config/instance/axios-instance-access">Axios Instance Access</a></li></ul></li></ul>
<ul><li><a href="#config/service">Service</a></li><ul><li><a href="#config/service/routes">Methods Routes</a></li></ul>
<ul><li><a href="#config/service/request-config">Request Config</a></li>
<li><a href="#config/service/payload-key">Payload Data Key</a></li></ul></ul>

</ul>

<br />

<a id="features"> <h2>Features</h2></a>

💎 <strong> Service with built in CRUD Methods: </strong>

- getAll
- getById
- deleteAll
- deleteById
- post
- patch
- patchById
- put
- putById

<br />

🎨 <strong>Custom Services</strong> with option to add additional methods extending out CRUD methods that comes built in with the service

🧱 <strong>Services Built</strong> on fully configurable [`axios`](https://www.npmjs.com/package/axios) Instance

⚙️ <strong>Convenient Configuration</strong> with custom routes, request configuration, and payload data (body property of request) key custom define

🛡️ <strong>Type Safe</strong> API fetching requests, payloads, and responses

🧪 <strong>Test Proof</strong> - _4rest_ has 100% test coverage

<br />

<a id="usage"> <h2>Usage / Examples</h2></a>

<a id="usage/basic"> <h3>🧱<u>_Basic_</u></h3></a>

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

// PATCH http://localhost:5000/user/:id
async function updateUserById(id: ObjectId, partialUser: Partial<User>) {
  const updatedUser: User = await (await userService.patchById(id, partialUser)).data;
}
```

- #### PUT

```typescript
// PUT http://localhost:5000/user
async function updateUser(partialUser: Partial<User>) {
  const updatedUser: User = await (await userService.put(partialUser)).data;
}

// PUT http://localhost:5000/user/:id
async function updateUserById(id: ObjectId, partialUser: Partial<User>) {
  const updatedUser: User = await (await userService.putById(id, partialUser)).data;
}
```

<a id="usage/custom"> <h3>🎨 <u>_Custom_</u></h3></a>

#### 1) Create Custom Service

```typescript
import { ForestService } from "4rest";

import { instance } from "./forestInstance";

export class UserService extends ForestService<UserWithId, User> {
  constructor(config?: ServiceConfig) {
    super("user", instance, config);
    /* prefix for request url is "user" */
  }

  public getByFullname = this.methods.getByParam<UserWithId, string>("fullName");
  public isEmailTaken = this.methods.getByParam<boolean, string>(["email", "taken"]);
}
```

_<strong>Note:</strong> you must include constructor in the structure that is shown above in your custom service in order for it to work properly_

#### 2) Use Custom Service

```typescript
const userService = new UserService();

async function getUserByFullname(fullname: string) {
  const user: User = await (await userService.getByFullname(fullname)).data;
}

async function isEmailTaken(email: string) {
  const isEmailTaken: boolean = await (await userService.isEmailTaken(email)).data;
}
```

<br>

<a id="types"> <h2>Types</h2></a>

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

#### patchById

- Response Data Type: `ResponseData`
- Payload Data Type: `Partial<PayloadData>`
- Id Type: `IdType`

#### put

- Response Data Type: `ResponseData`
- Payload Data Type: `Partial<PayloadData>`

#### putById

- Response Data Type: `ResponseData`
- Payload Data Type: `Partial<PayloadData>`
- Id Type: `IdType`

if you would like to change one or more of this method types, you can do it when calling the method by passing to it generic types that will be relevant to the this method only, at the place you are calling it.

<br>

<strong>Example:</strong>

Lets say you would like to change the type of the response data that comes back from calling to the post method from `ResponseData` to `boolean` because the API you working with is returns only with data that indicates whether or not an _User_ has been created successfully

You can do that in the following way:

```typescript
const data: boolean = await(await userService.post<boolean>(/* newUserData */)).data;
```

<br>

<a id="config"> <h2>Configuration</h2></a>

<a id="config/instance"> <h3>📀 <strong>Forest Instance</strong></h3></a>

<a id="config/instance/instance-creation"><h4><strong><u>Instance Creation</u></strong></h4></a>
<strong>Create Forest Instance based</strong> `axios` Instance with `forest.create()` Function

```typescript
import forest from "4rest";

/* Customised Forest Instance can be based on
   AxiosInstance, AxiosRequestConfig */

const forestInstance = forest.create({
    axiosSettings: /* Here goes instance or config*/,
    globalServiceConfig: /* Here goes service configuration that will be applied by default to
                            all created service from these ForestInstance*/
  });
```

_<strong>Note:</strong> if a created service will have a config of it's own, it's config properties will be overriding the global service config properties, which means the more specific property is the one that will be in use eventually_

<br/>

<strong>Options to configure</strong> `forest.create()`

```typescript
export interface InstanceConfig {
  axiosSettings?: AxiosSettings;
  globalServiceConfig?: ServiceConfig;
}
```

_<strong>Note:</strong> Configuration is completly optional, and if `axiosSettings` are empty the forest instance will be based on the base `AxiosInstance`_

</br>

<a id="config/instance/axios-instance-access"><h4><strong><u>Axios Instance Access</u></strong></h4></a>

<strong>you can access the totally regular `AxiosInstance` that the `ForestInstance` is based on which contains all of [`axios`](https://www.npmjs.com/package/axios) methods on it:</strong>
</br>
</br>
access it using the `axiosInstance` property on created `ForestInstance`

```typescript
import { forestInstance } from "./instance";

const response = forestInstance.axiosInstance.get("localhost:5000/users" /* Here goes axios config*/);
```

</br>

<a id="config/service"> <h3>📀 <strong>Forest Service</strong></h3></a>

#### <u>Configure Service with `createService()` Method:</u>

<a id="config/service/routes"> <h4>1) Methods REST Routes</h4></a>

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
    patch: "update"         // PATCH http://localhost:5000/user/update
    patchById: "update"     // PATCH http://localhost:5000/user/update/:id
  }
});
```

<a id="config/service/request-config"> <h4>2) Request Config</h4></a>

You can set a `requestConfig` of type `AxiosRequestConfig` for attaching metadata to a request (like headers, params, etc.)

`requestConfig` can be set for each method seperatly or make one general config for all methods

_<strong>Note:</strong> if a method has its own specific `requestConfig`, it will be used over the general one_

<strong>Example:</strong>

```typescript
import { instance } from "./forestInstance";

const userService = instance.createService<UserWithId, User, number>("user", {
  requestConfigByMethod: {
    /* Request Config Per Method */
    getAll: { params: { page: 1, size: 10 } },
    getById: { maxRedirects: 3 },
  },
  requestConfig: {
    /* Request Config For All Methods */
    headers: {
      Authentication: "Bearer Header",
    },
  },
});
```

<a id="config/service/payload-key"> <h4>3) Payload Data Key</h4></a>

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

`payloadKey` can be set for each HTTP payload method seperatly or set one general config for all methods

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
