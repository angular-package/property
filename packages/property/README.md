# Packages

Useful packages based on the [angular.io](https://angular.io/).

| Package          | Description                                                                              | Status        | Readme      |
|------------------|------------------------------------------------------------------------------------------|---------------|-------------|
| change-detection | Improve application performance.                                                         | *In Progress* | [Readme][cd-readme-github] |
| prism            | `Prism` highlighter module.                                                              | *In Progress* | [Readme][prism-readme-github] |
| property         | Features to handle properties.                                                           | *In Progress* | [Readme][property-readme-github] |
| ui               | User interface based on **[Spectre.css](https://github.com/picturepan2/spectre)**.       | *In Progress* | [Github][ui-readme-github] |
| type             | Common types, type guards and checkers.                                                  | [![npm version][type-npm-svg]][type-npm-badge] | [Github][type-readme-github] \| [npm][type-readme-npm] |

# angular-package/property
Features to handle properties.

[![npm version](https://badge.fury.io/js/%40angular-package%property.svg)](https://badge.fury.io/js/%40angular-package%property)
[![GitHub issues](https://img.shields.io/github/issues/angular-package/property)](https://github.com/angular-package/property/issues)
[![GitHub forks](https://img.shields.io/github/forks/angular-package/property)](https://github.com/angular-package/property/network)
[![GitHub stars](https://img.shields.io/github/stars/angular-package/property)](https://github.com/angular-package/property/stargazers)
[![GitHub license](https://img.shields.io/github/license/angular-package/property)](https://github.com/angular-package/property/blob/main/LICENSE)

```typescript
// Main features.
export { getProperty, PropertyClass, setProperty, StoreOriginalClass } from '@angular-package/property';
```
```typescript
// Bind decorators.
export { BindParam, BindProperties } from '@angular-package/property';
```
```typescript
// Types.
export { GetterCallback, SetterCallback } from '@angular-package/property';
```

----

* [Installation](#installation)
* [Git](#git)
  * [Commit](#commit)
  * [Versioning](#versioning)
* [License](#license)

----

## Installation

Install `@angular-package/property` package with command:

```bash
npm i --save @angular-package/property
```

## GIT
### Commit

* [AngularJS Git Commit Message Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
* [Karma Git Commit Msg](http://karma-runner.github.io/0.10/dev/git-commit-msg.html)
* [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

### Versioning

[Semantic Versioning 2.0.0](http://semver.org/)

**Given a version number MAJOR.MINOR.PATCH, increment the:**

* MAJOR version when you make incompatible API changes,
* MINOR version when you add functionality in a backwards-compatible manner, and
* PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?
>The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

>If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © angular-package ([license](https://github.com/angular-package/property/blob/main/LICENSE))

[new]: https://img.shields.io/badge/-new-red

[cd-readme-github]: https://github.com/angular-package/change-detection#readme

[prism-readme-github]: https://github.com/angular-package/prism#readme

[property-readme-github]: https://github.com/angular-package/property#readme

[ui-readme-github]: https://github.com/angular-package/ui#readme

[type-npm-svg]: https://badge.fury.io/js/%40angular-package%2Ftype.svg
[type-npm-badge]: https://badge.fury.io/js/%40angular-package%2Ftype
[type-readme-github]: https://github.com/angular-package/type#readme
[type-readme-npm]: https://www.npmjs.com/package/@angular-package/type#readme
