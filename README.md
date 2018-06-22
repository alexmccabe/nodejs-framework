# Node Framework

This is the Node framework from which we will be basing all our Node applications on going forward.

## Installation

Clone the repo into the desired directory:

`git clone https://github.com/alexmccabe/nodejs-framework.git`

Install dependencies:

**Yarn:** `yarn install`

or

**NPM:** `npm install`

## Configuration

### Environment

The root of the application contains a `.env.example` file. This file should be renamed to `.env`. Environment files should not be commited to source control (they are ignored in `.gitignore`). Commiting an environment file would allow anyone with access to it to see sensitive credentials.

Once renamed, fill in all the required details (some are provided as empty), or add any new ones. These will become available in the `process.env` object inside your Node application.

#### Example

```sh
# .env

PORT="8080"
```

```js
// index.js

const port = process.env.PORT;
```

---

### Aditional Config

Additionally, each environment should have a `config/{env}.json` file. This is used for general configuration, that is not secure keys or Node requirement configuration.

Absolutely everything (except for API keys) should go in here. For example, MongoDB config _but not_ the MongoDB URI.

## Running the server

### Development

The development environment automatically starts `nodemon` which will reload the server when it detects changes to any file. This can be configured in `nodemon.json`.

`yarn dev`

or

`npm run dev`

---

### Production

To test the production environment run:

`yarn start`

or

`npm run start`

_Note: This will not load the .env file, so it may break when running locally._

## Deploying

As previously mentioned, the `.env` file should not be commited to version control, and as such should also not be deployed to a live server. As this is the case, all environment variables should be made available to the application from the hosting environment itself.

_Note: Heroku throws an error when there is both a `yarn.lock` and a `package-lock.json` in the root of the directory. So pick one and stick to it for the development process._

### Heroku

https://devcenter.heroku.com/articles/config-vars

### AWS Lambda

https://docs.aws.amazon.com/lambda/latest/dg/env_variables.html

## Concurrency

In a production environment, the app will automatically scale to fill as many threads as possible.

This is determined by the `WEB_CONCURRENCY` environment variable supplied by Heroku, or the number of cpus reported by the host os.

`process.env.WEB_CONCURRENCY || require('os').cpus().length`

In a non-production environment, the number of running threads is locked to `1`. This can be configured in `utilites/getCpuCount.js`.

## Developing

### Aliases

Aliases allow for shortcuts whilst developing. By default, this project comes with the root directory aliased to the `@` symbol. This alleviates the multiple `../../../` issue that can be found.

Using the `@` alias is very simple. In a file where you would normally want to require a file multiple directories back, just prefix the path with the symbol and work down.

```js
// `some/deep/nested/file.js`

const file = require('../../other/nested/file.js');
---
const file = require('@/some/other/nested/file.js');
```

_Note: This is just a visual preference. It is not required, but preferred._

Aliases can be configured inside `package.json`

```json
"_moduleAliases": {
    "@": "."
  },
```

Additionally, this project includes a `jsconfig.json` file which maps the `@` alias to the root path for VSCode. This allows you to keep the path completion whilst using the alias.

_Note: The `@` symbol is used throughout the project already, it is not recommended to change it._

---

### Concurrency

As previously mentioned, this application has concurrency built in. Two files are loaded on app boot.

The first is `app/onLaunch.js`. Code in this file is run from the **Master** thread, and only run once. This is useful for creating any additional configuration, or making one of requests to external APIs.

_Note: Currently the master thread does not communicate with the child threads, so configuration created would need to be stored somewhere else (database, cache, file, etc..)._

The second is `app/onThreadStart.js`. This is run every single time a new thread is run by the server, it is essentially a clone application running at the same time. The express server is booted here, and all routing is forwarded.

---

### Database

#### MongoDB

The database used in this application is MongoDB, and the server will not boot if a MongoDB URI is provided but cannot connect. If no MongoDB URI is provided, the server will boot anyway.

The MongoDB URI is available to the application on `process.env.MONGODB_URI`, and can be configured in the `.env` file.

MongoDB can be configured in the `config/{env}.json` file, and the options are automatically passed on initialisation.

#### Mongoose

This application uses the Mongoose framework on top of MongoDB. This provides a lot of benefit, and abstracts away some of the more complicated processes when using MongoDB.

Refer to the [Mongoose Documentation](http://mongoosejs.com/) to get an understanding of how it works.
