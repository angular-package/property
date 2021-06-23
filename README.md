# Packages

Useful and simple to use packages based on the [angular.io][angulario].

| Package          | Description                                  | Status                                                 | Readme                                                 |
| :--------------- | :------------------------------------------- | :----------------------------------------------------: | :----------------------------------------------------- |
| change-detection | Improve application performance.             | *In Progress*                                          | [Readme][cd-readme-github]                             |
| prism            | `Prism` highlighter module.                  | *In Progress*                                          | [Readme][prism-readme-github]                          |
| property         | Features to handle object properties.        | [![npm version][property-npm-svg]][property-npm-badge] | [Readme][property-readme-github]                       |
| ui               | User interface.                              | *In Progress*                                          | [Github][ui-readme-github]                             |
| type             | Common types, type guards and type checkers. | [![npm version][type-npm-svg]][type-npm-badge]         | [Github][type-readme-github] \| [npm][type-readme-npm] |

## angular-package/property

Features to handle properties.

[![npm version][property-npm-svg]][property-npm-badge]
[![GitHub issues][property-badge-issues]][property-issues]
[![GitHub forks][property-badge-forks]][property-forks]
[![GitHub stars][property-badge-stars]][property-stars]
[![GitHub license][property-badge-license]][property-license]
[![Support me on Patreon][patreon-badge]][patreon-link]

```typescript
// Object.
import {
  get,
  // callback
  callbacks,
} from '@angular-package/property';
```

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
// Class.
import {
  // descriptor
  AccessorDescriptors,
  DataDescriptors,
  Descriptor,
} from '@angular-package/property';
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
  * [`errorCallback()`](#errorcallback)
  * [`callbacks`](#callbacks)
* [Function](#function)
  * [`getExistProperty()`](#getexistproperty)
  * [`getProperties()`](#getproperties)
  * [`getProperty()`](#getproperty)
  * [`setProperty()`](#setproperty)
* [Object](#object)
  * [`get`](#get)
* **Package**
  * [Descriptor](#descriptor-sub-package)
    * [`getDescriptor()`](#getdescriptor)
    * [`getDescriptors()`](#getdescriptors)
    * [`Descriptor`](#descriptor)
    * [`AccessorDescriptors`](#accessordescriptors)
    * [`DataDescriptors`](#datadescriptors)
    * [Interface](#descriptor-interface)
    * [Type](#descriptor-type)
  * [Name](#name-sub-package)
    * [`Prefix`](#prefix)
    * [`Suffix`](#suffix)
    * [`Name`](#name)
  * [Object](#object-sub-package)
    * [`getObject()`](#getobject)
* [Git](#git)
  * [Commit](#commit)
  * [Versioning](#versioning)
* [License](#license)

## How angular-package understands

Check
> Is to check the provided argument to be **the same** as **expected**.

Type guard (constrain)
> Is to constrain the parameter type to **not let** input **unexpected** value in the **code editor**.

Guard
> Is a **combination** of both above to **guard type** in the **code editor** and in the provided argument by checking it.

----

## Installation

Install `@angular-package/property` package with command:

```bash
npm i --save @angular-package/property
```

----

## Callback

### `errorCallback()`

**Description:**

Wrapper for the [`ResultCallback`][package-type-resultcallback] type function to throw an [`Error`][js-error] with the specified message on the specified `false` or `true` state.

**Syntax:**

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

The return value is a predefined `function` for use as the callback.

```typescript
// Example usage.

```

### `callbacks`

**Description:**

Object with all necessary callbacks for the property package. It can be overwritten with custom [`errorCallback()`](#errorcallback) function.

**Syntax:**

```typescript
const callbacks: Callbacks = {
  accessor: errorCallback(
    `Accessor descriptor must be an \`ThisAccessorDescriptor<Value, Obj>\` type`,
    'type'
  ),
  data: errorCallback(
    `Data descriptor must be an \`DataDescriptors<Value>\` type`,
    'type'
  ),
  descriptor: errorCallback(`Any kind of descriptor was not found`, 'type'),
  getExistProperty: errorCallback(
    `Object with the specified key does not exist`,
    'type'
  ),
  getObject: errorCallback(`Provided value is not an \`object\``, 'type'),
  name: errorCallback(`Name must be a \`string\` type`, 'type'),
  prefix: errorCallback(`Prefix must be a \`string\` type`, 'type'),
  suffix: errorCallback(`Suffix must be a \`string\` type`, 'type'),
  constantName: errorCallback(
    `A \`string\` \`name\` must be initialized`,
    'type'
  ),
};
```

----

## Object

### `get`

**Description:**

Get object with all prefixed with `get` functions.

**Syntax:**

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

**Description:**

Use `getExistProperty()` or `get.existProperty()` to return the value of the existing specified property from the specified `object`.

**Features:**

* Guards getting the object property value by:
  * Constraints the `object` parameter with a generic `Obj` variable of an `object` type.
  * Constraints the `key` parameter with a `Key` variable which is of a key of the `Obj` variable.
  * Checks whether the provided object is of an `object` type and `key` of a [`Key`][package-type-key] type, and if not, throws an [`Error`][js-error].
  * Checks whether the provided object has own property by using [`Object.prototype.hasOwnProperty()`][js-hasownproperty] method.
* Possibility to use custom `callback` function of a [`ResultCallback`][package-type-resultcallback] type.

**Import:**

```typescript
import { get, getExistProperty } from '@angular-package/property';
```

**Syntax:**

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

**Description:**

Use `getProperties()` or `get.properties()` to get specified properties from the specified `object`.

**Features:**

* Constraints the `object` parameter with a generic `Obj` variable of an `object` type.
* Constraints the `key` parameter with a `Key` variable which is of a key of the `Obj` variable.
* Checks whether the provided object is of an `object` type and `key` of a [`Key`][package-type-key] type, and if not, throws an [`Error`][js-error].
* Checks whether the provided object has own property by using [`Object.prototype.hasOwnProperty()`][js-hasownproperty] method.
* Uses custom `callback` function of a [`ResultCallback`][package-type-resultcallback] type.
* Returns an object with the specified properties from the specified `object`.

**Import:**

```typescript
import { get, getProperties } from '@angular-package/property';
```

**Syntax:**

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

**Description:**

Use `getProperty()` or `get.property()` to return the value of the specified property from the `object`.

**Import:**

```typescript
import { get, getProperty } from '@angular-package/property';
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

**Description:**

Wrapper function for the [`Object`][js-object] static method [`getOwnPropertyDescriptor()`][js-object-getownpropertydescriptor]. Use `getDescriptor()` or `get.descriptor()` to return descriptor of the specified property from the specified object.

> Gets the own property descriptor of the specified object. An own property descriptor is one that is defined directly on the object and is not inherited from the object's prototype.

**Features:**

Additional features instead of the default from the wrapped [`getOwnPropertyDescriptor()`][js-object-getownpropertydescriptor] method.

* Constraints the `object` parameter with a generic `Obj` variable of an `object` type.
* Constraints the `key` parameter with a `Key` variable which is of a key of the `Obj` variable.

**Import:**

```typescript
import { get, getDescriptor } from '@angular-package/property';
```

**Syntax:**

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

**Description:**

Wrapper function for the [`Object`][js-object] static method [`getOwnPropertyDescriptors()`][js-object-getOwnpropertydescriptors]. Use `getDescriptors()` or `get.descriptors()` to return all property descriptors from the specified `object`.

> Returns an object containing all own property descriptors of an object.

**Features:**

Additional features instead of the default from the wrapped [`getOwnPropertyDescriptors()`][js-object-getOwnpropertydescriptors] method.

* Constraints the `object` parameter with a generic `Obj` variable of an `object` type.

**Import:**

```typescript
import { get, getDescriptors } from '@angular-package/property';
```

**Syntax:**

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

### Descriptor

**Description:**

Handles object property descriptor.

**Features:**

* Strictly defines accessor and data descriptor with the [`defineAccessor()`][descriptor-defineaccessor] and [`defineData()`][descriptor-definedata] static methods.
* Strictly sets, and stores accessor and data descriptor with the `Descriptor` instance respectively `set.accessor()` and `set.data()` methods of the instance.
* Get privately stored accessor descriptor defined by the `set.accessor()` method by using `get.accessor` property of the instance.
* Get privately stored data descriptor defined by the `set.data()` method by using `get.data` property of the instance.

> Strictly means, it guards provided descriptor by checking it against its unique keys and by picking only properties that belong to the appropriate descriptor.

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

#### `Descriptor.fromObject()`

**Description:**

Returns property descriptors from the specified detected object.

**Syntax:**

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

#### `Descriptor.fromProperty()`

**Description:**

Returns property descriptors from the specified detected object.

**Syntax:**

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

The default callback function for the `AccessorDescriptors.guard()` static method that's used to guard provided value.

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

<!-- Funding -->
[patreon-badge]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.vercel.app%2Fapi%3Fusername%3Dsciborrudnicki%26type%3Dpatrons&style=flat
[patreon-link]: https://patreon.com/sciborrudnicki

[angulario]: https://angular.io
[skeleton]: https://github.com/angular-package/skeleton

<!-- Update status -->
[fix]: https://img.shields.io/badge/-fix-red
[new]: https://img.shields.io/badge/-new-green
[update]: https://img.shields.io/badge/-update-red

<!-- Property: badges -->
[property-badge-issues]: https://img.shields.io/github/issues/angular-package/property
[property-badge-forks]: https://img.shields.io/github/forks/angular-package/property
[property-badge-stars]: https://img.shields.io/github/stars/angular-package/property
[property-badge-license]: https://img.shields.io/github/license/angular-package/property

<!-- Property: github -->
[property-issues]: https://github.com/angular-package/property/issues
[property-forks]: https://github.com/angular-package/property/network
[property-license]: https://github.com/angular-package/property/blob/master/LICENSE
[property-stars]: https://github.com/angular-package/property/stargazers

<!-- Package: property -->
[property-npm-svg]: https://badge.fury.io/js/%40angular-package%2Fproperty.svg
[property-npm-badge]: https://badge.fury.io/js/%40angular-package%2Fproperty
[property-readme-github]: https://github.com/angular-package/property#readme
[property-readme-npm]: https://www.npmjs.com/package/@angular-package/property#readme

<!-- Package: type -->
[type-npm-svg]: https://badge.fury.io/js/%40angular-package%2Ftype.svg
[type-npm-badge]: https://badge.fury.io/js/%40angular-package%2Ftype
[type-readme-github]: https://github.com/angular-package/type#readme
[type-readme-npm]: https://www.npmjs.com/package/@angular-package/type#readme

[package-type-resultcallback]: https://github.com/angular-package/type#resultcallback
[package-type-key]: https://github.com/angular-package/type#key

<!-- Package: change-detection -->
[cd-readme-github]: https://github.com/angular-package/change-detection#readme

<!-- Package: prism -->
[prism-readme-github]: https://github.com/angular-package/prism#readme

<!-- Package: ui -->
[ui-readme-github]: https://github.com/angular-package/ui#readme

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

[js-string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[stringconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String

[js-symbol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[symbolconstructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol

[js-undefined]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined

<!-- Typescript -->
[ts-classes]: https://www.typescriptlang.org/docs/handbook/2/classes.html
[ts-function]: https://www.typescriptlang.org/docs/handbook/2/functions.html
[ts-interface]: https://www.typescriptlang.org/docs/handbook/interfaces.html#our-first-interface
