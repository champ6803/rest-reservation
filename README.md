## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# integration tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Testing the API
# Initialize Tables:
POST /reservation/initialize
Body: { "tableCount": 10 }

# Reserve Tables:
POST /reservation/reserve
Body: { "customerCount": 6 }

# Cancel Reservation:
POST /reservation/cancel/:bookingId