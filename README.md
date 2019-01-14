# Attendance Tracker

A web app that allows you to manage and log attendances of teammembers.
_This app is still a WIP_

## How to use

### Dev

### Setup

#### PostgreSQL as a Service

The backend needs a PostgreSQL server to store data. If you don't have PostgreSQL installed you can
make a free account on [ElephantSQL](https://www.elephantsql.com/) and use that as your dev database.

Create the file `/server/.env` and enter the following content

```env
DATABASE_CONNECTION_URL=<your url>
```

alternatively you can also set the environment variable directly.

#### With PostgreSQL installed

Fill the following environment variables or enter them in the `/server/.env` file

```env
DATABASE_HOST=localhost
DATABASE_USER=<database user>
DATABASE_PASS=<database password>
DATABASE_NAME=<database name>
```

OR

```env
DATABASE_CONNECTION_URL=<your url>
```

### Server

```sh
cd server/
npm run dev
```

### Client

```sh
cd client/
npm run dev
```
