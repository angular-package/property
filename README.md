# angular-package

<a href='https://angular-package.dev' target='_blank'>
  <img align="right"  width="92" height="92" src="https://avatars.githubusercontent.com/u/31412194?s=400&u=c9929aa36826318ccac8f7b84516e1ce3af7e21c&v=4" />
</a>

The angular-package supports the development process of [angular](https://angular.io)-based applications in varied ways through the thoughtful, reusable, easy-to-use small pieces of code called packages.

## angular-package/property

Features to handle properties.

<!-- npm badge -->
[![npm version][property-npm-badge-svg]][property-npm-badge]
<!-- GitHub badges -->
[![GitHub issues][property-badge-issues]][property-issues]
[![GitHub forks][property-badge-forks]][property-forks]
[![GitHub stars][property-badge-stars]][property-stars]
[![GitHub license][property-badge-license]][property-license]
<!-- Sponsors badges -->
[![GitHub sponsors][github-badge-sponsor]][github-sponsor-link]
[![Support me on Patreon][patreon-badge]][patreon-link]

```typescript
export {
  // Class.
  Property,
  WrapProperty,
} from './lib';

export {
  // Class.
  Descriptor,
  Descriptors,
  // Interface.
  AccessorDescriptor,
  CommonDescriptor,
  DataDescriptor,
  // Type.
  ThisAccessorDescriptor,
} from './descriptor';

export { GetterCallback, SetterCallback } from './type';
```

## Table of contents

* [Skeleton](#skeleton)
* [Installation](#installation)
* [Callback](#callback)
* [Package](#package)
  * [Descriptor](#descriptor-package)
    * Class
      * [`Descriptor`](#descriptor)
      * [`AccessorDescriptors`](#accessordescriptors)
      * [`DataDescriptors`](#datadescriptors)
    * [Interface](#descriptor-interface)
    * [Type](#descriptor-type)
* [Git](#git)
  * [Commit](#commit)
  * [Versioning](#versioning)
* [License](#license)
* [Packages](#packages)

## How angular-package understands

Checks
> Is to check the provided value to be **the same** as **expected**.

Type guard (constrain)
> Constrains the parameter type to **not let** input **unexpected** value in the **code editor**.

Guards
> Is a **combination** of both above, **constrains** the type of the parameter in the **code editor**, and checks its argument.

Sets
> Sets the provided value in the `object`.

Defines
> Returns defined value from the method, instead of storing it in the `object`.

## Skeleton

This package was built by the [library skeleton][skeleton] which was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.1.

Copy this package to the `packages/core` folder of the [library skeleton][skeleton] then run the commands below.

### Build

Run `ng build core` to build the package. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test core` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Installation

Install `@angular-package/property` package with command:

```bash
npm i --save @angular-package/property
```

----

## Callback

Wrapper for the [`ResultCallback`][package-type-resultcallback] type function to throw an [`Error`][js-error] with the specified message on the specified `false` or `true` state.

```typescript
const errorCallback: ErrorCallback  = (
  message: string,
  on: boolean = false
): ResultCallback => {
  return (result: boolean, value: any): boolean => {
    if (result === on) {
      throw new Error(
        `${message}, got value ${
          is.object(value) ? JSON.stringify(value) : value
        }`
      );
    }
    return result;
  };
};
```

----

## Package

### Descriptor package

Descriptor features to import.

```typescript
// Class.
import {
  AccessorDescriptors,
  DataDescriptors,
  Descriptor,
} from '@angular-package/property';
```

```typescript
// Function.
import {
  getDescriptor,
  getDescriptors,
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
  ThisAccessorDescriptor,
} from '@angular-package/property';
```

----

### `Descriptor`

Handles object property descriptor.

**Features:**

* Strictly defines accessor and data descriptor with the [`defineAccessor()`][descriptor-defineaccessor] and [`defineData()`][descriptor-definedata] static methods.
* Strictly sets, and stores accessor and data descriptor with the `Descriptor` instance respectively `set.accessor()` and `set.data()` methods of the instance.
* Get privately stored accessor descriptor defined by the `set.accessor()` method by using `get.accessor` property of the instance.
* Get privately stored data descriptor defined by the `set.data()` method by using `get.data` property of the instance.

> Strictly means, it guards provided descriptor by checking it against its unique keys and by picking only properties that belong to the appropriate descriptor.

```typescript
Descriptor<Value, Obj = any> { ... }
```

### Descriptor static methods

### `Descriptor.defineAccessor()`

Returns defined accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type, on `get` or `set` property detected.

```typescript
static defineAccessor<Value, Obj>(
  descriptor: ThisAccessorDescriptor<Value, Obj>,
  callback?: ResultCallback
): ThisAccessorDescriptor<Value, Obj> { ... }
```

**Generic type variables:**

| Name    | Description |
| :------ | :---------- |
| `Value` | Guards the value type of the `get()` and `set()` methods of the `descriptor` object, and in the return type `ThisAccessorDescriptor<Value, Obj>` |
| `Obj`   | Gives the possibility to use the `this` keyword that refers to the `Obj` variable inside the `get()` and `set()` methods of the `descriptor` object, and in the return type `ThisAccessorDescriptor<Value, Obj>` |

**Parameters:**

| Name: `type`                                     | Description                                                                                                                                                             |
| :----------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| descriptor: `ThisAccessorDescriptor<Value, Obj>` | An `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type to define with the default values of the [`CommonDescriptor`][common-descriptor] |
| callback?: `ResultCallback`                      | An optional [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` with `get` or `set` property, by default it uses [`accessorCallback()`][accessordescriptors-accessorcallback] function |

**Throws:**

Throws an [`Error`][js-error] if the `descriptor` is not an `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type, which means it doesn't contain `get` or `set` property.

**Returns:**

The **return value** is an `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type.

**Usage:**

```typescript
// Example usage.
import { Descriptor } from '@angular-package/property';

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

const firstNameDescriptor = Descriptor.defineAccessor<string, Person>({
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
Object.defineProperty(person, 'firstName', firstNameDescriptor);
```

### `Descriptor.defineData()`

Returns defined data descriptor of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface], on `writable` or `value` property detected.

```typescript
static defineData<Value>(
  descriptor: DataDescriptor<Value>,
  callback: ResultCallback = dataCallback
): DataDescriptor<Value> { ... }
```

**Generic type variables:**

| Name    | Description |
| :------ | :---------- |
| `Value` | Guards the `value` property from the `descriptor` object, and the return type of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface] |

**Parameters:**

| Name: `type`                        | Description                                                                                                                                                            |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| descriptor: `DataDescriptor<Value>` | An `object` of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface] to define with the default values of the [`CommonDescriptor`][common-descriptor] |
| callback?: `ResultCallback`         | An optional [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` with `writable` or `value` property, by default it uses [`dataCallback()`](#datacallback) function |

**Throws:**

Throws an [`Error`][js-error] if the `descriptor` is not an `object` of a [`DataDescriptor<Value>`][data-descriptor] type, which means it doesn't contain `writable` or `value` property.

**Returns:**

The **return value** is an `object` of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface].

**Usage:**

```typescript
// Example usage.
import { Descriptor } from '@angular-package/property';

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

const firstNameDescriptor = Descriptor.defineData<string>({
  configurable: false,
  enumerable: false,
  writable: false,
  value: people.firstName
});

// Defines the property `firstName` of a type string in the `person` object with the same value as the property in the `people` object.
Object.defineProperty(person, 'firstName', firstNameDescriptor);
```

### `Descriptor.fromObject()`

Returns property descriptors from the specified detected object.

```typescript
static fromObject<Obj extends object>(
  object: Obj
): ObjectPropertyDescriptors<Obj> | undefined { ... }
```

**Generic type variables:**

| Name    | Description |
| :------ | :---------- |
| `Value` | Constraints the `value` property from the `descriptor` object, and the return type of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface] |

**Parameters:**

| Name: `type`                        | Description                                                                                                                                                            |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| descriptor: `DataDescriptor<Value>` | An `object` of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface] to define with the default values of the [`CommonDescriptor`][common-descriptor] |
| callback?: `ResultCallback`         | An optional [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` with `writable` or `value` property, by default it uses [`dataCallback()`](#datacallback) function |

**Throws:**

Throws an [`Error`][js-error] if the `descriptor` is not an `object` of a [`DataDescriptor<Value>`][data-descriptor] type, which means it doesn't contain `writable` or `value` property.

**Returns:**

The **return value** is an `object` of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface].

**Usage:**

```typescript
// Example usage.
import { Descriptor } from '@angular-package/property';

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

const firstNameDescriptor = Descriptor.fromObject();

// Defines the property `firstName` of a type string in the `person` object with the same value as the property in the `people` object.
Object.defineProperty(person, 'firstName', firstNameDescriptor);
```

### `Descriptor.fromProperty()`

Returns property descriptors from the specified detected object.

```typescript
static fromObject<Obj extends object>(
  object: Obj
): ObjectPropertyDescriptors<Obj> | undefined { ... }
```

**Generic type variables:**

| Name    | Description |
| :------ | :---------- |
| `Value` | Guards the `value` property from the `descriptor` object, and the return type of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface] |

**Parameters:**

| Name: `type`                        | Description                                                                                                                                                            |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| descriptor: `DataDescriptor<Value>` | An `object` of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface] to define with the default values of the [`CommonDescriptor`][common-descriptor] |
| callback?: `ResultCallback`         | An optional [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` with `writable` or `value` property, by default it uses [`dataCallback()`](#datacallback) function |

**Throws:**

Throws an [`Error`][js-error] if the `descriptor` is not an `object` of a [`DataDescriptor<Value>`][data-descriptor] type, which means it doesn't contain `writable` or `value` property.

**Returns:**

The **return value** is an `object` of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface].

**Usage:**

```typescript
// Example usage.
import { Descriptor } from '@angular-package/property';

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

const firstNameDescriptor = Descriptor.fromObject();

// Defines the property `firstName` of a type string in the `person` object with the same value as the property in the `people` object.
Object.defineProperty(person, 'firstName', firstNameDescriptor);
```

----

### `AccessorDescriptors`

Strictly defines, sets, and stores privately property accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type.

> Strictly means, methods picks `configurable`, `enumerable`, `get`, `set` properties from the provided `descriptor` object.

**Features:**

* Guarded process of defining the object descriptor, but properties are not being checked against proper values.
* Strictly defines property accessor descriptor.
* Strictly sets, and stores at the same time property accessor descriptor.
* Accessor descriptor is of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type:
 The return value of the `get()` function is of a generic `Value` type.
 The parameter of the `set()` function is of a generic `Value` type.
 Keyword `this` refers to an `Obj` variable in both `get()` and `set()` functions.
* Method [`set()`][accessordescriptors-prototype-set] of the instance and static [`define()`][accessordescriptors-define] picks `configurable`, `enumerable`, `get`, `set` properties from the provided data.
* Get privately stored accessor descriptor defined by the [`set()`][accessordescriptors-prototype-set] method of the instance.

```typescript
AccessorDescriptors<Value, Obj = any> { ... }
```

### `AccessorDescriptors` static methods

### `AccessorDescriptors.define()`

Returns defined accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type, on `get` or `set` property detected.

```typescript
static define<Value, Obj>(
  descriptor: ThisAccessorDescriptor<Value, Obj>,
  callback?: ResultCallback
): ThisAccessorDescriptor<Value, Obj> { ... }
```

**Generic type variables:**

| Name    | Description |
| :------ | :---------- |
| `Value` | Guards the value type of the `get()` and `set()` functions of the `descriptor` object, and the return type [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] |
| `Obj`   | Gives the possibility to use the `this` keyword that refers to the `Obj` variable inside the `get()` and `set()` functions of the `descriptor` object, and in the return type [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] |

**Parameters:**

| Name: `type`                                     | Description                                                                                                                                                                                                                                  |
| :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `descriptor: ThisAccessorDescriptor<Value, Obj>` | An `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type to define with the default values of the [`CommonDescriptor`][common-descriptor]                                                                      |
| `callback?: ResultCallback`                      | An optional [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` with `get` or `set` property, by default it uses [`accessorCallback()`][accessordescriptors-accessorcallback] function |

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

### `AccessorDescriptors` Constructor

### `AccessorDescriptors()`

Creates an instance, and optionally sets an accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type.

```typescript
AccessorDescriptors<Value, Obj>(descriptor?: ThisAccessorDescriptor<Value, Obj>)
```

**Generic type variables:**

| Name    | Description |
| :------ | :---------- |
| `Value` | Guards the value type of the `get()` and `set()` functions of the `descriptor` object |
| `Obj`   | Gives the possibility to use the `this` keyword that refers to the `Obj` variable inside the `get()` and `set()` functions of the `descriptor` object |

**Parameters:**

| Name: `type`                                      | Description                                                                                                                          |
| :------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| `descriptor?: ThisAccessorDescriptor<Value, Obj>` | An optional `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type to initially set accessor descriptor |

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

### `AccessorDescriptors` instance methods

### `AccessorDescriptors.prototype.set()`

[Strictly][accessordescriptors] sets with the last saved descriptor values, and stores privately accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type.

```typescript
set(
  descriptor: ThisAccessorDescriptor<Value, Obj>,
  callback?: ResultCallback
): this { ... }
```

**Parameters:**

| Name: `type`                                     | Description                                                                                                                                               |
| :----------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `descriptor: ThisAccessorDescriptor<Value, Obj>` | An `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] [interface][ts-interface], to set with the last saved descriptor values |
| `callback?: ResultCallback`                      | An optional [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` containing the `get` or `set` property, by default it uses [`accessorCallback()`][accessordescriptors-accessorcallback] from the static `guard()` method |

**Throws:**

Throws an [`Error`][js-error] if the `descriptor` is not an `object` of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type, which means doesn't contain `get` or `set` property.

**Returns:**

The **return value** is the [`AccessorDescriptors`][accessordescriptors] instance for the chaining.

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

### `AccessorDescriptors` instance properties

### `AccessorDescriptors.prototype.get`

Get privately stored accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type defined by the [`set()`][accessordescriptors-prototype-set] method.

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

### `DataDescriptors`

Strictly defines, sets, and stores privately property data descriptor of a [`DataDescriptor<Value>`][data-descriptor] interface.

> Strictly means, data descriptor of a [`DataDescriptor<Value>`][data-descriptor] is type guarded and methods picks `configurable`, `enumerable`, `writable`, `value` properties from the provided `descriptor` object.

**Features:**

* Data descriptor is of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface]:
 The `value` property is of a generic `Value` type.
* Guarded process of defining the object descriptor, but properties are not being checked against proper values.
* Strictly defines property data descriptor.
* Strictly sets, and stores at the same time property data descriptor.
* Method [`set()`][datadescriptors-prototype-set] of the instance and static [`define()`][datadescriptors-define] picks `configurable`, `enumerable`, `writable`, `value` properties from the provided data.
* Get privately stored data descriptor defined by the [`set()`][datadescriptors-prototype-set] method of the instance.

```typescript
DataDescriptors<Value> { ... }
```

### `DataDescriptors` static methods

### `DataDescriptors.define()`

Returns [**strictly**][datadescriptors] defined data descriptor of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface], on `writable` or `value` property detected.

```typescript
static define<Value>(
  descriptor: DataDescriptor<Value>,
  callback?: ResultCallback
): DataDescriptor<Value> { ... }
```

**Generic type variables:**

| Name    | Description |
| :------ | :---------- |
| `Value` | Constrains the `value` property from the `descriptor` object, and the return type of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface] |

**Parameters:**

| Name: `type`                        | Description                                                                                                                                                          |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| descriptor: `DataDescriptor<Value>` | An `object` of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface], to set with the default values of the [`CommonDescriptor`][common-descriptor] |
| callback?: `ResultCallback`         | An optional [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` with `writable` or `value` property, by default it uses [`dataCallback()`][datadescriptors-datacallback] function from the static `guard()` method |

**Throws:**

Throws an [`Error`][js-error] if the `descriptor` is not an `object` of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface], which means it doesn't contain `writable` or `value` property.

**Returns:**

The **return value** is an `object` of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface].

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

### `DataDescriptors` Constructor

### `DataDescriptors()`

Creates an instance, and optionally sets a data descriptor of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface].

```typescript
DataDescriptors<Value>(descriptor?: DataDescriptor<Value>)
```

**Generic type variables:**

| Name    | Description |
| :------ | :---------- |
| `Value` | Guards the `value` property from the `descriptor` object |

**Parameters:**

| Name: `type`                         | Description                                                                                                                     |
| :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `descriptor?: DataDescriptor<Value>` | An optional `object` of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface] to initially set data descriptor |

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

const firstNameDescriptor = new DataDescriptors<string>({ // Initialize
  writable: false,
  value: 'not writable'
});
```

### `DataDescriptors` instance methods

### `DataDescriptors.prototype.set()`

[Strictly][datadescriptors] sets with the last saved descriptor values, and stores privately data descriptor of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface].

```typescript
set(
  descriptor: DataDescriptor<Value>,
  callback?: ResultCallback
): this { ... }
```

**Generic type variables:**

| Name    | Description                                              |
| :------ | :------------------------------------------------------- |
| `Value` | Guards the `value` property from the `descriptor` object |

**Parameters:**

| Name: `type`                        | Description                                                                                                                  |
| :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `descriptor: DataDescriptor<Value>` | An `object` of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface], to set with the last saved descriptor |
| `callback?: ResultCallback`         | An optional [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` containing the `writable` or `value` property, by default it uses [`dataCallback()`][datadescriptors-datacallback] function from the static `guard()` method |

**Throws:**

Throws an [`Error`][js-error] if the `descriptor` is not an `object` of a [`DataDescriptor<Value>`][data-descriptor] type, which means doesn't contain `writable` or `value` property.

**Returns:**

The **return value** is the [`DataDescriptors`][datadescriptors] instance for the chaining.

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

const firstNameDescriptor = new DataDescriptors<string>()
.set({
  configurable: false,
  enumerable: false,
  writable: false,
  value: people.firstName
});

// Defines the property `firstName` in the `person` object with the same value as the property in the `people` object.
Object.defineProperty(person, 'firstName', firstNameDescriptor.get);
```

### `DataDescriptors` instance properties

### `DataDescriptors.prototype.get`

Get privately stored data descriptor of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface] defined by the instance [`set()`][datadescriptors-prototype-set] method.

```typescript
get get(): DataDescriptor<Value> { ... }
```

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

const firstNameDescriptor = new DataDescriptors<string>()
.set({
  configurable: false,
  enumerable: false,
  writable: false,
  value: people.firstName
})
// After set, get the value.
.get;

// Defines the property `firstName` in the `person` object with the same value as the property in the `people` object.
Object.defineProperty(person, 'firstName', firstNameDescriptor);
```

----

### Descriptor interface

### AccessorDescriptor

Descriptor with its unique optional `get()` and `set()` functions, of the `Value` type. For the accessor descriptor with also the object type, please use the type [`ThisAccessorDescriptor<Value, Obj>`](#thisaccessordescriptor). More about property descriptors [here][js-object-define-property].

```typescript
interface AccessorDescriptor<Value> extends CommonDescriptor {
  get?: () => Value;
  set?: (value: Value) => void;
}
```

### CommonDescriptor

Common keys `configurable` and `enumerable` of a `boolean` type for [accessor][this-accessor-descriptor] and [data descriptor][data-descriptor], picked from the default `PropertyDescriptor`. More about property descriptors [here][js-object-define-property].

```typescript
interface CommonDescriptor
  extends Pick<PropertyDescriptor, 'configurable' | 'enumerable'> {}
```

### DataDescriptor

Descriptor with its unique optional keys, `writable` of a `boolean` type and `value` of a generic `Value` type. More about property descriptors [here][js-object-define-property].

```typescript
interface DataDescriptor<Value> extends CommonDescriptor {
  writable?: boolean;
  value?: Value;
}
```

----

### Descriptor type

### ThisAccessorDescriptor

[`AccessorDescriptor`][accessor-descriptor] [interface][ts-interface] as a type cause of ease of use `this` of an `Obj` type in the `get()` and `set()` functions. More about property descriptors [here][js-object-define-property].

```typescript
type ThisAccessorDescriptor<Value, Obj> = AccessorDescriptor<Value> &
  ThisType<Obj>;
```

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

MIT © angular-package ([license][property-license])

## Packages

Useful and simple to use packages based on the [angular.io][angulario].

| Package                              | Description                                        | Status                                                       |
| :----------------------------------- | :------------------------------------------------- | -----------------------------------------------------------: |
| [change-detection][cd-github-readme] | Improve application performance.                   | [![npm version][cd-npm-badge-svg]][cd-npm-badge]             |
| [core][core-github-readme]           | Core features.                                     | [![npm version][core-npm-badge-svg]][core-npm-badge]         |
| [prism][prism-github-readme]         | `Prism` highlighter module.                        | [![npm version][prism-npm-badge-svg]][prism-npm-badge]       |
| [property][property-github-readme]   | Features to handle object properties.              | [![npm version][property-npm-badge-svg]][property-npm-badge] |
| [reactive][reactive-github-readme]   | Automatize process of creating some rxjs features. | [![npm version][reactive-npm-badge-svg]][reactive-npm-badge] |
| [ui][ui-github-readme]               | User interface.                                    | *In Progress*                                                |
| [type][type-github-readme]           | Common types, type guards and type checkers.       | [![npm version][type-npm-badge-svg]][type-npm-badge]         |

> Click on the package name to visit the package GitHub README.md


<!-- Funding -->
[github-badge-sponsor]: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&link=https://github.com/sponsors/angular-package
[github-sponsor-link]: https://github.com/sponsors/angular-package
[patreon-badge]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dsciborrudnicki%26type%3Dpatrons&style=flat
[patreon-link]: https://patreon.com/sciborrudnicki

[angulario]: https://angular.io
[skeleton]: https://github.com/angular-package/skeleton

<!-- Update status -->
[fix]: https://img.shields.io/badge/-fix-red
[new]: https://img.shields.io/badge/-new-green
[update]: https://img.shields.io/badge/-update-red

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/

<!-- Package: property  -->
  <!-- GitHub: badges -->
  [property-badge-issues]: https://img.shields.io/github/issues/angular-package/property
  [property-badge-forks]: https://img.shields.io/github/forks/angular-package/property
  [property-badge-stars]: https://img.shields.io/github/stars/angular-package/property
  [property-badge-license]: https://img.shields.io/github/license/angular-package/property
  <!-- GitHub: badges links -->
  [property-issues]: https://github.com/angular-package/property/issues
  [property-forks]: https://github.com/angular-package/property/network
  [property-license]: https://github.com/angular-package/property/blob/master/LICENSE
  [property-stars]: https://github.com/angular-package/property/stargazers

<!-- Package: core -->
  <!-- npm -->
  [core-npm-badge-svg]: https://badge.fury.io/js/%40angular-package%2Fcore.svg
  [core-npm-badge]: https://badge.fury.io/js/%40angular-package%2Fcore
  [core-npm-readme]: https://www.npmjs.com/package/@angular-package/core#readme

  <!-- GitHub -->
  [core-github-readme]: https://github.com/angular-package/core#readme

<!-- Package: change-detection -->
  <!-- npm -->
  [cd-npm-badge-svg]: https://badge.fury.io/js/%40angular-package%2Fchange-detection.svg
  [cd-npm-badge]: https://badge.fury.io/js/%40angular-package%2Fchange-detection
  [cd-npm-readme]: https://www.npmjs.com/package/@angular-package/change-detection#readme

  <!-- GitHub -->
  [cd-github-readme]: https://github.com/angular-package/change-detection#readme

<!-- Package: prism -->
  <!-- npm -->
  [prism-npm-badge-svg]: https://badge.fury.io/js/%40angular-package%2Fprism.svg
  [prism-npm-badge]: https://badge.fury.io/js/%40angular-package%2Fprism
  [prism-npm-readme]: https://www.npmjs.com/package/@angular-package/prism#readme

  <!-- GitHub -->
  [prism-github-readme]: https://github.com/angular-package/prism#readme

<!-- Package: property -->
  <!-- npm -->
  [property-npm-badge-svg]: https://badge.fury.io/js/%40angular-package%2Fproperty.svg
  [property-npm-badge]: https://badge.fury.io/js/%40angular-package%2Fproperty
  [property-npm-readme]: https://www.npmjs.com/package/@angular-package/property#readme

  <!-- GitHub -->
  [property-github-readme]: https://github.com/angular-package/property#readme

<!-- Package: reactive -->
  <!-- npm -->
  [reactive-npm-badge-svg]: https://badge.fury.io/js/%40angular-package%2Freactive.svg
  [reactive-npm-badge]: https://badge.fury.io/js/%40angular-package%2Freactive
  [reactive-npm-readme]: https://www.npmjs.com/package/@angular-package/reactive#readme

  <!-- GitHub -->
  [reactive-github-readme]: https://github.com/angular-package/reactive#readme

<!-- Package: type -->
  <!-- npm -->
  [type-npm-badge-svg]: https://badge.fury.io/js/%40angular-package%2Ftype.svg
  [type-npm-badge]: https://badge.fury.io/js/%40angular-package%2Ftype
  [type-npm-readme]: https://www.npmjs.com/package/@angular-package/type#readme

  <!-- GitHub -->
  [type-github-readme]: https://github.com/angular-package/type#readme

  [package-type-resultcallback]: https://github.com/angular-package/type#resultcallback
  [package-type-key]: https://github.com/angular-package/type#key

<!-- Package: ui -->
  <!-- npm -->
  [ui-npm-badge-svg]: https://badge.fury.io/js/%40angular-package%2Fui.svg
  [ui-npm-badge]: https://badge.fury.io/js/%40angular-package%2Fui
  [ui-npm-readme]: https://www.npmjs.com/package/@angular-package/ui#readme

  <!-- GitHub -->
  [ui-github-readme]: https://github.com/angular-package/ui#readme

<!-- Property: type -->
[accessor-descriptor]: #accessordescriptor
[common-descriptor]: #commondescriptor
[data-descriptor]: #datadescriptor
[this-accessor-descriptor]: #thisaccessordescriptor

[accessordescriptors]: #accessordescriptors
[accessordescriptors-accessorcallback]: #accessorcallback
[accessordescriptors-define]: #accessordescriptorsdefine
[accessordescriptors-prototype-set]: #accessordescriptorsprototypeset

[datadescriptors]: #datadescriptors
[datadescriptors-datacallback]: #datacallback
[datadescriptors-prototype-set]: #datadescriptorsprototypeset

[descriptor-defineaccessor]: #descriptordefineaccessor
[descriptor-definedata]: #descriptordefinedata

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
[js-object-getownpropertydescriptor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
[js-object-getOwnpropertydescriptors]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors

[js-setter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set

[js-hasownproperty]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty

[js-in-operator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in

[js-number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
[numberconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number

[js-object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
[js-object-define-property]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

[primitive]: https://developer.mozilla.org/en-US/docs/Glossary/Primitive

[js-regexp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp

[js-string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[stringconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String

[js-symbol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[symbolconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol

[js-undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined

<!-- Typescript -->
[ts-classes]: https://www.typescriptlang.org/docs/handbook/2/classes.html
[ts-function]: https://www.typescriptlang.org/docs/handbook/2/functions.html
[ts-interface]: https://www.typescriptlang.org/docs/handbook/interfaces.html#our-first-interface
