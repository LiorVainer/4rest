# Arpeggios

REST promise based HTTP client library built on top of `axios` and `cachios` packages suggesting easy to use and extensively customizable CRUD service and type safe API requests

<br />

## Installation

Using npm

```bash
  npm install arpeggios
```

Using yarn

```bash
  yarn add arpeggios
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

🧱 <strong>Services Built On</strong> fully configured `axios` or `cachios` Instances

⚙️ <strong>Convenient Configuration</strong> with custom routes, request configuration, and payload  data (body property of request) key custom define

🛡️ <strong>Type Safe</strong> API fetching requests, payloads, and responses

<br />

## Usage / Examples

### 🧱 <u>_Basic_</u>

#### 1) Create Instance

```typescript
import arpeggios from "arpeggios";

const instance = arpeggios.create({ baseURL: "http://localhost:5000" });
```

#### 2) Create Service

```typescript
import { instance } from "./instance";
import { User } from "./types";

const userService = instance.createService<UserWithId, User>("user");
```

#### 3) Use Service

- #### GET

```typescript
// GET http://localhost:5000/user
async function getUsers() {
  const users: User[] = await userService.getAll();
}

// GET http://localhost:5000/user/:id
async function getUserById(id: ObjectId) {
  // default id type of service is mongodb ObjectId
  const user: User = await userService.getById(id); 
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

#### 1) Create Extended Service

```typescript
import { ArpeggiosService } from "arpeggios";

import { instance } from "./arpeggiosInstance";

export class UserService extends ArpeggiosService<UserWithId, User> {
  constructor(config?: ServiceConfig) {
    super("user", instance, config);
    /* prefix for request url is "user" */
  }

  public getByFullname = this.methods.getByParam<UserWithId, string>("fullName");
  public isEmailTaken = this.methods.getByParam<boolean, string>(["email", "taken"]);
}
```

#### 2) Use Extended Service

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

## Configuration

### 📀 <strong>Arpeggios Instance</strong>

<strong>Create Arpeggios Instance based</strong> `axios` or `cachios` Instance with `arpeggios.create()` Function

```typescript
import arpeggios from "arpeggios";

/* Customised Arpeggios Instance can be based on
   AxiosInstance, AxiosRequestConfig or CachiosInstance */

const arpeggiosInstance = arpeggios.create(/* Here goes instance or config*/);
```

<strong>Options to configure</strong> `arpeggios.create()`

```typescript
type InstanceConfig = AxiosInstance | CachiosInstance | AxiosRequestConfig;
```
</br>

### 📀 <strong>Arpeggios Service</strong>

#### <u>Methods Types:</u>

Set The following Generic Types to control the requests types of response data, payload data, and id param.
- Response Data
- Payload Data
- Id Type

By doing so, Typescript will force you to give it the parameters with matching types when calling the service methods or will recognize alone the response data type for more comfortable auto-completion in future
```typescript
class ArpeggiosService<ResponseData = any, PayloadData = Response, IdType = ObjectId>
```

<strong>Example:</strong>

```typescript
import { instance } from "./arpeggiosInstance";
import { UserWithId, User } from "./types";

const userService = instance.createService<UserWithId, User, string>("user");

// ResponseData - UserWithId
// PayloadData - User
// IdType - string
```
</br>

#### <u>Configure Service with `createService()` Method:</u>

#### 1) Methods REST Routes

You may want to change few of the built in service method *route* to extend the *prefix* based on the API you are working with.

Do it easily by configuring an extended route for each method you want.

_<strong>Note:</strong> method with no configured extended route will send request to basic route: `baseUrl/prefix` or `baseUrl/prefix/param`_

<strong>Example:</strong>

```typescript
import { instance } from "./arpeggiosInstance";

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
import { instance } from "./arpeggiosInstance";

const userService = instance.createService<UserWithId, User, number>("user", {
  requestConfigByMethod: {
    /* Request Config Per Method */ getAll: { params: { page: 1, size: 10 } },
    getById: { maxRedirects: 3 },
  },
  requestConfig: {
    /* Request Config For All Methods */ headers: { Authentication: "Bearer Header" },
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
import { instance } from "./arpeggiosInstance";

const userService = instance.createService<UserWithId, User, number>("user", {
  payloadKey: "update",
  payloadKeyByMethod: { post: "data" },
});
```

## License

[MIT](https://github.com/LiorVainer/arpeggios/blob/main/LICENSE)
