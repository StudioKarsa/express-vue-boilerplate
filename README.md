# Express Vue MySQL Boilerplate

## Architecture

```text
├─packages/
|   ├─ app-config/
|   ├─ common/
|   ├─ server/
|   ├─ website/
```

* [**`app-config`**](packages/app-config): Application configurations.

* [**`common`**](packages/common): Common utilities (http status codes, http methods, node environment, etc).

* [**`server`**](packages/server): Express server with prisma schema.

* [**`website`**](packages/website): Vue.js application with Vite.

## Getting Started

Install `pm2` globally and install `typescript` with `pm2`:

```bash
npm install -g pm2
```

Install the project

```bash
yarn
```

### Running the application

> Make sure MySQL is running

Create a new **`.env`** or **`.env.production`** file in **`packages/app-config`** and fill it with the following keys in the **`.env.example`** file:

```text
PORT=5000

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=secret
MYSQL_DATABASE=test

DATABASE_URL=mysql://root:secret@localhost:3306/test # for prisma migration
```

Run migrations:

```bash
yarn dev:migrate

# For production
yarn migrate
```

Now to start the app:

```bash
yarn dev

# For production
yarn start
```

### Running only the server

```bash
yarn dev:server
```

### Running only the website

```bash
yarn dev:website
```

### Stopping the app

```bash
yarn dev:stop

# For production
yarn stop
```

### Building the app (including packages and type definitions)

```bash
yarn build
```
