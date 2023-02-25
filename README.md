# monsterdex-api

## API Documentation Url:
https://www.postman.com/warped-capsule-173581/workspace/public-api/documentation/14623147-41f7f072-c950-4ad1-807a-34bacc72166f


## Stack
- NodeJS Express(typescript) version 14
- Database Mongodb. I choose mongoDB because very simple and easy to implement in this project. It can be save and get embedded data
- Fo Upload Image, I'm using S3


## Run Locally

Clone the project

```bash
  git clone https://github.com/ranggabudipangestu/monsterdex-api
```

Go to the project directory

```bash
  cd monsterdex-api
```

Install dependencies

```bash
  npm install
```

Build the project

```bash
  npm run build
```

Setup your ENV Variable in .env file

```bash
MONGO_DATABASE_URL=
BASE_URL=http://localhost:4000
PORT=4000
AWS_ENDPOINT=YOUR_AWS_ENDPOINT
AWS_REGION=YOUR_AWS_ENDPOINT
AWS_BUCKETNAME=YOUR_AWS_BUCKETNAME
AWS_ACCESS_KEY=YOUR_AWS_ACCESS_KEY
AWS_SECRET_KEY=YOUR_AWS_SECRET_KEY
```

Run Seeder

```bash
  npm run seed
```

Start the server

```bash
  npm run start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

