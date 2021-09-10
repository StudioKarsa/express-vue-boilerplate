# Express Vue MySQL Boilerplate

## Architecture

```text
├─packages/
|   ├─ server/
|   ├─ website/
|   ├─ migrations/
|   ├─ app-config/
```

**`server`**: Express server with MySQL database connection.

**`website`**: Vue.js application with Vite.

**`migrations`**: MySQL database migrations.

**`app-config`**: Application configurations.

## Getting Started

Install the project

```bash
yarn
```

### Running both the server and the website

> Make sure MySQL is running and the database is created.
>
Create a new **`.env`** file in **`packages/server`** and fill it with the following keys in the **`.env.example`** file:

```text
PORT=5000

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=secret
MYSQL_DATABASE=yourdatabase
```

Now to start the app:

```bash
yarn dev
```

### Running only the server

```bash
yarn dev:server
```

### Running only the website

```bash
yarn dev:website
```
