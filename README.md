# Packages

Useful packages based on the [angular.io](https://angular.io/).

| Package          | Description                                   | Status        | Readme      |
| :--------------- | :-------------------------------------------- | :-----------: | :---------- |
| change-detection | Improve application performance.              | *In Progress* | [Readme][cd-readme-github] |
| prism            | `Prism` highlighter module.                   | *In Progress* | [Readme][prism-readme-github] |
| property         | Features to handle properties.                | *In Progress* | [Readme][property-readme-github] |
| ui               | User interface.                               | *In Progress* | [Github][ui-readme-github] |
| type             | Common types, type guards and type checkers.  | [![npm version][type-npm-svg]][type-npm-badge] | [Github][type-readme-github] \| [npm][type-readme-npm] |

## angular-package/property

Features to handle properties.

[![npm version][property-npm-svg]][property-npm-badge]
[![GitHub issues](https://img.shields.io/github/issues/angular-package/property)][issues]
[![GitHub forks](https://img.shields.io/github/forks/angular-package/property)][forks]
[![GitHub stars](https://img.shields.io/github/stars/angular-package/property)][stars]
[![GitHub license](https://img.shields.io/github/license/angular-package/property)][license]

```typescript
// Main features.
import { getProperty, PropertyClass, setProperty, StoreOriginalClass } from '@angular-package/property';
```

```typescript
// Bind decorators.
import { BindParam, BindProperties } from '@angular-package/property';
```

```typescript
// Types.
import { GetterCallback, SetterCallback } from '@angular-package/property';
```

----

* [Installation](#installation)
* [Descriptor](#descriptor)
  * [Accessor](#accessor-descriptors)
  * [Data](#data-descriptors)
  * [Interface](#descriptor)
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

----

### Descriptor

#### Accessor

Class to strictly define accessor descriptor and store it privately.

```typescript
import { AccessorDescriptors } from '@angular-package/type';
```

```typescript
export class AccessorDescriptors<Value, Obj = any> {
  #pick: (keyof AccessorThisDescriptor<Value, Obj>)[] = ['configurable', 'enumerable', 'get', 'set'];
  #descriptor: AccessorThisDescriptor<Value, Obj> = ACCESSOR_DESCRIPTOR;

  get get(): AccessorThisDescriptor<Value, Obj> {
    return this.#descriptor;
  }

  constructor(descriptor?: AccessorThisDescriptor<Value, Obj>) {
    if (is.object<AccessorThisDescriptor<Value, Obj>>(descriptor)) {
      this.set(descriptor);
    }
  }

  public set(descriptor: AccessorThisDescriptor<Value, Obj>): this {
    if (guard.is.object(descriptor)) {
        this.#descriptor = {
          ...this.#descriptor,
          ...pickProperty(descriptor, this.#pick),
        };
    }
    return this;
  }
}

```

##### Descriptor accessor set method

Set accessor descriptor that contains `get` and `set` properties.

```typescript
public set(descriptor: AccessorThisDescriptor<Value, Obj>): this;
```

| Parameter  | Type                                                            | Description          |
| :--------- | :-------------------------------------------------------------: | :------------------- |
| descriptor | `AccessorThisDescriptor<Value, Obj>`                            | A [`AccessorDescriptor`][accessor-descriptor] type value |
| callback   | [`ResultCallback`][resultcallback]=[`this.callback`][callback]  | A [`ResultCallback`][resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` |

The **return value** is a `boolean` indicating whether or not the `value` is an [`Array`][array].

```typescript
// Example usage
import { isArray } from '@angular-package/type';

const ARRAY_NUMBER = [1, 2, 3];
const ARRAY_STRING = ['a', 'b', 'c'];

isArray(ARRAY_NUMBER); // true
isArray<string>(ARRAY_STRING); // true

```

----

## GIT

### Commit

* [AngularJS Git Commit Message Conventions][angular-commit]
* [Karma Git Commit Msg][karma-commit]
* [Conventional Commits][conventional-commit]

### Versioning

[Semantic Versioning 2.0.0][semver]

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

MIT © angular-package ([license][license])

----

<!-- Changes -->
[new]: https://img.shields.io/badge/-new-green
[update]: https://img.shields.io/badge/-update-red

<!-- Badges -->
[forks]: https://github.com/angular-package/property/network
[issues]: https://github.com/angular-package/property/issues
[license]: https://github.com/angular-package/property/blob/main/LICENSE
[stars]: https://github.com/angular-package/property/stargazers

<!-- Type -->
[resultcallback]: #resultcallback

<!-- Package: property -->
[property-npm-svg]: https://badge.fury.io/js/%40angular-package%property.svg
[property-npm-badge]: https://badge.fury.io/js/%40angular-package%property
[property-readme-github]: https://github.com/angular-package/property#readme
[property-readme-npm]: https://www.npmjs.com/package/@angular-package/property#readme

<!-- Package: type -->
[type-npm-svg]: https://badge.fury.io/js/%40angular-package%2Ftype.svg
[type-npm-badge]: https://badge.fury.io/js/%40angular-package%2Ftype
[type-readme-github]: https://github.com/angular-package/type#readme
[type-readme-npm]: https://www.npmjs.com/package/@angular-package/type#readme

<!-- Other packages -->
[cd-readme-github]: https://github.com/angular-package/change-detection#readme
[prism-readme-github]: https://github.com/angular-package/prism#readme
[ui-readme-github]: https://github.com/angular-package/ui#readme

<!-- GIT -->
[angular-commit]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[karma-commit]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[conventional-commit]: https://www.conventionalcommits.org/en/v1.0.0/
[semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/

<!-- Javascript  -->
[array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

[classes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

[bigint]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
[bigintconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/BigInt

[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[booleanconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean

[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

[hasownproperty]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty

[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[numberconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number

[object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[primitive]: https://developer.mozilla.org/en-US/docs/Glossary/Primitive

[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[stringconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String

[symbol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[symbolconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol
