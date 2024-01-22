# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command


## Local Database Setup

```bash
# create database
$ npm run db:pg:create

# drop database
$ npm run db:pg:drop

# run database migrations
$ npm run db:pg:migrate:run

# revert database migrations
$ npm run db:pg:migrate:revert

# create database migrations
$ npm run db:pg:migrate:create -n src/infrastructure/database/postgres/migrations/<migration-name>

# generate database migrations
$ npm run db:pg:migrate:generate -n src/infrastructure/database/postgres/migrations/<migration-name>
```