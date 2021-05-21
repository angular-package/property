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

----

* [Installation](#installation)
* [Descriptor](#descriptor)
  * [Accessor](#accessordescriptors)
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

Descriptor features to import

```typescript
// Class.
import {
  AccessorDescriptors,
  DataDescriptors,
  Descriptor,
  GetOwnDescriptor
} from '@angular-package/property';
```

```typescript
// Interface.
import {
  AccessorDescriptor,
  DataDescriptor,
} from '@angular-package/property';
```

```typescript
// Type.
import {
  AnyDescriptor,
  AccessorThisDescriptor,
  ObjectPropertyDescriptors
} from '@angular-package/property';

```

#### AccessorDescriptors

Class to strictly set and store privately accessor descriptor.

```typescript
import { AccessorDescriptors } from '@angular-package/type';
```

```typescript
class AccessorDescriptors<Value, Obj = any> { ... }
```

----

##### AccessorDescriptors constructor

Creates [`AccessorDescriptors<Value, Obj = any>`](#accessordescriptors) instance and an optionally set accessor descriptor.

```typescript
  ...
  constructor(descriptor?: AccessorThisDescriptor<Value, Obj>) {
    if (is.object<AccessorThisDescriptor<Value, Obj>>(descriptor)) {
      this.set(descriptor);
    }
  }
  ...
```

| Parameter   | Type                                                            | Description          |
| :---------- | :-------------------------------------------------------------: | :------------------- |
| descriptor? | [`AccessorThisDescriptor<Value, Obj>`](#accessorthisdescriptor) | An optional [`AccessorDescriptor<Value>`][accessor-descriptor] type value to initially set |

----

##### AccessorDescriptors callback

Creates [`AccessorDescriptors<Value, Obj = any>`](#accessordescriptors) instance and an optionally set accessor descriptor.

```typescript
  ...
  public callback: ResultCallback = (result: boolean, value: any): boolean => {
    if (result === false) {
       throw new Error(`Accessor descriptor must be an \`AccessorThisDescriptor<Value, Obj>\` type, got value ${value}`);
    }
    return result;
  }
  ...
```

| Parameter | Type      | Description                                                                 |
| :-------- | :-------: | :-------------------------------------------------------------------------- |
| result    | `boolean` | Callback function for the `set()` method to check the inputted descriptor   |
| value     | `any`     | The `value` to display when error throws                                    |

| Throws |
| :----- |
| An error if the descriptor is not an [`AccessorThisDescriptor<Value, Obj>`](#accessorthisdescriptor) type |

| Return value |
| :----------- |
| The **return value** is a `boolean` indicating whether or not the descriptor is an [`AccessorThisDescriptor<Value, Obj>`](#accessorthisdescriptor) type. |

----

##### AccessorDescriptors set method

Strictly set with default values and store privately accessor descriptor that contains `get` and `set` properties. Strictly means method `set()` picks only accessor descriptor `configurable`, `enumerable`, `get`, `set` properties.

```typescript
  ...
  public set(descriptor: AccessorThisDescriptor<Value, Obj>, callback: ResultCallback = this.callback): this {
    if (guard.is.object(descriptor, callback)) {
        this.#descriptor = {
          ...this.#descriptor,
          ...pickProperty(descriptor, this.#pick),
        };
    }
    return this;
  }
  ...
```

| Parameter  | Type                                                            | Description          |
| :--------- | :-------------------------------------------------------------: | :------------------- |
| descriptor | [`AccessorThisDescriptor<Value, Obj>`](#accessorthisdescriptor) | A [`AccessorDescriptor`][accessor-descriptor] type value |
| callback   | [`ResultCallback`][resultcallback]=[`this.callback`][callback]  | A [`ResultCallback`][resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` |

| Throws |
| :----- |
| An error if the descriptor is not an [`AccessorThisDescriptor<Value, Obj>`](#accessorthisdescriptor) type |

| Return value |
| :----------- |
| The return value is an [`AccessorDescriptors<Value, Obj = any>`](#accessordescriptors) instance |

----

##### AccessorDescriptors get property

Get privately stored accessor descriptor defined by [`set()`](#accessordescriptors-set-method) method.

```typescript
  ...
  get get(): AccessorThisDescriptor<Value, Obj> {
    return this.#descriptor;
  }
  ...
```

The **return value** is [`AccessorThisDescriptor`](#accessorthisdescriptor) defined by [`set()`](#accessordescriptors-set-method) method.

----

## Interface

### AccessorDescriptor

Accessor descriptor with its unique `get()` and `set()` attributes and theirs generic `Value` type.

```typescript
interface AccessorDescriptor<Value> extends CommonDescriptor {
  get: (() => Value) | undefined;
  set: ((value: Value) => void) | undefined;
}
```

### CommonDescriptor

Common `configurable` and `enumerable` of a `boolean` type attributes picked from default `PropertyDescriptor` for accessor and data descriptor.

```typescript
interface CommonDescriptor extends Pick<PropertyDescriptor, 'configurable' | 'enumerable'> {}
```

### DataDescriptor

Data descriptor with its unique `writable`, `value` attributes, and a generic `Value` type for the `value`.

```typescript
interface DataDescriptor<Value> extends CommonDescriptor {
  writable: boolean;
  value: Value;
}
```

----

## Type

### AccessorThisDescriptor

Accessor descriptor structure with the `Value`, `Obj` type extended with `ThisType<Obj>` object to use `this` properly in its unique attributes.

```typescript
type AccessorThisDescriptor<Value, Obj = any> = AccessorDescriptor<Value> & ThisType<Obj>;
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
[accessor-descriptor]: #accessordescriptor

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
