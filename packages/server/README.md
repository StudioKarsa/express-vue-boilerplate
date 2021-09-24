# server

This package contains the server-side code of the application.

Tools used:

* [Express](https://expressjs.com/)
* [Prisma](https://www.prisma.io/)
* [TypeScript](https://www.typescriptlang.org/)
* [Winston](https://github.com/winstonjs/winston)

## Architecture

```text
src/
├─ database/
├─ logger/
├─ middleware/
├─ modules/
├─ utils/
```

* `database`: contains the prisma client.
* `logger`: contains the winston logger.
* `middleware`: contains the middleware used by the server.
* `modules`: contains the modularized application / enterprise business logic.
* `utils`: contains the utilities used by the server.

## Getting Started

To get started on the server, follow these steps:

### 1. Run the migrations

> Make sure the database server is running and the database is created.
> And, the `packages/app-config` environment variables are set.

From the root of the project (not the server package), run:

```bash
yarn dev:migrate
```

### 2. Running the server

From the root of the project (not the server package), run:

```bash
yarn dev:server
```

## API documentation

| Endpoint      | Method | Description      | Body                                    |
| ------------- | ------ | ---------------- | --------------------------------------- |
| /health       | GET    | Health check     | -                                       |
| /v1/posts     | GET    | Get all posts    | -                                       |
| /v1/posts/:id | GET    | Get a post by id | -                                       |
| /v1/posts     | POST   | Create a post    | json { title: string, content: string } |
| /v1/posts/:id | PUT    | Update a post    | json { title: string, content: string } |
| /v1/posts/:id | DELETE | Delete a post    | -                                       |

## Creating a module

> This is purely opinionated and optional. You can rewrite how modules are created.

To create a new module, first create a new directory in the `modules` directory with the name of the module.

For example, if you want to create a module named `posts`, create a directory named `posts` in the `modules` directory.

### 1. Creating the Module components

A module can contain the following:

#### A. The store (data layer of the module)

Store is the data layer of the module. It contains methods to interact with the database for the module. (Injects to the controller)

Example **`src/modules/v1/posts/store.ts`**:

```typescript
// src/modules/v1/posts/store.ts
import type { Prisma, Post } from '@prisma/client'
import type { ModuleStoreContext } from '../../types'

export interface PostStore {
  all: (query?: Prisma.PostFindManyArgs) => Promise<Post[]>
}

/**
 * Post store
 */
export function createPostStore({ database, logger, }: ModuleStoreContext): PostStore {
  async function all(query: Prisma.PostFindManyArgs = {}) {
    const posts = await database.post.findMany(query).catch((err) => {
      throw err
    })

    return posts
  }

  return { all }
}

```

#### B. The controller (REST API interface)

Controller is the REST API interface of the module. It contains handlers for the HTTP requests. (Injects to the router)

Example **`src/modules/v1/posts/controller.ts`**:

```typescript
import { HTTP_STATUS } from 'common'
import type { RequestHandler } from 'express'

import type { ModuleController, ModuleControllerContext } from '../../types'
import type { PostStore } from './store'

export interface PostController extends ModuleController {
  getPosts: RequestHandler
}

export function createPostController({
  store,
  logger,
}: ModuleControllerContext<PostStore>): PostController {
  /**
   * Get all posts
   */
  const getPosts: RequestHandler = async (req, res) => {
    try {
      const posts = await store.all()

      res.status(HTTP_STATUS.OK).json({
        items: posts,
        total: posts.length,
      })
    } catch (error) {
      next(error)
    }
  }

  return { getPosts }
}
```

#### C. The routes (the API endpoints)

Routes are the API endpoints of the module. They are the API endpoints of the module.

Example **`src/modules/v1/posts/routes.ts`**:

```typescript
import joi from 'joi'
import { HTTP_METHODS } from 'common'

import { createRoutes } from '../../../utils/router'

import type { ModuleRoutesContext } from '../../types'
import type { PostController } from './controller'

export function createPostRoutes({
  controller,
  router,
}: ModuleRoutesContext<PostController>) {
  createRoutes({
    router,
    routes: [
      {
        method: HTTP_METHODS.GET,
        path: '/posts',
        handlers: controller.getPosts,
      },
    ],
  })
}
```

### 2. Creating the entry point of the module

Create a `index.ts` file in the module directory.

A module accepts 3 dependencies to be injected:

* `router`: the express router
* `database`: the prisma client
* `logger`: the winston logger

```typescript
import { createPostRoutes } from './routes'
import { createPostStore } from './store'
import { createPostController } from './controller'

import type { ModuleContext } from '../../types'

export function createPostModule({ router, database, logger }: ModuleContext) {
  const store = createPostStore({ database, logger })
  const controller = createPostController({ store, logger })

  createPostRoutes({
    router,
    controller,
  })

  return router
}
```

Now you can call `createPostModule` to an express router so that the module can be mounted to the router.

```typescript
// src/app.ts
import { createPostModule } from './modules/post'

...

app.use('/', createPostModule({ router, database, logger }))

...
```

And that's it!

### Re-usable module type definitions

Here, you can use the types defined in `modules/types.ts` to help you create your own type-safe modules.

```typescript
import type { RequestHandler, Router } from 'express'
import type { PrismaClient } from '@prisma/client'
import type { Logger } from 'winston'

export type ModuleContext = {
  router: Router
  database: PrismaClient
  logger: Logger
}

export type ModuleStoreContext = Omit<ModuleContext, 'router'>

export type ModuleControllerContext<Store> = Omit<
  ModuleContext,
  'router' | 'database'
> & {
  store: Store
}

export type ModuleController = {
  [key: string]: RequestHandler
}

export type ModuleRoutesContext<Controller> = Omit<
  ModuleContext,
  'logger' | 'database'
> & {
  controller: Controller & ModuleController
}
```