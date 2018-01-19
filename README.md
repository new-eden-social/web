<h1 align="center">
  EVE Book WEB
</h1>

<h3 align="center">Hub for EVE Online community.</h3>

<div align="center">
  <a target="_blank" href="https://travis-ci.org/evebook/web/">
    <img src="https://travis-ci.org/evebook/web.svg?branch=master" alt="Travis Master branch" />
  </a>
  <a target="_blank" href="https://greenkeeper.io/">
    <img src="https://badges.greenkeeper.io/evebook/api.svg" alt="Greenkeeper" />
  </a>
  <a target="_blank" href='https://coveralls.io/github/evebook/web?branch=master'>
    <img src='https://coveralls.io/repos/github/evebook/web/badge.svg?branch=master' alt='Coverage Status' />
  </a>
  <a target="_blank" href="https://www.fuzzwork.co.uk/tweetfleet-slack-invites/">
    <img src="https://img.shields.io/badge/slack-%23evebook-ff69b4.svg" alt="Join Slack Chat" />
  </a>
  <div align="center">
    <a target="_blank" href="https://waffle.io/evebook/web">
    <img src="https://badge.waffle.io/evebook/web.svg?columns=all" alt="Waffle.io - Columns and their card count" />
  </a>
</div>

## What's it about
Project was started with an idea of creating social platform for players of EVE Online. A place where players could connect and share their experiences, fan art, images, videos, thoughts, propaganda...

Each "user" would be an actual EVE Online character and you could only login using game's credentials (SSO), this way characters could interact outside of eve online. Alliances and corporations could share propaganda videos/art and gather followers who could re-share and spread the word.

Whole platform would heavily relay on EVE Online API, so that you could send in game emails, money, create events (calendar). It would feel as an extension of game itself.

Think of it as combination of r/eve and twitter. A hub of EVE Online community.

### Releases
For branches `develop` and `master` servers are automaticly deployed and all data gets lost on each deploy.

| Branch  | API                       | WEB                       |
| ------- | ------------------------- | ------------------------- |
| develop | api.dev.evebook.online    |web.dev.evebook.online     |
| master  | api.staging.evebook.online|web.staging.evebook.online |
| release | api.evebook.online        |evebook.online             |

## Contributing
We would love to see you contribute. To learn how to best help project read [CONTRIBUTING](https://github.com/evebook/web/blob/master/CONTRIBUTING.md) and look in the [issues](https://github.com/evebook/web/issues). If you have any questions you can ask us on [slack #evebook](https://www.fuzzwork.co.uk/tweetfleet-slack-invites/).

## Wiki
Read more on idea, arhitecture, road map on our wiki [here](https://github.com/evebook/web/wiki/Idea).

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
