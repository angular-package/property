# Packages

Useful packages based on the [angular.io](https://angular.io/).

| Package          | Description                                  | Status                                         | Readme                                                 |
| :--------------- | :------------------------------------------- | :--------------------------------------------: | :----------------------------------------------------- |
| change-detection | Improve application performance.             | *In Progress*                                  | [Readme][cd-readme-github]                             |
| prism            | `Prism` highlighter module.                  | *In Progress*                                  | [Readme][prism-readme-github]                          |
| property         | Features to handle object properties.        | *In Progress*                                  | [Readme][property-readme-github]                       |
| ui               | User interface.                              | *In Progress*                                  | [Github][ui-readme-github]                             |
| type             | Common types, type guards and type checkers. | [![npm version][type-npm-svg]][type-npm-badge] | [Github][type-readme-github] \| [npm][type-readme-npm] |

## angular-package/property

Features to handle properties.

[![npm version][property-npm-svg]][property-npm-badge]
[![GitHub issues](https://img.shields.io/github/issues/angular-package/property)][property-badge-issues]
[![GitHub forks](https://img.shields.io/github/forks/angular-package/property)][property-badge-forks]
[![GitHub stars](https://img.shields.io/github/stars/angular-package/property)][property-badge-stars]
[![GitHub license](https://img.shields.io/github/license/angular-package/property)][property-badge-license]

----

* [Installation](#installation)
* [Descriptor](#descriptor)
  * [Accessor](#accessordescriptors)
  * [Data](#data-descriptors)
  * [Interface](#descriptor-interface)
  * [Type](#descriptor-type)
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

## Descriptor

Descriptor features to import.

```typescript
// Class.
import {
  AccessorDescriptors,
  DataDescriptors,
  Descriptor,
  OwnDescriptor,
} from '@angular-package/property';
```

```typescript
// Interface.
import {
  AccessorDescriptor,
  DataDescriptor
} from '@angular-package/property';
```

```typescript
// Type.
import {
  ThisAccessorDescriptor
} from '@angular-package/property';
```

----

### AccessorDescriptors

**Description:**

Strictly define, set and store privately single accessor descriptor of [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type.

**Features:**

* The return value of the `get()` function is of a generic `Value` type.
* The parameter of the `set()` function is of a generic `Value` type.
* Use `this` of an `Obj` type in both `get()` and `set()` functions.
* Strictly define property accessor descriptor.
* Strictly set and store at the same time single property accessor descriptor.
* `set()` and `define()` method picks `configurable`, `enumerable`, `get`, `set` properties from the provided data.
* Get privately stored accessor descriptor defined by the `set()` method.

**Import:**

```typescript
import { AccessorDescriptors } from '@angular-package/property';
```

**Syntax:**

```typescript
AccessorDescriptors<Value, Obj = any> { ... }
```

----

### AccessorDescriptors static methods

#### `AccessorDescriptors.define()`

**Description:**

Returns **strictly** defined accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type, on `get` or `set` property detected.
Strictly means, method picks `configurable`, `enumerable`, `get`, `set` properties to define.

**Syntax:**

```typescript
static define<Value, Obj>(
  descriptor: ThisAccessorDescriptor<Value, Obj>,
  callback: ResultCallback = errorCallback
): ThisAccessorDescriptor<Value, Obj> { ... }
```

**Parameters:**

| Name: `type`                                     | Description                                                                                                                                                           |
| :----------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| descriptor: `ThisAccessorDescriptor<Value, Obj>` | An `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type to merge with the default descriptor                                           |
| callback: `ResultCallback`                       | An optional [`ResultCallback`][resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` with `get` or `set` property |

**Throws:**

Throws an [`Error`][js-error] if the `descriptor` is not an `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type, which means it doesn't contain `get` or `set` property.

**Returns:**

The **return value** is an `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type.

**Usage:**

```typescript
// Example usage.
import { AccessorDescriptors } from '@angular-package/property';

interface PersonShape {
  firstName: string;
}

class Person implements PersonShape {
  firstName = '';
}

class People {
  firstName!: string;
}

const person: Person = new Person();
const people: People = new People();

const firstNameDescriptor = AccessorDescriptors.define<string, Person>({
  get(): string {
    return people.firstName;
  },
  set(value: string): void {
    people.firstName = value;
  },
});

// Define the property `firstName` in the `person` object to link with the same property in the `people` object.
// Changes to the property `firstName` in the `person` object affect the property `firstName` in the `people` object.
Object.defineProperty(person, 'firstName', firstNameDescriptor);
```

----

### AccessorDescriptors Constructor

#### `AccessorDescriptors()`

**Description:**

Creates an instance, and optionally sets an accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type.

**Syntax:**

```typescript
AccessorDescriptors(descriptor?: ThisAccessorDescriptor<Value, Obj>)
```

**Parameters:**

| Name: `type`                                      | Description                                                                                                                          |
| :------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| descriptor?: `ThisAccessorDescriptor<Value, Obj>` | An optional `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type to initially set accessor descriptor |

**Usage:**

```typescript
// Example usage.
import { AccessorDescriptors } from '@angular-package/property';

interface PersonShape {
  firstName: string;
}

class Person implements PersonShape {
  firstName = '';
}

class People {
  firstName!: string;
}

const person: Person = new Person();
const people: People = new People();

const firstNameDescriptor = new AccessorDescriptors<string, Person>({
  get(): string {
    return people.firstName;
  },
  set(value: string): void {
    people.firstName = value;
  },
});
```

----

### AccessorDescriptors instance methods

#### `AccessorDescriptors.prototype.set()`

**Description:**

Strictly set with the default values, and store privately single accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type. Strictly means method picks `configurable`, `enumerable`, `get`, `set` properties.

**Syntax:**

```typescript
set(
  descriptor: ThisAccessorDescriptor<Value, Obj>,
  callback: ResultCallback = errorCallback
): this { ... }
```

**Parameters:**

| Name: `type`                                     | Description                                                                                                                                                           |
| :----------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| descriptor: `ThisAccessorDescriptor<Value, Obj>` | An `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type to set and store privately                                                     |
| callback: `ResultCallback`                       | A [`ResultCallback`][resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` containing the `get` or `set` property |

**Throws:**

Throws an [`Error`][js-error] if the `descriptor` is not an `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type, which means doesn't contain `get` or `set` property.

**Returns:**

The **return value** is the [`AccessorDescriptors`](#accessordescriptors) instance for the chaining.

**Usage:**

```typescript
// Example usage.
import { AccessorDescriptors } from '@angular-package/property';

interface PersonShape {
  firstName: string;
}

class Person implements PersonShape {
  firstName = '';
}

class People {
  firstName!: string;
}

const person: Person = new Person();
const people: People = new People();

const firstNameDescriptor = new AccessorDescriptors<string, Person>().set({
  configurable: false,
  enumerable: false,
  get(): string {
    return people.firstName;
  },
  set(value: string): void {
    people.firstName = value;
  },
});
```

----

### AccessorDescriptors instance properties

#### `AccessorDescriptors.prototype.get`

**Description:**

Get privately stored accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type defined by the [`set()`](#accessordescriptors-set-method) method.

**Syntax:**

```typescript
get get(): ThisAccessorDescriptor<Value, Obj> { ... }
```

**Usage:**

```typescript
// Example usage.
import { AccessorDescriptors } from '@angular-package/property';

interface PersonShape {
  firstName: string;
}

class Person implements PersonShape {
  firstName = '';
}

class People {
  firstName!: string;
}

const person: Person = new Person();
const people: People = new People();

const firstNameDescriptor = new AccessorDescriptors<string, Person>().set({
  configurable: false,
  enumerable: false,
  get(): string {
    return people.firstName;
  },
  set(value: string): void {
    people.firstName = value;
  },
});

// Define the property `firstName` in the `person` object to link with the same property in the `people` object.
// Changes to the property `firstName` in the `person` object affect the property `firstName` in the `people` object.
Object.defineProperty(person, 'firstName', firstNameDescriptor.get);
```

----

### DataDescriptors

**Description:**

Strictly define, set and store privately single property data descriptor of a [`DataDescriptor<Value>`][data-descriptor] interface.

**Features:**

* The `value` property is of a generic `Value` type.
* Strictly define property data descriptor.
* Strictly set and store at the same time single property data descriptor.
* `set()` and `define()` method picks `configurable`, `enumerable`, `writable`, `value` properties from the provided data.
* Get privately stored data descriptor defined by the `set()` method.

**Import:**

```typescript
import { DataDescriptors } from '@angular-package/property';
```

**Syntax:**

```typescript
DataDescriptors<Value> { ... }
```

----

### DataDescriptors static methods

#### `DataDescriptors.define()`

**Description:**

Returns **strictly** defined data descriptor of a [`DataDescriptor<Value>`][data-descriptor] interface, on `writable` or `value` property detected.
Strictly means, method picks `configurable`, `enumerable`, `writable`, `value` properties to define.

**Syntax:**

```typescript
static define<Value>(
  descriptor: DataDescriptor<Value>,
  callback: ResultCallback = errorCallback
): DataDescriptor<Value> { ... }
```

**Parameters:**

| Name: `type`                        | Description                                                                                                                                                                  |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| descriptor: `DataDescriptor<Value>` | An `object` of a [`DataDescriptor<Value>`][data-descriptor] interface to merge with the default descriptor                                                                   |
| callback: `ResultCallback`          | An optional [`ResultCallback`][resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` with `writable` or `value` property |

**Throws:**

Throws an [`Error`][js-error] if the `descriptor` is not an `object` of a [`DataDescriptor<Value>`][data-descriptor] interface, which means it doesn't contain `writable` or `value` property.

**Returns:**

The **return value** is an `object` of a [`DataDescriptor<Value>`][data-descriptor] type.

**Usage:**

```typescript
// Example usage.
import { DataDescriptors } from '@angular-package/property';

interface PersonShape {
  firstName: string;
}

class Person implements PersonShape {
  firstName = '';
}

class People {
  firstName!: string;
}

const person: Person = new Person();
const people: People = new People();

const firstNameDescriptor = DataDescriptor.define<string, Person>({
  get(): string {
    return people.firstName;
  },
  set(value: string): void {
    people.firstName = value;
  },
});

// Define the property `firstName` in the `person` object to link with the same property in the `people` object.
// Changes to the property `firstName` in the `person` object affect the property `firstName` in the `people` object.
Object.defineProperty(person, 'firstName', firstNameDescriptor);
```

----

### DataDescriptors Constructor

#### `DataDescriptors()`

**Description:**

Creates an instance, and optionally sets a data descriptor of a [`DataDescriptor<Value>`][data-descriptor] interface.

**Syntax:**

```typescript
DataDescriptors(descriptor?: DataDescriptor<Value>)
```

**Parameters:**

| Name: `type`                         | Description                                                                                                     |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| descriptor?: `DataDescriptor<Value>` | An optional `object` of a [`DataDescriptor<Value>`][data-descriptor] interface to initially set data descriptor |

**Usage:**

```typescript
// Example usage.
import { DataDescriptors } from '@angular-package/property';

interface PersonShape {
  firstName: string;
}

class Person implements PersonShape {
  firstName = '';
}

class People {
  firstName!: string;
}

const person: Person = new Person();
const people: People = new People();

const firstNameDescriptor = new DataDescriptors<string>({
  writable: false,
  value: 'not writable'
});
```

----

## Descriptor interface

### AccessorDescriptor

**Description:**

Descriptor with its unique optional `get()` and `set()` functions, of the `Value` type. For the accessor descriptor with also the object type, please use the type [`ThisAccessorDescriptor<Value, Obj>`](#thisaccessordescriptor). More about property descriptors [here][js-object-define-property].

```typescript
interface AccessorDescriptor<Value> extends CommonDescriptor {
  get?: () => Value;
  set?: (value: Value) => void;
}
```

### CommonDescriptor

**Description:**

Common keys `configurable` and `enumerable` of a `boolean` type for [accessor][this-accessor-descriptor] and [data descriptor][data-descriptor], picked from the default `PropertyDescriptor`. More about property descriptors [here][js-object-define-property].

**Syntax:**

```typescript
interface CommonDescriptor
  extends Pick<PropertyDescriptor, 'configurable' | 'enumerable'> {}
```

### DataDescriptor

**Description:**

Descriptor with its unique optional keys, `writable` of a `boolean` type and `value` of a generic `Value` type. More about property descriptors [here][js-object-define-property].

**Syntax:**

```typescript
interface DataDescriptor<Value> extends CommonDescriptor {
  writable?: boolean;
  value?: Value;
}
```

## Descriptor type

### ThisAccessorDescriptor

**Description:**

[`AccessorDescriptor`][accessor-descriptor] interface as a type cause of ease of use `this` of an `Obj` type in the `get()` and `set()` functions. More about property descriptors [here][js-object-define-property].

**Syntax:**

```typescript
type ThisAccessorDescriptor<Value, Obj> = AccessorDescriptor<Value> &
  ThisType<Obj>;
```

----

## GIT

### Commit

* [AngularJS Git Commit Message Conventions][git-commit-angular]
* [Karma Git Commit Msg][git-commit-karma]
* [Conventional Commits][git-commit-conventional]

### Versioning

[Semantic Versioning 2.0.0][git-semver]

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

MIT © angular-package ([license][property-badge-license])

----

[skeleton]: https://github.com/angular-package/skeleton

<!-- Update status -->
[fix]: https://img.shields.io/badge/-fix-red
[new]: https://img.shields.io/badge/-new-green
[update]: https://img.shields.io/badge/-update-red

<!-- Property: badges -->
[property-badge-forks]: https://github.com/angular-package/property/network
[property-badge-issues]: https://github.com/angular-package/property/issues
[property-badge-license]: https://github.com/angular-package/property/blob/master/LICENSE
[property-badge-stars]: https://github.com/angular-package/property/stargazers

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

<!-- Package: change-detection -->
[cd-readme-github]: https://github.com/angular-package/change-detection#readme

<!-- Package: prism -->
[prism-readme-github]: https://github.com/angular-package/prism#readme

<!-- Package: ui -->
[ui-readme-github]: https://github.com/angular-package/ui#readme

<!-- Property: type -->
[resultcallback]: https://github.com/angular-package/type#resultcallback
[accessor-descriptor]: #accessordescriptor
[data-descriptor]: #datadescriptor
[this-accessor-descriptor]: #thisaccessordescriptor

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/

<!-- Javascript  -->
[js-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[array-every]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
[array-some]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some

[classes]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

[bigint]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
[bigintconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/BigInt

[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
[booleanconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean/Boolean

[js-error]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

[js-function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
[function-rest-parameter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters

[js-getter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
[js-setter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set

[js-hasownproperty]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty

[js-in-operator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in

[js-number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[numberconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number

[js-object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[js-object-define-property]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

[primitive]: https://developer.mozilla.org/en-US/docs/Glossary/Primitive

[js-string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[stringconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String

[js-symbol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[symbolconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol

[js-undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined

<!-- Typescript -->
[ts-classes]: https://www.typescriptlang.org/docs/handbook/2/classes.html
[ts-function]: https://www.typescriptlang.org/docs/handbook/2/functions.html
[ts-interface]: https://www.typescriptlang.org/docs/handbook/interfaces.html#our-first-interface
