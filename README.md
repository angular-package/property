# Packages

Useful and simple to use packages based on the [angular.io][angulario].

| Package          | Description                                  | Status                                                       | Readme                                                         |
| :--------------- | :------------------------------------------- | :----------------------------------------------------------: | :------------------------------------------------------------- |
| change-detection | Improve application performance.             | *In Progress*                                                | [GitHub][cd-github-readme]                                     |
| prism            | `Prism` highlighter module.                  | *In Progress*                                                | [GitHub][prism-github-readme]                                  |
| property         | Features to handle object properties.        | [![npm version][property-npm-badge-svg]][property-npm-badge] | [GitHub][property-github-readme] \| [npm][property-npm-readme] |
| ui               | User interface.                              | *In Progress*                                                | [GitHub][ui-github-readme]                                     |
| type             | Common types, type guards and type checkers. | [![npm version][type-npm-badge-svg]][type-npm-badge]         | [GitHub][type-github-readme] \| [npm][type-npm-readme]         |

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
// Function.
import {
  getExistProperty,
  getProperties,
  getProperty,
  setProperty,

  // callback
  errorCallback,

  // descriptor
  getDescriptor,
  getDescriptors,

  // object
  getObject,
} from '@angular-package/property';
```

```typescript
// Object.
import {
  get,

  // callback
  callbacks,
} from '@angular-package/property';
```

```typescript
// Class.
import {
  // descriptor
  AccessorDescriptors,
  DataDescriptors,
  Descriptor,
} from '@angular-package/property';
```

```typescript
// Interface.
import {
  // descriptor
  AccessorDescriptor,
  CommonDescriptor,
  DataDescriptor,
} from '@angular-package/property';
```

```typescript
// Type.
import {
  // descriptor
  ThisAccessorDescriptor
} from '@angular-package/property';

```

----

* [Installation](#installation)
* [Callback](#callback)
  * Function
    * [`errorCallback()`](#errorcallback)
* [Function](#function)
  * [`getExistProperty()`](#getexistproperty)
  * [`getProperties()`](#getproperties)
  * [`getProperty()`](#getproperty)
  * [`setProperty()`](#setproperty)
* [Object](#object)
  * [`get`](#get)
* [Package](#package)
  * [Descriptor](#descriptor-package)
    * Function
      * [`getDescriptor()`](#getdescriptor)
      * [`getDescriptors()`](#getdescriptors)
    * Class
      * [`Descriptor`](#descriptor)
      * [`AccessorDescriptors`](#accessordescriptors)
      * [`DataDescriptors`](#datadescriptors)
    * [Interface](#descriptor-interface)
    * [Type](#descriptor-type)
  * [Name](#name-package)
    * Class
      * [`Name`](#name)
      * [`Prefix`](#prefix)
      * [`Suffix`](#suffix)
* [Git](#git)
  * [Commit](#commit)
  * [Versioning](#versioning)
* [License](#license)

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

----

## Installation

Install `@angular-package/property` package with command:

```bash
npm i --save @angular-package/property
```

----

## Callback

### `errorCallback()`

Wrapper for the [`ResultCallback`][package-type-resultcallback] type function to throw an [`Error`][js-error] with the specified message on the specified `false` or `true` state.

```typescript
const errorCallback: ErrorCallback  = (
  message: string,
  type: ErrorType = '',
  on: boolean = false,
): ResultCallback => {
  return (result: boolean, value: any): boolean => {
    message = `${message}, got value ${
      is.object(value) ? JSON.stringify(value) : value
    }`;
    if (result === on) {
      switch (type) {
        case 'range': throw new RangeError(message); break;
        case 'type': throw new TypeError(message); break;
        case 'URI': throw new URIError(message); break;
        default: throw new Error(message); break;
      }
    }
    return result;
  };
};
```

**Parameters:**

| Name: `type`           | Description                                                                                                     |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `message: string`      | The `string` type value, as a message for the [`Error`][js-error] instance                                      |
| `type: ErrorType = ''` | Type of error to throw - `'range'`, `'type'`, `'URI'`, by default it's just an [`Error`][js-error]              |
| `on: boolean = false`  | A `boolean` state on which an [`Error`][js-error] of the type specified in the provided `type` should be thrown |

**Returns:**

| Returns          | Type       | Description                                                                                 |
| :--------------- | :--------: | :------------------------------------------------------------------------------------------ |
| `ResultCallback` | `Function` | The **return type** is a function of a [`ResultCallback`][package-type-resultcallback] type |

The **return value** is a predefined `function` for use as the callback.

**Usage:**

```typescript
// Example usage.

```

----

## Object

### `get`

The object with all prefixed with `get` functions.

```typescript
const get: Get = {
  descriptor: getDescriptor,
  descriptors: getDescriptors,
  existProperty: getExistProperty,
  object: getObject,
  properties: getProperties,
  property: getProperty
};
```

**Usage:**

```typescript
// Example usage.
```

----

## Function

### `getExistProperty()`

Use `getExistProperty()` or `get.existProperty()` to return the value of the existing specified property from the specified `object`.

**Features:**

* Guards getting the object property value by:
 Constraints the `object` parameter with a generic `Obj` variable of an `object` type.
 Constraints the `key` parameter with a `Key` variable which is of a key of the `Obj` variable.
 Checks whether the provided object is of an `object` type and `key` of a [`Key`][package-type-key] type, and if not, throws an [`Error`][js-error].
 Checks whether the provided object has own property by using [`Object.prototype.hasOwnProperty()`][js-hasownproperty] method.
* Possibility to use custom `callback` function of a [`ResultCallback`][package-type-resultcallback] type.

```typescript
const getExistProperty: GetExistProperty = <
  Obj extends object,
  Key extends keyof Obj
>(
  object: Obj,
  key: Key,
  callback: ResultCallback = callbacks.getExistProperty
): Obj[Key] =>
  guard.is.objectKey(object, key, callback)
    ? getProperty(object, key)
    : getProperty(object, key);
```

**Generic type variables:**

| Name                    | Description |
| :---------------------- | :---------- |
| `Obj extends object`    | Guarded with the `object` type, by default of the value from the captured type of the provided `object` linked with the return type `Obj[Key]` |
| `Key extends keyof Obj` | Guarded with the property name from the `Obj` variable to ensure to not grab accidentally a property that does not exist in the `Obj`, by default of the value from the `key` argument that's linked to the return type `Obj[Key]` |

**Parameters:**

| Name: `type`  | Description                                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------------- |
| `object: Obj` | An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to get the existing property value from it. The value is being checked against the proper `object` type |
| `key: Key`    | A `keyof` type property name from the existing `object`, by default of type captured from the provided `key` as the name of the property that the `object` contains. The value is being checked against its existence in the `object` |

**Throws:**

By default throws an [`Error`][js-error] if the specified object does not exist or the object exists, but its key doesn't.

**Returns:**

| Returns    | Type     | Description                                                                       |
| :--------- | :------: | :-------------------------------------------------------------------------------- |
| `Obj[Key]` | Captured | The **return type** is of type captured from the property value from the `object` |

The **return value** is a property value from the `object`.

**Usage:**

```typescript
// Example usage.
import { get, getExistProperty } from '@angular-package/property';

interface PersonShape {
  firstName: string;
}

class Person implements PersonShape {
  firstName = 'first name';
  age = 5;
}

class People {
  firstName!: string;
  age!: number;
}

const person: Person = new Person();
const people: People = new People();

getExistProperty(person, 'firstName'); // Returns 'first name'
getExistProperty(people, 'age'); // Uncaught Error: Object with the specified key does not exist, got value {}
// Custom callback.
getExistProperty(people, 'age', (result: boolean, value: any) => {
  console.log(result); // `result` of the check is equal to the `false`
  console.log(value); // `value` is equal to `{}` - object is empty
  return result;
}); // Returns `undefined`, does not throws an Error cause of custom callback.
```

### `getProperties()`

Use `getProperties()` or `get.properties()` to get specified properties from the specified `object`.

**Features:**

* Constraints the `object` parameter with a generic `Obj` variable of an `object` type.
* Constraints the `key` parameter with a `Key` variable which is of a key of the `Obj` variable.
* Checks whether the provided object is of an `object` type and `key` of a [`Key`][package-type-key] type, and if not, throws an [`Error`][js-error].
* Checks whether the provided object has own property by using [`Object.prototype.hasOwnProperty()`][js-hasownproperty] method.
* Uses custom `callback` function of a [`ResultCallback`][package-type-resultcallback] type.
* Returns an object with the specified properties from the specified `object`.

```typescript
const getProperties: GetProperties = <
  Obj extends object,
  Keys extends keyof Obj
>(
  object: Obj,
  keys: Keys[]
): Pick<Obj, Keys> =>
  Object.assign(
    {},
    ...keys.map((key) =>
      !is.undefined(object[key]) ? { [key]: object[key] } : undefined
    )
  );
```

**Generic type variables:**

| Name                     | Description |
| :----------------------- | :---------- |
| `Obj extends object`     | Constrained with the `object` type, `Obj` variable by default of the value from the captured type of the provided `object` that is linked with the return type `Pick<Obj, Keys>` |
| `Keys extends keyof Obj` | Constrained with the property name from the `Obj` variable to ensure to not grab accidentally a properties that does not exist in the `Obj`, by default of the value from the provided `key` that's linked to the return type `Pick<Obj, Keys>` |

**Parameters:**

| Name: `type`   | Description                                                                                                    |
| :------------- | :------------------------------------------------------------------------------------------------------------- |
| `object: Obj`  | An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to get the values of the specified `keys` from it. The value is **not** being checked against the proper `object` type |
| `keys: Keys[]` | An array of a `keyof` type property names from the `object`, by default of type captured from the provided `keys` in the array as the names of the properties that the `object` contains. The value is **not** being checked against the proper `key` type |

**Returns:**

| Returns           | Type     | Description                                                                                  |
| :---------------- | :------: | :------------------------------------------------------------------------------------------- |
| `Pick<Obj, Keys>` | `object` | The **return type** is an `object` of a generic `Obj` type, by default of type captured from the provided `object` with picked properties from the `keys` |

The **return value** is an `object` with the specified properties.

**Usage:**

```typescript
// Example usage.
import { getProperties } from '@angular-package/property';

interface PersonShape {
  firstName: string;
  age: number;
  lastName: string;
}

class Person implements PersonShape {
  firstName = 'first name';
  age = 5;
  lastName = 'last name';
}

class People {
  firstName!: string;
  age!: number;
}

const person: Person = new Person();
const people: People = new People();

getProperties(person, ['age',  'firstName', 'lastName']); // returns {age: 5, firstName: "first name", lastName: "last name"}
getProperties(people, ['age']); // returns {}
```

### `getProperty()`

Use `getProperty()` or `get.property()` to return the value of the specified property from the `object`.

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
| `Obj extends object`    | Constrained with the `object` type, `Obj` variable by default of the value from the captured type of the provided `object` linked with the return type `Obj[Key]` |
| `Key extends keyof Obj` | Constrained with the property name from the `Obj` variable to ensure to not grab accidentally a property that does not exist in the `Obj`, by default of the value from the provided `key` that's linked to the return type `Obj[Key]` |

**Parameters:**

| Name: `type`  | Description                                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------------- |
| `object: Obj` | An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to get property value from it. The value is not being checked against the proper `object` type |
| `key: Key`    | A `keyof` type property name from the `object`, by default of type captured from the provided `key` as the name of the property that the `object` contains. The value is not being checked against proper `key` type |

**Returns:**

| Returns    | Type     | Description                                                                                       |
| :--------- | :------: | :------------------------------------------------------------------------------------------------ |
| `Obj[Key]` | Captured | The **return type** is of type captured from the property (`Key`) value from the `object` (`Obj`) |

The **return value** is  a property value from the `object`.

**Usage:**

```typescript
// Example usage.
import { getProperty } from '@angular-package/property';

interface PersonShape {
  firstName: string;
  age: number;
  lastName: string;
}

class Person implements PersonShape {
  firstName = 'first name';
  age = 5;
  lastName = 'last name';
}

class People {
  firstName!: string;
  age!: number;
}

const person: Person = new Person();
const people: People = new People();

getProperty(person, 'age'); // Returns 5
getProperty(people, 'age'); // Returns undefined
```

### `setProperty()`

Sets the value of indicated property by its name in the `object`.

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
| `Obj extends object`    | Constrained with the `object` type, `Obj` variable by default of the value from the captured type of the argument `object` linked with the return type `Obj[Key]` |
| `Key extends keyof Obj` | Constrained with the property name from the `Obj` variable to ensure to not grab accidentally a property that does not exist in the `Obj`, by default of the value from the `key` argument that's linked to the return type `Obj[Key]` |

**Parameters:**

| Name: `type`      | Description                                                                                                    |
| :---------------- | :------------------------------------------------------------------------------------------------------------- |
| `object: Obj`     | An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to set the value with the indicated `key` as its property name. The value is not checked against the proper `object` type |
| `key: Key`        | A `keyof` type property name from the `object`, by default of type captured from the provided `key` as the name of the property that the `object` contains |
| `value: Obj[Key]` | The `value` of the type captured from the provided `key` in the provided `object`. The `value` is not checked against the proper type |

**Returns:**

| Returns    | Type     | Description                                                                                       |
| :--------- | :------: | :------------------------------------------------------------------------------------------------ |
| `Obj[Key]` | Captured | The **return type** is of type captured from the property (`Key`) value from the `object` (`Obj`) |

The **return value** is the value from the property of the `object`.

**Usage:**

```typescript
// Example usage.
import { setProperty } from '@angular-package/property';

interface PersonShape {
  firstName: string;
  age: number;
  lastName: string;
}

class Person implements PersonShape {
  firstName = 'first name';
  age = 5;
  lastName = 'last name';
}

class People {
  firstName!: string;
  age!: number;
}

const person: Person = new Person();
const people: People = new People();

setProperty(person, 'age', 7); // Returns 7
setProperty(people, 'age', 27); // Returns 27
```

----

## Package

## Descriptor package

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

### `getDescriptor()`

Wrapper function for the [`Object`][js-object] static method [`getOwnPropertyDescriptor()`][js-object-getownpropertydescriptor]. Use `getDescriptor()` or `get.descriptor()` to return descriptor of the specified property from the specified object.

> Gets the own property descriptor of the specified object. An own property descriptor is one that is defined directly on the object and is not inherited from the object's prototype.

**Features:**

Additional features instead of the default from the wrapped [`getOwnPropertyDescriptor()`][js-object-getownpropertydescriptor] method.

* Constraints the `object` parameter with a generic `Obj` variable of an `object` type.
* Constraints the `key` parameter with a `Key` variable which is of a key of the `Obj` variable.

```typescript
const getDescriptor: GetDescriptor = <Obj extends object, Key extends keyof Obj>(
  object: Obj,
  key: Key
): PropertyDescriptor | undefined;
```

**Generic type variables:**

| Name                    | Description |
| :---------------------- | :---------- |
| `Obj extends object`    | Constrained with the `object` type, by default of the value from the captured type of the provided `object` |
| `Key extends keyof Obj` | Constrained with the property name from the `Obj` variable to ensure to not grab accidentally a property that does not exist in the `Obj`, by default of the value from the provided `key` |

**Parameters:**

| Name: `type`  | Description                                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------------- |
| `object: Obj` | An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to get the property descriptor from it. The value is **not** being checked against the proper `object` type |
| `key: Key`    | A `keyof` type property name from the `object`, by default of type captured from the provided `key` as the name of the property that the `object` contains. The value is **not** being checked against its existence in the `object` |

**Throws:**

Function throws nothing.

**Returns:**

| Returns                           | Type     | Description                                                                       |
| :-------------------------------- | :------: | :-------------------------------------------------------------------------------- |
| `PropertyDescriptor \| undefined` | `object` | - |

The **return value** is a property descriptor from the `object`.

**Usage:**

```typescript
// Example usage.
import { get, getDescriptor } from '@angular-package/property';

interface PersonShape {
  firstName: string;
}

class Person implements PersonShape {
  firstName = 'first name';
  age = 5;
}

class People {
  firstName!: string;
  age!: number;
}

const person: Person = new Person();
const people: People = new People();

getDescriptor(person, 'firstName'); // Returns {value: "first name", writable: true, enumerable: true, configurable: true}
getDescriptor(people, 'age'); // Returns undefined

const noProperty: any = 'no property';
const noObject: any = 'my string object';

getDescriptor(person, noProperty); // Returns undefined,
                                   // It won't give you any `Error`, it's like an object has property with undefined value.
getDescriptor(noObject, 'age'); // Returns undefined
                                // The same here.
```

### `getDescriptors()`

Wrapper function for the [`Object`][js-object] static method [`getOwnPropertyDescriptors()`][js-object-getOwnpropertydescriptors]. Use `getDescriptors()` or `get.descriptors()` to return all property descriptors from the specified `object`.

> Returns an object containing all own property descriptors of an object.

**Features:**

Additional features instead of the default from the wrapped [`getOwnPropertyDescriptors()`][js-object-getOwnpropertydescriptors] method.

* Constraints the `object` parameter with a generic `Obj` variable of an `object` type.

```typescript
const getDescriptors: GetDescriptors = <Obj extends object, Keys extends keyof Obj>(
  object: Obj,
  keys?: Keys[] // Not working in this version.
): ObjectPropertyDescriptors<Obj> | undefined;
```

**Generic type variables:**

| Name                     | Description |
| :----------------------- | :---------- |
| `Obj extends object`     | Constrained with the `object` type, by default of the value from the captured type of the provided `object`  |

**Parameters:**

| Name: `type`    | Description                                                                                                    |
| :-------------- | :------------------------------------------------------------------------------------------------------------- |
| `object: Obj`   | An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to get all property descriptors from it. The value is being checked against the proper `object` type |
| `keys?: Keys[]` | **not working** |

**Returns:**

| Returns                                       | Type     | Description                                                                       |
| :-------------------------------------------- | :------: | :-------------------------------------------------------------------------------- |
| `ObjectPropertyDescriptors<Obj> \| undefined` | `object` | - |

The **return value** is an `object` with all property descriptors from the `object`.

**Usage:**

```typescript
// Example usage.
import { get, getDescriptors } from '@angular-package/property';

interface PersonShape {
  firstName: string;
}

class Person implements PersonShape {
  firstName = 'first name';
  age = 5;
}

class People {
  firstName!: string;
  age!: number;
}

const person: Person = new Person();
const people: People = new People();

getDescriptors(person); // Returns {firstName: {…}, age: {…}}
getDescriptors(people); // Returns {}
```

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

## Descriptor interface

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

## Descriptor type

### ThisAccessorDescriptor

[`AccessorDescriptor`][accessor-descriptor] [interface][ts-interface] as a type cause of ease of use `this` of an `Obj` type in the `get()` and `set()` functions. More about property descriptors [here][js-object-define-property].

```typescript
type ThisAccessorDescriptor<Value, Obj> = AccessorDescriptor<Value> &
  ThisType<Obj>;
```

----

## Name package

Name features to import.

```typescript
// Class.
import {
  Name,
  Prefix,
  Suffix,
} from '@angular-package/property';
```

### `Name`

...

### `Prefix`

Manages the `prefix` of a `string` type for the name.

**Features:**

* Guards the provided string-type `prefix`.
* Filters the provided `prefix` with a customizable regular expression and `length`.

Static:

* Default `length` of the `prefix` is `3`, and pattern is `/[^a-zA-Z0-9$_]/g`.
* Defines the `prefix` with a static method `define()`.
* Customizable `callback`, `length` and regular expression `pattern` in the static `define()` method.
* Checks if any `value` is an instance of a `Prefix` with static method [`is()`]().

Instance:

* Defines a `string` type `prefix` with a `define()` method.
  * Sets
* Initially sets the `prefix` with optional settings.
* Sets settings for the `prefix` with the `configure()` method.
* Sets the `prefix` with the `set()` method.
* Sets custom callback function for the `set()` method with the `setCallback()` method.
* Sets the maximum length of the `prefix` with the `setLength()` method.
* Sets custom regular expression with the `setPattern()` method.
* Update `prefix` with the actual settings with the `updatePrefix()` method.
  * Gets privately stored
* `callback` function with the `getCallback()` method.
* maximum length` of the `prefix` with the `getLength()` method.
* `prefix` with the `get` property.
* Picks privately stored object that contains the `length` and `pattern` with the `pick` property.

### `Prefix` static methods

### `Prefix.define()`

Returns defined string-type `prefix` filtered with the specified regular expression of a specified maximum length.

```typescript
static define(prefix: string, settings?: AffixSettings): string {
  return guard.is.string(
    prefix,
    settings?.callback ? settings.callback : undefined
  )
    ? prefix
        .replace(settings?.pattern ? settings.pattern : /[^a-zA-Z0-9$_]/g, '')
        .slice(0, settings?.length ? settings.length : 3)
    : '';
}
```

**Parameters:**

| Name: `type`                | Description |
| :-------------------------- | :---------- |
| `prefix: string`            | A `string` type value as the `prefix` |
| `settings?: ResultCallback` | An optional `object` of a [`AffixSettings`](#affixsettings) interface to configure the provided `prefix` |

**Throws:**

**Returns:**

The **return value** is a `prefix` of a `string` type or an empty string if the `prefix` is not a `string` type.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

const prefix = Prefix.define('myPrefix12345', {
  callback: (result, value: any) => {
    if (result === false) {
      throw new Error('Must be a string type');
    }
    return result;
  },
  length: 3,
  pattern: /[^0-9]/g
}); // Returns 123
```

### `Prefix.is()`

Checks if any `value` is an instance of a [`Prefix`](#prefix).

```typescript
static is(value: any, callback?: ResultCallback): value is Prefix {
  return is.instance(value, Prefix, callback);
}
```

**Parameters:**

| Name: `type`                | Description |
| :-------------------------- | :---------- |
| `value: any`                | Any `value` to check |
| `callback?: ResultCallback` | An optional [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `value` is an instance of a `Prefix` |

**Throws:**

**Returns:**

| Returns           | Type      | Description                                                                                                                      |
| :---------------- | :-------: | :------------------------------------------------------------------------------------------------------------------------------- |
| `value is Prefix` | `boolean` | The **return type** is a `boolean` as the result of its statement indicating the `value` is an instance of a [`Prefix`](#prefix) |

The **return value** is a `boolean` indicating whether or not the `value` is an instance of a [`Prefix`](#prefix).

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

Prefix.is(new Prefix()); // Returns `true`.
```

### `Prefix` constructor

Initially sets the `prefix` with optional settings.

```typescript
constructor(prefix?: string, settings?: AffixSettings) {
  super();
  if (is.defined(prefix)) {
    if (is.defined(settings)) {
      this.configure(settings);
    }
    this.set(prefix);
  }
}
```

**Parameters:**

| Name: `type`               | Description |
| :------------------------- | :---------- |
| `prefix?: string`          | An optional `string` type value to initially set the `prefix`. |
| `settings?: AffixSettings` | An optional `object` of a [`AffixSettings`](#affixsettings) interface to customize the provided `prefix` |

**Returns:**

The **return value** is new instance of a [`Prefix`](#prefix).

**Usage:**

```typescript
// Example usage.
```

### `Prefix` instance properties

### `Prefix.prototype.get()`

Gets the `prefix` defined by the `set()` method with the property `get`.

```typescript
public get get(): string {
  return this.#prefix;
}
```

**Returns:**

The **return value** is a privately stored `prefix` of a `string` type.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

const definedPrefix = new Prefix('$$$').get; // Returns '$$$'
```

### `Prefix.prototype.pick`

Picks `length` and `pattern` options from the settings with the property `pick`.

```typescript
public get pick(): Pick<AffixSettings, 'length' | 'pattern'> {
  return {
    length: this.getLength(),
    pattern: this.getPattern(),
  };
}
```

**Returns:**

The **return value** is an `object` of a [`AffixSettings`](#affixsettings) with the picked `length` and `pattern` properties.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

const pickSettings = new Prefix().pick; // Returns {length: 3, pattern: /[^a-zA-Z0-9$_]/g}
```

### `Prefix` instance methods

### `Prefix.prototype.configure()`

Configures `callback`, `length`, and `pattern` options of the `prefix` settings. The method works if an instance is not locked by the `lock()` method.

```typescript
public configure(settings: AffixSettings): this {
  if (guard.object(settings) && is.false(this.isLocked)) {
    if (is.defined(settings.callback)) {
      this.setCallback(settings.callback);
    }
    if (is.defined(settings.length)) {
      this.setLength(settings.length);
    }
    if (is.defined(settings.pattern)) {
      this.setPattern(settings.pattern);
    }
  }
  return this;
}
```

**Parameters:**

| Name: `type`              | Description |
| :------------------------ | :---------- |
| `settings: AffixSettings` | An `object` of a [`AffixSettings`](#affixsettings) interface |

**Returns:**

| Returns | Type     | Description                                                           |
| ------- | :------: | :-------------------------------------------------------------------- |
| `this`  | `Prefix` | The **return type** is the actual instance of the [`Prefix`](#prefix) |

The **return value** is an instance of a [`Prefix`](#prefix) for the chaining.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';
```

### `Prefix.prototype.define()`

Defines the `prefix` with the actual settings.

```typescript
public define(
  prefix: string,
  callback: ResultCallback = this.#callback
): string {
  return Prefix.define(prefix, {
    callback: this.#callback,
    length: this.getLength(),
    pattern: this.getPattern(),
  });
}
```

**Parameters:**

| Name: `type`               | Description |
| :------------------------- | :---------- |
| `prefix: string`           | A `string` type value |
| `callback: ResultCallback` | A [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `prefix` is a `string` type  |

**Returns:**

The **return value** is a `prefix` of a `string` type or an empty string if the `prefix` is not a `string` type.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';
```

### `Prefix.prototype.getCallback()`

Returns callback function of the actual settings.

```typescript
public getCallback(): ResultCallback {
  return this.#callback;
}
```

**Returns:**

| Returns          | Type             | Description                                                                     |
| ---------------- | :--------------: | :------------------------------------------------------------------------------ |
| `this.#callback` | `ResultCallback` | The **return type** is the function of the [`ResultCallback`][package-type-resultcallback] type |

The **return value** is a privately stored `callback` function.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

new Prefix().getCallback(); // Returns (result, value) => {…}
```

### `Prefix.prototype.getLength()`

Returns the maximum length of the actual settings for the `prefix`, which by default is set to `3`.

```typescript
public getLength(): number {
  return this.#length;
}
```

**Returns:**

| Returns        | Type     | Description                            |
| -------------- | :------: | :------------------------------------- |
| `this.#length` | `number` | The **return type** is a `number` type |

The **return value** is a privately stored maximum length of the `prefix`.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

new Prefix().getLength(); // Returns `3`
```

### `Prefix.prototype.getPattern()`

Returns pattern of the actual settings for the `prefix`, which by default is set to `/[^a-zA-Z0-9$_]/g`.

```typescript
public getPattern(): RegExp {
  return this.#pattern;
}
```

**Returns:**

| Returns         | Type     | Description                            |
| --------------- | :------: | :------------------------------------- |
| `this.#pattern` | `RegExp` | The **return type** is a [`RegExp`][js-regexp] type |

The **return value** is a privately stored regular expression to filter the `prefix`.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

new Prefix().getPattern(); // Returns /[^a-zA-Z0-9$_]/g
```

### `Prefix.prototype.getSettings()`

Returns the actual settings of a [`Prefix`](#prefix) instance.

```typescript
public getSettings(): AffixSettings {
  return {
    callback: this.getCallback(),
    length: this.getLength(),
    pattern: this.getPattern(),
  };
}
```

**Returns:**

| Returns                         | Type            | Description                                                  |
| :------------------------------ | :-------------: | :----------------------------------------------------------- |
| `{ callback, length, pattern }` | `AffixSettings` | A **return type** is an `object` of a [`AffixSettings`](#affixsettings) interface |

The **return value** is an `object` with the actual settings of a [`Prefix`](#prefix) instance.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

new Prefix().getSettings(); // Returns { callback: (result, value) => {…}, length: 3, pattern: /[^a-zA-Z0-9$_]/g }
```

### `Prefix.prototype.set()`

Sets the `prefix` with the actual settings. The method works if an instance is not locked by the `lock()` method.

```typescript
public set(
  prefix: string,
  callback: ResultCallback = this.getCallback()
): this {
  if (is.false(this.isLocked)) {
    this.#prefix = Prefix.define(prefix, {
      callback,
      length: this.getLength(),
      pattern: this.getPattern(),
    });
  }
  return this;
}
```

**Parameters:**

| Name: `type`               | Description |
| :------------------------- | :---------- |
| `prefix: string`           | A `string` type value |
| `callback: ResultCallback` | A [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `prefix` is a `string` type  |

**Returns:**

| Returns | Type     | Description                                                           |
| ------- | :------: | :-------------------------------------------------------------------- |
| `this`  | `Prefix` | The **return type** is the actual instance of the [`Prefix`](#prefix) |

The **return value** is an instance of a [`Prefix`](#prefix) for the chaining.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

const databasePrefix = new Prefix('database_', { length: 9 }) // databasePrefix.get returns 'database_'
  .set('wordpress_');                                         // databasePrefix.get returns 'wordpress'
```

### `Prefix.prototype.setCallback()`

Sets the callback for the `set()` method. The method works if an instance is not locked by the `lock()` method.

```typescript
public setCallback(callback: ResultCallback): this {
  this.#callback =
    guard.function(callback) && is.false(this.isLocked)
      ? callback
      : this.#callback;
  return this;
}
```

**Parameters:**

| Name: `type`               | Description |
| :------------------------- | :---------- |
| `callback: ResultCallback` | A [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `prefix` is of a `string` type |

**Returns:**

| Returns | Type     | Description                                                           |
| ------- | :------: | :-------------------------------------------------------------------- |
| `this`  | `Prefix` | The **return type** is the actual instance of the [`Prefix`](#prefix) |

The **return value** is an instance of a [`Prefix`](#prefix) for the chaining.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

let badPrefix: any = 27;

new Prefix('database_')
  .setCallback((result: boolean, value: any) => {
    if (is.false(result)) {
      throw new TypeError(`Prefix must be a string type got ${value}`);
    }
    return result;
  })
  .set(badPrefix); // TypeError: Prefix must be a string type got 27
```

### `Prefix.prototype.setLength()`

Sets the length of the `prefix`, which by default is set to `3`. The method works if an instance is not locked by the `lock()` method.

```typescript
public setLength(length: number, callback?: ResultCallback): this {
  this.#length =
    guard.is.number(length, callback) && is.false(this.isLocked)
      ? length
      : this.#length;
  return this;
}
```

**Parameters:**

| Name: `type`               | Description |
| :------------------------- | :---------- |
| `length: number`           | A `number` type value to denote the maximum length of the `prefix` |
| `callback: ResultCallback` | An optional [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `length` is of a `number` type  |

**Returns:**

| Returns | Type     | Description                                                           |
| ------- | :------: | :-------------------------------------------------------------------- |
| `this`  | `Prefix` | The **return type** is the actual instance of the [`Prefix`](#prefix) |

The **return value** is an instance of a [`Prefix`](#prefix) for the chaining.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

const databasePrefix = new Prefix('database_', { length: 9 }).setLength(3);
databasePrefix.getLength(); // returns '3'
```

### `Prefix.prototype.setPattern()`

Sets the pattern for the `prefix`. The method works if an instance is not locked by the `lock()` method.

```typescript
public setPattern(pattern: RegExp, callback?: ResultCallback): this {
  this.#pattern =
    is.regexp(pattern, callback) && is.false(this.isLocked)
      ? pattern
      : this.#pattern;
  return this;
}
```

**Parameters:**

| Name: `type`               | Description |
| :------------------------- | :---------- |
| `pattern: RegExp`          | A [`RegExp`][js-regexp] type value to filter the `prefix` |
| `callback: ResultCallback` | An optional [`ResultCallback`][package-type-resultcallback] function to handle the result of the check whether or not the `pattern` is of a [`RegExp`][js-regexp] type  |

**Returns:**

| Returns | Type     | Description                                                           |
| ------- | :------: | :-------------------------------------------------------------------- |
| `this`  | `Prefix` | The **return type** is the actual instance of the [`Prefix`](#prefix) |

The **return value** is an instance of a [`Prefix`](#prefix) for the chaining.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

new Prefix('database_1', { length: 10 }) // databasePrefix.get returns 'database_'
  .setPattern(/[^0-9]/g)                 // databasePrefix.get returns 'database_'
  .updatePrefix();                       // databasePrefix.get returns '1'
```

### `Prefix.prototype.updatePrefix()`

Updates privately stored `prefix` with the actual settings. The method works if an instance is not locked by the `lock()` method.

```typescript
public updatePrefix(): this {
  this.set(this.#prefix);
  return this;
}
```

**Returns:**

| Returns | Type     | Description                                                           |
| ------- | :------: | :-------------------------------------------------------------------- |
| `this`  | `Prefix` | The **return type** is the actual instance of the [`Prefix`](#prefix) |

The **return value** is an instance of a [`Prefix`](#prefix) for the chaining.

**Usage:**

```typescript
// Example usage.
import { Prefix } from '@angular-package/property';

new Prefix('database_', { length: 9 }) // databasePrefix.get returns 'database_'
  .setLength(3)                        // databasePrefix.get returns 'database_'
  .updatePrefix();                     // databasePrefix.get returns 'dat'
```

----

### Name interfaces

### AffixSettings

Settings with `callback`, `length`, and `pattern` options for the `affix`.

```typescript
interface AffixSettings extends Pick<Settings, 'length' | 'pattern'> {
  callback?: ResultCallback;
}
```

### NameSettings

Settings with `callback`, `length`, `pattern`, `prefix`, and `suffix` options for the name.

```typescript
interface NameSettings extends Settings {
  /**
   * The callback function of a `ResultCallback` type.
   */
  callback?: ResultCallback;

  /**
   * Prefix of a `string` type or an instance of a `Prefix`.
   */
  prefix?: string | Prefix;

  /**
   * Suffix of a `string` type or an instance of a `Suffix`.
   */
  suffix?: string | Suffix;
}
```

### Settings

Common settings.

```typescript
interface Settings {
  /**
   * Length of a `number` type.
   */
  length?: number;

  /**
   * Pattern of a `RegExp` type.
   */
  pattern?: RegExp;
}
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

MIT © angular-package ([license][property-license])

----

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
  <!-- GitHub -->
  [property-github-readme]: https://github.com/angular-package/property#readme
  <!-- npm: badges -->
  [property-npm-badge-svg]: https://badge.fury.io/js/%40angular-package%2Fproperty.svg
  [property-npm-badge]: https://badge.fury.io/js/%40angular-package%2Fproperty
  [property-npm-readme]: https://www.npmjs.com/package/@angular-package/property#readme

<!-- Package: type -->
  <!-- npm -->
  [type-npm-badge-svg]: https://badge.fury.io/js/%40angular-package%2Ftype.svg
  [type-npm-badge]: https://badge.fury.io/js/%40angular-package%2Ftype
  [type-npm-readme]: https://www.npmjs.com/package/@angular-package/type#readme

  <!-- GitHub -->
  [type-github-readme]: https://github.com/angular-package/type#readme

  [package-type-resultcallback]: https://github.com/angular-package/type#resultcallback
  [package-type-key]: https://github.com/angular-package/type#key

<!-- Package: change-detection -->
  [cd-github-readme]: https://github.com/angular-package/change-detection#readme

<!-- Package: prism -->
  [prism-github-readme]: https://github.com/angular-package/prism#readme

<!-- Package: ui -->
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
