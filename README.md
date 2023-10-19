# monitoring-system-noc-node

The objective of the project is to create a monitoring system with node and typescript being built with clean architecture principles.

# dev

1. Clone the .env.template file to .env
2. Configure environment variables

```
MAILER_SERVICE=
MAILER_EMAIL=
MAILER_SECRET_KEY=

MONGO_URL=
MONGO_DB_NAME=
MONGO_USER=
MONGO_PASS=

SQL_SERVER_URL=
```

3. Initialize Docker databases with the following command

```
docker compose up -d
```

4. Excecute the following command for build the prisma client of the database

```
npx prisma migrate dev
```
