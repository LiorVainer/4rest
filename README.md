# Arpeggios

Promise based HTTP client library built on top of `axios` and `cachios` libraries suggesting easy to use and customizable CRUD service and type safe API requests

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

<strong> 🦴 Service with built in with CRUD Methods: </strong>

- getAll
- getById
- deleteAll
- deleteById
- post
- patch
- put

<br />

✨ <strong>Custom Services</strong> with option to add additional methods extending out of the box CRUD that comes built in

🧱 <strong>Services Built On</strong> fully configured `axios` or `cachios` Instances

⚙️ <strong>Convenient Configuration</strong> with custom routes and base API requests instance For Service

🛡️ <strong>Type Safe</strong> API fetching requests, payloads, and responses

<br />

## Usage / Examples

### Create Basic Service

```typescript
import { ArpeggiosService } from "arpeggios";
import { User } from "./types";

const userService = new ArpeggiosService<User>("user");
```

### Use Basic Service

#### GET

```typescript
// GET http://localhost:5000/user
async function getUsers() {
  const users: User[] = await userService.getAll();
}

// GET http://localhost:5000/user/:id
async function getUserById(id: ObjectId) {
  const user: User = await userService.getById(id); // default id type is mongodb ObjectId
}
```

#### DELETE

```typescript
// DELETE http://localhost:5000/user
async function deleteAllUsers() {
  const usersDeleted: User[] = await userService.deleteAll();
}

// DELETE http://localhost:5000/user/:id
async function deleteUserById(id: ObjectId) {
  const userDeleted: User = await userService.deleteById(id);
}
```

#### POST

```typescript
// POST http://localhost:5000/user/:id
async function createUser(newUser: User) {
  const userCreated: User = await userService.post(newUser);
}
```

#### PATCH

```typescript
// PATCH http://localhost:5000/user/:id
async function updateUser(partialUser: Partial<User>) {
  const updatedUser: User = await userService.patch(partialUser);
}
```

#### PUT

```typescript
// PUT http://localhost:5000/user/:id
async function updateUser(partialUser: Partial<User>) {
  const updatedUser: User = await userService.put(partialUser);
}
```

### Custom Service Types

#### Arpeggios Service Generic Types

```typescript
class ArpeggiosService<Response, Payload = Response, IdType = ObjectId>
```

#### Example

```typescript
import { ArpeggiosService } from "Arpeggios";
import { UserWithId, User } from "./types";

const userService = new ArpeggiosService<UserWithId, User, string>("/user");

// Response - UserWithId
// Payload - User
// IdType - string
```

### Create Custom Service

```typescript
import { ArpeggiosService } from "arpeggios";

export class UserService extends ArpeggiosService<UserWithId, User> {
  constructor(config?: ArpeggiosConfig) {
    super("user", config); /* prefix for request url is "user" */
  }

  public getByFullname = this.service.getByParam<UserWithId, string>(
    "fullName"
  );
  public isEmailTaken = this.service.getByParam<boolean, string>([
    "email",
    "taken",
  ]);
}
```

### Use Custom Service

```typescript
const userService = new UserService();

async function getUserByFullname(fullname: string) {
  const user: User = await userService.getByFullname(fullname);
}

async function isEmailTaken(email: string) {
  const isEmailTaken: boolean = await userService.isEmailTaken(email);
}
```

<br>

## Configuration

<strong>CRUD Routes</strong>

```typescript
const userService = new ArpeggiosService<User>("user", {
  /* All Service built in CRUD methods route control ( string | string[] ) */
  routes: {
    getAll: ["get", "all"], // GET http://localhost:5000/user/get/all
    deleteAll: "all",       // DELETE http://localhost:5000/user/all
    deleteById: "id",       // DELETE http://localhost:5000/user/id/:id
    ...
    post: "create",         // POST http://localhost:5000/user/create
    patch: "update"         // POST http://localhost:5000/user/update
  }
});
```

<strong>Instance based</strong> `axios` or `cachios` Service

```typescript
import arpeggios, { ArpeggiosService } from 'arpeggios'


/* Customised Arpeggios Instance can be based on
   AxiosInstance, AxiosRequestConfig or CachiosInstance */

const arpeggiosInstance = arpeggios.create( /* Here goes instance or config*/ );

const userService = new ArpeggiosService<User>("user", {
  routes: {
    ...
  },
  instance: arpeggiosInstance,
});
```

<strong>Options to configure</strong> `arpeggios.create()`

```typescript
interface ArpeggiosCreateProps {
  axios?: AxiosInstance;
  cachios?: CachiosInstance;
  axiosRequestConfig?: AxiosRequestConfig;
}
```

## License

[MIT](https://github.com/LiorVainer/arpeggios/blob/main/LICENSE)
