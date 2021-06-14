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
* [Function](#function)
  * [`getExistProperty()`](#getexistproperty)
  * [`getProperty()`](#getproperty)
  * [`pickProperty()`](#pickproperty)
  * [`setProperty()`](#setproperty)
* [Callback](#callback)
* [Package](#package)
  * [Descriptor](#descriptor-sub-package)
    * [`Descriptor`](#descriptor)
    * [`Accessor`](#accessordescriptors)
    * [`Data`](#datadescriptors)
    * [`Interface`](#descriptor-interface)
    * [`Type`](#descriptor-type)
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

## Function

### `getExistProperty()`

**Description:**

Returns the value of the existing specified property from the `object`.

**Import:**

```typescript
import { getExistProperty } from '@angular-package/property';
```

**Syntax:**

```typescript
const getExistProperty: GetProperty = <
  Obj extends object,
  Key extends keyof Obj
>(
  object: Obj,
  key: Key,
  callback?: ResultCallback
): Obj[Key] =>
  guard.is.objectKey(object, key, callback)
    ? getProperty(object, key)
    : getProperty(object, key);
```

**Generic type variables:**

| Name                    | Description |
| :---------------------- | :---------- |
| `Obj extends object`    | Guarded with the `object` type, by default of the value from the captured type of the argument `object` linked with the return type `Obj[Key]` |
| `Key extends keyof Obj` | Guarded with the property name from the `Obj` variable to ensure to not grab accidentally a property that does not exist in the `Obj`, by default of the value from the `key` argument that's linked to the return type `Obj[Key]` |

**Parameters:**

| Name: `type`  | Description                                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------------- |
| `object: Obj` | An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to get the existing property value from. The value is being checked against the proper `object` type |
| `key: Key`    | A `keyof` type property name from the existing `object`, by default of type captured from the provided `key` as the name of the property that the `object` contains. The value is being checked against existence the property in the `object` |

**Returns:**

The **return value** is a property value from the `object`.

**Usage:**

```typescript
// Example usage.
```

### `getProperty()`

**Description:**

Returns the value of the specified property from the `object`.

**Import:**

```typescript
import { getProperty } from '@angular-package/property';
```

**Syntax:**

```typescript
const getProperty: GetProperty = <
  Obj extends object,
  Key extends keyof Obj
>(
  object: Obj,
  key: Key
): Obj[Key] => object[key];
```

**Generic type variables:**

| Name                    | Description |
| :---------------------- | :---------- |
| `Obj extends object`    | Guarded with the `object` type, by default of the value from the captured type of the argument `object` linked with the return type `Obj[Key]` |
| `Key extends keyof Obj` | Guarded with the property name from the `Obj` variable to ensure to not grab accidentally a property that does not exist in the `Obj`, by default of the value from the `key` argument that's linked to the return type `Obj[Key]` |

**Parameters:**

| Name: `type`  | Description                                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------------- |
| `object: Obj` | An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to get property value from. The value is not being checked against the proper `object` type |
| `key: Key`    | A `keyof` type property name from the `object`, by default of type captured from the provided `key` as the name of the property that the `object` contains. |

**Returns:**

The **return value** is  a property value from the `object`.

**Usage:**

```typescript
// Example usage.
```

### `pickProperty()`

**Description:**

Picks specified properties from the `object`.

**Import:**

```typescript
import { pickProperty } from '@angular-package/property';
```

**Syntax:**

```typescript
const pickProperty: PickProperty = <Obj extends object>(
  obj: Obj,
  keys: (keyof Obj)[]
): { [P in keyof Obj]: Obj[P] } =>
  Object.assign(
    {},
    ...keys.map((key) =>
      !is.undefined(obj[key]) ? { [key]: obj[key] } : undefined
    )
  );
```

**Generic type variables:**

| Name                 | Description |
| :------------------- | :---------- |
| `Obj extends object` | Guarded with the `object` type, by default of the value from the captured type of the argument `object` linked with the return type `{ [P in keyof Obj]: Obj[P] }` |

**Parameters:**

| Name: `type`          | Description                                                                                                    |
| :-------------------- | :------------------------------------------------------------------------------------------------------------- |
| `object: Obj`         | An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to pick the `keys` from. The value is not being checked against the proper `object` type |
| `keys: (keyof Obj)[]` | An array of a `keyof` type property names from the `object`, by default of type captured from the provided `keys` in the array as the name of the properties that the `object` contains |

**Returns:**

The **return value** is an `object` with specified properties.

**Usage:**

```typescript
// Example usage.
```

### `setProperty()`

**Description:**

Sets the value of indicated property by its name in the `object`.

**Import:**

```typescript
import { setProperty } from '@angular-package/property';
```

**Syntax:**

```typescript
const setProperty: SetProperty = <
  Obj extends object,
  Key extends keyof Obj
>(
  object: Obj,
  key: Key,
  value: Obj[Key]
): Obj[Key] => (object[key] = value);
```

**Generic type variables:**

| Name                    | Description |
| :---------------------- | :---------- |
| `Obj extends object`    | Guarded with the `object` type, by default of the value from the captured type of the argument `object` linked with the return type `Obj[Key]` |
| `Key extends keyof Obj` | Guarded with the property name from the `Obj` variable to ensure to not grab accidentally a property that does not exist in the `Obj`, by default of the value from the `key` argument that's linked to the return type `Obj[Key]` |

**Parameters:**

| Name: `type`      | Description                                                                                                    |
| :---------------- | :------------------------------------------------------------------------------------------------------------- |
| `object: Obj`     | An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to set the value with the indicated `key` as its property name. The value is not checked against the proper `object` type |
| `keys: Key`       | A `keyof` type property name from the `object`, by default of type captured from the provided `key` as the name of the property that the `object` contains |
| `value: Obj[Key]` | The `value` of the type captured from the provided `key` in the provided `object`. The `value` is not checked against the proper type |

**Returns:**

The **return value** is from the property of the specified `object`.

**Usage:**

```typescript
// Example usage.
```

----

## Callback

Wrapper for the [`ResultCallback`][resultcallback] type function to throw an [`Error`][js-error] with the specified message on the specified `false` or `true` state.

```typescript
const callbackErrorMessage = (
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

## Descriptor sub package

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

### Descriptor

**Description:**

Handle object property descriptor.

**Features:**

* Strictly defines accessor and data descriptor with the static [`defineAccessor()`][descriptor-defineaccessor] and [`defineData()`][descriptor-definedata] static methods.
* Strictly sets, and stores accessor and data descriptor with the `Descriptor` instance respectively `set.accessor()` and `set.data()` methods of the instance.
* Get privately stored accessor descriptor defined by the `set.accessor()` method by using `get.accessor` property of the instance.
* Get privately stored data descriptor defined by the `set.data()` method by using `get.data` property of the instance.

> Strictly means, it guards inputted descriptor by checking it against its unique keys and by picking only properties that belong to the appropriate descriptor.

**Import:**

```typescript
import { Descriptor } from '@angular-package/property';
```

**Syntax:**

```typescript
Descriptor<Value, Obj = any> { ... }
```

### Descriptor static methods

#### `Descriptor.defineAccessor()`

**Description:**

Returns defined accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type, on `get` or `set` property detected.

**Syntax:**

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
| callback?: `ResultCallback`                      | An optional [`ResultCallback`][resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` with `get` or `set` property, by default it uses [`accessorCallback()`][accessordescriptors-accessorcallback] function |

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

#### `Descriptor.defineData()`

**Description:**

Returns defined data descriptor of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface], on `writable` or `value` property detected.

**Syntax:**

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
| callback?: `ResultCallback`         | An optional [`ResultCallback`][resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` with `writable` or `value` property, by default it uses [`dataCallback()`](#datacallback) function |

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

----

### AccessorDescriptors

**Description:**

Strictly defines, sets, and stores privately property accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type.

> Strictly means, methods picks `configurable`, `enumerable`, `get`, `set` properties from the provided `descriptor` object.

**Features:**

* Guarded process of defining the object descriptor, but properties are not being checked against proper values.
* Strictly defines property accessor descriptor.
* Strictly sets, and stores at the same time property accessor descriptor.
* Accessor descriptor is of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type:
  * The return value of the `get()` function is of a generic `Value` type.
  * The parameter of the `set()` function is of a generic `Value` type.
  * Keyword `this` refers to an `Obj` variable in both `get()` and `set()` functions.
* Method [`set()`][accessordescriptors-prototype-set] of the instance and static [`define()`][accessordescriptors-define] picks `configurable`, `enumerable`, `get`, `set` properties from the provided data.
* Get privately stored accessor descriptor defined by the [`set()`][accessordescriptors-prototype-set] method of the instance.

**Import:**

```typescript
import { AccessorDescriptors } from '@angular-package/property';
```

**Syntax:**

```typescript
AccessorDescriptors<Value, Obj = any> { ... }
```

### AccessorDescriptors callback

#### `accessorCallback()`

The default callback function for the `AccessorDescriptors.guard()` static method that's used to guard inputted value.

```typescript
const accessorCallback: ResultCallback = callbackErrorMessage(
  `Accessor descriptor must be an \`ThisAccessorDescriptor<Value, Obj>\` type`
);
```

### AccessorDescriptors static methods

#### `AccessorDescriptors.define()`

**Description:**

Returns defined accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type, on `get` or `set` property detected.

**Syntax:**

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
| `callback?: ResultCallback`                      | An optional [`ResultCallback`][resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` with `get` or `set` property, by default it uses [`accessorCallback()`][accessordescriptors-accessorcallback] function |

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

### AccessorDescriptors Constructor

#### `AccessorDescriptors()`

**Description:**

Creates an instance, and optionally sets an accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type.

**Syntax:**

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

### AccessorDescriptors instance methods

#### `AccessorDescriptors.prototype.set()`

**Description:**

[Strictly][accessordescriptors] sets with the last saved descriptor values, and stores privately accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type.

**Syntax:**

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
| `callback?: ResultCallback`                      | An optional [`ResultCallback`][resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` containing the `get` or `set` property, by default it uses [`accessorCallback()`][accessordescriptors-accessorcallback] from the static `guard()` method |

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

### AccessorDescriptors instance properties

#### `AccessorDescriptors.prototype.get`

**Description:**

Get privately stored accessor descriptor of a [`ThisAccessorDescriptor<Value, Obj>`][this-accessor-descriptor] type defined by the [`set()`][accessordescriptors-prototype-set] method.

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

Strictly defines, sets, and stores privately property data descriptor of a [`DataDescriptor<Value>`][data-descriptor] interface.

> Strictly means, data descriptor of a [`DataDescriptor<Value>`][data-descriptor] is type guarded and methods picks `configurable`, `enumerable`, `writable`, `value` properties from the provided `descriptor` object.

**Features:**

* Data descriptor is of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface]:
  * The `value` property is of a generic `Value` type.
* Guarded process of defining the object descriptor, but properties are not being checked against proper values.
* Strictly defines property data descriptor.
* Strictly sets, and stores at the same time property data descriptor.
* Method [`set()`][datadescriptors-prototype-set] of the instance and static [`define()`][datadescriptors-define] picks `configurable`, `enumerable`, `writable`, `value` properties from the provided data.
* Get privately stored data descriptor defined by the [`set()`][datadescriptors-prototype-set] method of the instance.

**Import:**

```typescript
import { DataDescriptors } from '@angular-package/property';
```

**Syntax:**

```typescript
DataDescriptors<Value> { ... }
```

### DataDescriptors static methods

#### `DataDescriptors.define()`

**Description:**

Returns [**strictly**][datadescriptors] defined data descriptor of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface], on `writable` or `value` property detected.

**Syntax:**

```typescript
static define<Value>(
  descriptor: DataDescriptor<Value>,
  callback?: ResultCallback
): DataDescriptor<Value> { ... }
```

**Generic type variables:**

| Name    | Description |
| :------ | :---------- |
| `Value` | Guards the `value` property from the `descriptor` object, and the return type of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface] |

**Parameters:**

| Name: `type`                        | Description                                                                                                                                                          |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| descriptor: `DataDescriptor<Value>` | An `object` of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface], to set with the default values of the [`CommonDescriptor`][common-descriptor] |
| callback?: `ResultCallback`         | An optional [`ResultCallback`][resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` with `writable` or `value` property, by default it uses [`dataCallback()`][datadescriptors-datacallback] function from the static `guard()` method |

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

### DataDescriptors Constructor

#### `DataDescriptors()`

**Description:**

Creates an instance, and optionally sets a data descriptor of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface].

**Syntax:**

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

### DataDescriptors instance methods

#### `DataDescriptors.prototype.set()`

**Description:**

[Strictly][datadescriptors] sets with the last saved descriptor values, and stores privately data descriptor of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface].

**Syntax:**

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
| `callback?: ResultCallback`         | An optional [`ResultCallback`][resultcallback] function to handle the result of the check whether or not the `descriptor` is an `object` containing the `writable` or `value` property, by default it uses [`dataCallback()`][datadescriptors-datacallback] function from the static `guard()` method |

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

### DataDescriptors instance properties

#### `DataDescriptors.prototype.get`

**Description:**

Get privately stored data descriptor of a [`DataDescriptor<Value>`][data-descriptor] [interface][ts-interface] defined by the instance [`set()`][datadescriptors-prototype-set] method.

**Syntax:**

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

----

## Descriptor type

### ThisAccessorDescriptor

**Description:**

[`AccessorDescriptor`][accessor-descriptor] [interface][ts-interface] as a type cause of ease of use `this` of an `Obj` type in the `get()` and `set()` functions. More about property descriptors [here][js-object-define-property].

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
