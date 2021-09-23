# Getting Started

Here you will understand how to run and setup the application.

## Running the application

> Make sure the MySQL server is running and database is created.

Install `pm2` globally:

```bash
npm install -g pm2
```

Then, install the dependencies:

```bash
yarn
```

Create a new **`.env`** and **`.env.production`** file in **`packages/app-config`** and fill it with the following keys in the **`.env.example`** file:

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

Running only the server

```bash
yarn dev:server
```

Running only the website

```bash
yarn dev:website
```

Stopping the app

```bash
yarn dev:stop

# For production
yarn stop
```

Building the app

```bash
yarn build
```
