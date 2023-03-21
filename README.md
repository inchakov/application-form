## Architecture
### Overview
The architecture of the project is based on the following diagram:
```
Handlers -> Services -> Repositories -> Database
```

### Server Components
* Fastify - Web server. Up to 2 times faster than Express.js
* TypeORM - ORM for Sqlite, PostgresSQL and other databases. Supports migrations, transactions, etc.

### Client Components
* https://react-hook-form.com/ - Form library for React. Used to validate and submit forms.
