# Express Vue MySQL Boilerplate

## Architecture

```text
├─packages/
|   ├─ server/
|   ├─ website/
|   ├─ app-config/
```

**`server`**: Express server with MySQL database connection.

**`website`**: Vue.js application with Vite.

**`app-config`**: Application configurations.

## Getting Started

Install the project

```bash
yarn
```

### Running both the server and the website

> Make sure MySQL is running and the database and tables are created.

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

### Stopping the app

```bash
yarn dev:stop
```

### Running for production

```bash
yarn start
```

This will build the frontend and use pm2 serve as the static server then start the backend express server.

and to stop the app:

```bash
yarn stop
```
