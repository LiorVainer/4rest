</br>
<img src="https://raw.github.com/LiorVainer/4rest/main/assets/4rest.svg">
</br>
</br>

## 4REST

[![test coverage](https://badgen.net/badge/coverage/100%25/green?icon=github)](https://github.com/LiorVainer/4rest)
[![npm version](https://img.shields.io/npm/v/4rest?color=f00e0e&logo=npm&style=flat)](https://www.npmjs.com/package/4rest)
[![install size](https://packagephobia.com/badge?p=4rest)](https://packagephobia.com/result?p=4rest)
[![minizipped size](https://img.shields.io/bundlephobia/minzip/4rest)](https://packagephobia.com/result?p=4rest)
[![License](https://img.shields.io/github/license/liorvainer/4rest?color=orange)](https://www.npmjs.com/package/4rest)

<strong>4rest (Forest)</strong> is a promise based, HTTP REST Client built on top of [`axios`](https://www.npmjs.com/package/axios) and [`zod`](https://www.npmjs.com/package/zod) packages suggesting easy to use and extensively customizable and configurable service with CRUD methods and type safe requests to API.

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

<h2>Table of Contents</h2>

<ul>
<li><a href="#motivation">Motivation</a></li>
<li><a href="#features">Features</a></li>
<li><a href="#usage">Usage / Examples</a>
<ul><li><a href="#usage/basic">Basic Service</a></li></ul>
<ul><li><a href="#usage/extended">Extended Service</a></li></ul>
<li><a href="#config">Configuration</a>
<ul><li><a href="#config/instance">Instance</a><ul><li><a href="#config/instance/instance-creation">Instance Creation</a></li><li><a href="#config/instance/axios-instance-access">Axios Instance Access</a></li></ul></li></ul>
<ul><li><a href="#config/service">Service</a></li><ul><li><a href="#config/service/routes">Methods Routes</a></li></ul>
<ul><li><a href="#config/service/request-config">Request Config</a></li>
<li><a href="#config/service/payload-key">Payload Data Key</a></li><li><a href="#config/service/handlingFunctions">On Success / On Error Handling</a></li><li><a href="#config/service/validation">Zod Validation</a></li></ul></li></ul>
<ul><li><a href="#config/methods-creator">Methods Creator Helper</a></li></ul>
<li><a href="#types">Types</a>
<ul><li><a href="#types/service-generics">Service Generics</a></li><li><a href="#types/service-method-metadata">Service Method Metadata</a></li><li><a href="#types/on-success">OnSuccess Function</a></li><li><a href="#types/on-error">OnError Function</a></li></ul></li>
<ul></ul></ul>

<br />

<a id="motivation"> <h2>Motivation</h2></a>

The package was created to help developers to get their requests functions from client to API up and runing quickly and comfortably, as well as making configuration for requests all centeralized in one spot at the code base of the app.
Using the package, you can divide your requests functions to API to different services based on the models (data structures) of the API.
When you have initiallized your service, you can make request to API at every place in your app with type safety based on the service configuration.

_Note: The package was meant to be used with rest apis only and is does not support graphql._

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

🎨 <strong>Extended Services</strong> with option to add additional methods extending out CRUD methods that comes built in with the base service you create

🧱 <strong>Services Built</strong> on fully configurable [`axios`](https://www.npmjs.com/package/axios) Instance

⚙️ <strong>Convenient Configuration</strong> with custom routes, request configuration, and payload data (body property of request) key custom define.
all of that configuration is per service or can be set globally on fetching instance as well

🛡️ <strong>Data Type Validation</strong> - API fetching requests, payloads and responses data validation with [`zod`](https://www.npmjs.com/package/zod) schemas

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

<a id="usage/extended"> <h3>🎨 <u>_Extended_</u></h3></a>

#### 1) Create Extended Service

```typescript
import { ForestService } from "4rest";

import { instance } from "./forestInstance";

export class UserService extends ForestService<UserWithId, User> {
  constructor() {
    super("user", instance, {
      /* service config will go here */
    });
    /* prefix for request url will be "user" */
  }

  public getByName = (name: string) => this.methodsCreator.getByParam<UserWithId, string>({ suffix: "name" })(name);
  public getByNameWithQuery = (name: string) =>
    this.methodsCreator.get<UserWithId>({ route: "name", config: { params: { name } } })();
  public isEmailTaken = (email: string) =>
    this.methodsCreator.getByParam<boolean, string>({ route: ["email", "taken"] })(email);
}
```

_<strong>Notes:</strong>_

1. You <strong>_must_</strong> include constructor in the structure that is shown above in your extended service in order for it to work properly

2. Extended Service will include all the base service methods as well as the additional ones you have added

3. Read about <a href='#config/methods-creator'>Methods Creator</a> to add new methods to extended service easily

#### 2) Use Extended Service

```typescript
const userService = new UserService();

async function getUserName(name: string) {
  const user: User = await (await userService.getByName(name)).data;
}

async function getUserNameByQuery(name: string) {
  const user: User = await (await userService.getByNameWithQuery(name)).data;
}

async function isEmailTaken(email: string) {
  const isEmailTaken: boolean = await (await userService.isEmailTaken(email)).data;
}
```
</br>

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

See What <a href="#config/service">Service Config</a> includes down below.

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

You can access the totally regular `AxiosInstance` that the `ForestInstance` is based on which contains all of [`axios`](https://www.npmjs.com/package/axios) methods on it:
</br>
</br>
Access it using the `axiosInstance` property on created `ForestInstance`

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

<a id="config/service/handlingFunctions"> <h4>4) OnSuccess / OnError Handling</h4></a>

You can configure in advance how to handle each request when it is completes successfully or failing and throws error.

Set up onSuccess function which parameters will be the <strong>_response_</strong> from successful request and optionally the <strong>_metadata_</strong> of the request.

Set up onError function which parameters will be the <strong>_error_</strong> that was thrown from a failed request and optionally the <strong>_metadata_</strong> of the request.

<strong>_Without metadata parameter used:_</strong>

```Typescript
const userService = forestInstance.createService<UserWithId, User, number>("user", {
    onSuccess: (response) => response.data,
    onError: (error) => {
      return { error, msg: "error" };
    },
  });
```

<strong>_With metadata parameter used:_</strong>

```Typescript
const userService = forestInstance.createService<UserWithId, User, number>("user", {
    onSuccess: (response, metadata) => {
      console.log(metadata.serviceConfig.validation);
      return response.data
    },
    onError: (error, metadata) => {
      console.log(metadata.serviceConfig.routes);
      return { error, msg: "error" };
    },
  });
```

You can also set different onSuccess and onError functions for each service method in the following way:

```Typescript
const userService = forestInstance.createService<UserWithId, User, number>("user", {
    onSuccessByMethod: {
      getAll: (response) => response.data,
      getById: (response) => response.status,
      ...,
      post: (response, metadata) => {
        console.log(metadata.serviceFunction);

        return response.data;
      },
    },
    onErrorByMethod: {
      getById: (error) => {
        return { error, msg: "errorByMethod" };
      },
      ...,
      post: (error, metadata) => {
        console.log('error at method:', metadata.serviceFunction);

        throw error;
      },
    },
  });
```

<a id="config/service/validation"> <h4>5) Zod Validation</h4></a>

If you want to make sure that the data you send to the API or recieved back from it, matches your data model schemas you can set validation config for service with [`zod`](https://www.npmjs.com/package/zod) schemas.

First of all, decalre your validation schemas using zod:

```typescript
export const UserSchema = z.object({
  name: z.string(),
  email: z.string().optional(),
});

export const UserWithIdSchema = UserSchema.extend({
  _id: z.number(),
});
```

then apply zod schemas to the fitting property of service configuration object:

- <strong>Global validation for all methods on service:</strong>

```typescript
import { UserWithIdSchema, UserSchema } from "../../types/user";

const userService = forestInstance.createService<UserWithId, User, number>("user", {
  validation: {
      types: { resoponseData: UserWithIdSchema },
    }
  }
});
```

_Examples for data recieved back from API:_

```typescript
// Valid Data, no error will be thrown
[{ _id: 1, name: "John Smith" }];

// Invalid data, will throw error
[{ name: "John Smith" }];
```

- <strong>Validation by service method:</strong>

```typescript
import { UserWithIdSchema, UserSchema } from "../../types/user";

const userService = forestInstance.createService<UserWithId, User, number>("user", {
  validation: {
    onMethods: {
      post: { types: { requestPayload: UserSchema, resoponseData: UserWithIdSchema } },
      getById: { types: { resoponseData: UserSchema.strict() } },
    },
  },
});
```

_Examples for payload sent to API:_

```typescript
// Valid Data, no error will be thrown
{ name: "John Smith", email: "john.smith@gmail.com" };

// Invalid data, will throw error
{ email: "john.smith@gmail.com" };
```

- <strong>Combination of both:</strong>

```typescript
import { UserWithIdSchema, UserSchema } from "../../types/user";

const userService = forestInstance.createService<UserWithId, User, number>("user", {
  validation: {
    onMethods: {
      post: { types: { requestPayload: UserSchema, resoponseData: UserWithIdSchema } },
      getById: { types: { resoponseData: UserSchema.strict() } },
    },
    types: { resoponseData: UserWithIdSchema },
  },
});
```

_<strong>Note:</strong> if a method has its own specific validation, it will be used over the global one_

<a id="config/methods-creator"> <h3>📀 <strong>Methods Creator Helper</strong></h3></a>

To help you construct new service methods, `ForestService` class comes included with property named `methodsCreator` that you can utilize to create new methods easily.

`methodsCreator` property includes the following helper methods:

- get
- getByParam
- delete
- post
- put
- putByParam
- patch
- patchByParam

_Examples_:

```typescript
public getByName = (name: string) => this.methodsCreator.getByParam<UserWithId, string>({ suffix: "name" })(name);
public getByNameWithQuery = (name: string) => this.methodsCreator.get<UserWithId>({ route: "name", config: { params: { name } } })();
public isEmailTaken = (email: string) => this.methodsCreator.getByParam<boolean, string>({ route: ["email", "taken"] })(email);
```

### _Configuration Options_:

#### _Base Helper Method_:

```typescript
interface BaseConfig {
  route?: Route; // string or string[]
  config?: AxiosRequestConfig;
  serviceFunction?: ServiceFunction;
  validation?: MethodValidationConfig; // configuartion object based on Zod Schemas;
  onSuccess?: OnSuccessFunction;
  onError?: OnErrorFunction;
}
```

#### _Payload Helper Method_:

```typescript
interface PayloadConfig {
  route?: Route;
  config?: AxiosRequestConfig;
  validation?: MethodValidationConfig;
  onSuccess?: OnSuccessFunction;
  onError?: OnErrorFunction;
  key?: Key; // string
}
```

#### _By Param Helper Method_:

```typescript
interface ByParamConfig {
  route?: Route;
  suffix?: Route; // string or string[] added after the param in request url
  config?: AxiosRequestConfig;
  validation?: MethodValidationConfig;
  onSuccess?: OnSuccessFunction;
  onError?: OnErrorFunction;
}
```

#### _Payload By Param Helper Method_:

```typescript
interface PayloadByParamConfig {
  route?: Route;
  suffix?: Route;
  config?: AxiosRequestConfig;
  validation?: MethodValidationConfig;
  onSuccess?: OnSuccessFunction;
  onError?: OnErrorFunction;
  key?: Key;
}
```
<br>

<a id="types"> <h2>Types</h2></a>

<a id="types/service-generics"> <h3>Service Generics</h3></a>

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

#### deleteAll

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

<a id="types/service-method-metadata"><h3>Service Method Metadata</h3></a>

Each request function (method) in 4rest includes metadata about the current request.

Method metadata includes the following properties:

```typescript
export interface Metadata {
  serviceConfig?: ServiceConfig; // current service config
  serviceFunction?: ServiceFunction; // name of one of the built in base service functions
}
```

<a id="types/on-success"><h3>OnSuccess Function</h3></a>

Function For Handling Successful Requests:

```typescript
export type OnSuccessFunction = <T>(value: AxiosResponse<T>, metadata?: Metadata) => any;
```

<a id="types/on-error"><h3>OnError Function</h3></a>

Function For Handling Failed Requests:

```typescript
export type OnSuccessFunction = <T>(value: AxiosResponse<T>, metadata?: Metadata) => any;
```

<br>

## License

[MIT](https://github.com/LiorVainer/forest/blob/main/LICENSE)
