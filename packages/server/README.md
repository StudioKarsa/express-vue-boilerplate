# server

This package contains the server-side code of the application.

Tools used:

* [Express](https://expressjs.com/)
* [Prisma](https://www.prisma.io/)
* [TypeScript](https://www.typescriptlang.org/)
* [Winston](https://github.com/winstonjs/winston)

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
