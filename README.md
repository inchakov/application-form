## Architecture
### Overview
The architecture of the project is based on the following diagram:
```
Client -> Handlers -> Services -> Repositories -> Database
```

### Server Components
* Fastify - Web server. Up to 2 times faster than Express.js
* TypeORM - ORM for Sqlite, PostgresSQL and other databases. Supports migrations, transactions, etc.
* TypeBox json schema definition and types for TypeScript
* Postman collection as API documentation and testing

### Client Components
* [React Hook Form](https://react-hook-form.com/) - Form library for React. Used to validate and submit forms.
* React bootstrap - Bootstrap components for React
* React router - Routing for React
* React AutoSave - Save application changes to server automatically


## Dev Run

### Install dependencies

### Run client
```bash
cd packages/client
npm install
npm run start
```

### Run server
```bash
cd packages/server
npm install
npm run dev
```


## Build and Run


```bash
echo 
echo Build Client...
echo -----------------------------
cd packages/client
npm install
npm run build

echo 
echo Build Server...
echo -----------------------------
cd ../../packages/server
npm install
npm run build

echo 
echo Run Server...
echo -----------------------------
npm run start
```
