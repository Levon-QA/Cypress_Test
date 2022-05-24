[![Package Status](https://img.shields.io/npm/v/@percy/cypress.svg)](https://www.npmjs.com/package/@percy/cypress) [![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/percy/percy-cypress) [![CircleCI](https://circleci.com/gh/percy/percy-cypress.svg?style=svg)](https://circleci.com/gh/percy/percy-cypress)
## Run tests:
* `cd` to project root directory in terminal.
* Run `npm i` to install dependencies.
* Set following environment variables.
```
export CYPRESS_BASE_URL=*
export CYPRESS_SC_API_URL=*
export CYPRESS_SC_EMAIL_TEAM_OWNER=*
export CYPRESS_SC_EMAIL_TEAM_MEMBER=*
export CYPRESS_SC_PASSWORD=*
export CYPRESS_SC_SEED_URL=*
export PERCY_TOKEN=*
```
* Run functional tests using `npm run cy:test` command.
* Run visual tests using `npm run cy:visual:test` command.

## Run tests:

* Remove these folders and files(if exist) before generating the report.
    * [./cypress/results](./cypress/results) folder.
    * [./mochawesome-report](./mochawesome-report) folder.
    * [./mochawesome.json](./mochawesome.json) file.
* Run `npm run cy:report` command.

## Frameworks and plugins:
* cypress.io
* faker.js
* percy.io
