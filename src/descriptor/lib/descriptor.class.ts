// @angular-package/type.
import { is, ResultCallback } from '@angular-package/type';
// Class.
import { AccessorDescriptors } from './accessor-descriptors.class';
import { DataDescriptors } from './data-descriptors.class';
import { Objects } from '../../object/src/objects.class';
// Interface.
import { DataDescriptor } from '../interface/data-descriptor.interface';
import { GetSelectedDescriptor } from '../interface/get-selected-descriptor.interface';
// Type.
import { AnyDescriptor } from '../type/any-descriptor.type';
import { ObjectPropertyDescriptors } from '../type/object-property-descriptors.type';
import { ThisAccessorDescriptor } from '../type/this-accessor-descriptor.type';
// Constant.
import { SetSelectedDescriptor } from '../interface/set-selected-descriptor.interface';
// Callback.

/**
 * Handle object property descriptor.
 * Features:
 * + Strictly define accessor and data descriptor with static `defineAccessor()` and `defineData()` methods.
 * + Strictly set, and store accessor and data descriptor with the `Descriptor`
 *   instance respectively `set.accessor()` and `set.data()` methods.
 * + Get privately stored accessor descriptor defined by the `set.accessor()` method by using `get.accessor` property.
 * + Get privately stored data descriptor defined by the `set.data()` method by using `get.data` property.
 */
export class Descriptor<Value extends any, Obj extends object> {
  // Get privately stored descriptor, and from the object or object property.
  get get(): GetSelectedDescriptor<Value, Obj> {
    return {
      accessor: this.#accessor.get,
      data: this.#data.get,
      from: {
        object: Descriptor.fromObject,
        property: Descriptor.fromProperty,
      },
    };
  }

  // Set selected accessor or data descriptor.
  get set(): SetSelectedDescriptor<Value, Obj> {
    return {
      accessor: (
        descriptor: ThisAccessorDescriptor<Value, Obj>,
        callback?: ResultCallback
      ): this => {
        this.#accessor.set(descriptor, callback);
        return this;
      },
      data: (
        descriptor: DataDescriptor<Value>,
        callback?: ResultCallback
      ): this => {
        this.#data.set(descriptor, callback);
        return this;
      },
    };
  }

  // Private accessor descriptor instance.
  #accessor: AccessorDescriptors<Value, Obj> = new AccessorDescriptors<
    Value,
    Obj
  >();
  // Private data descriptor instance.
  #data: DataDescriptors<Value> = new DataDescriptors<Value>();

  /**
   * Creates an instance, and optionally sets descriptor of any type.
   * @param descriptor An optional `object` of an `AnyDescriptor<Value, Obj>` type to initially set any kind of descriptor.
   */
  constructor(descriptor?: AnyDescriptor<Value, Obj>) {
    if (is.defined(descriptor)) {
      this.#accessor.set(descriptor, (result) => result);
      this.#data.set(descriptor, (result) => result);
    }
  }

  /**
   * Returns defined accessor descriptor of a `ThisAccessorDescriptor<Value, Obj>` type, on `get` or `set` property detected.
   * @param descriptor An `object` of a `ThisAccessorDescriptor<Value, Obj>` type, to define with the default values of the
   * `CommonDescriptor`.
   * @callback callback An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an
   * `object` with `get` or `set` property, by default it uses  `accessorCallback()` function from the `guard`.
   * @throws Throws an `Error` if the `descriptor` is not an `object` of a `ThisAccessorDescriptor<Value, Obj>` type,
   * which means it doesn't contain `get` or `set` property.
   * @returns The return value is an `object` of a `ThisAccessorDescriptor<Value, Obj>` type.
   */
  static defineAccessor<Value, Obj>(
    descriptor: ThisAccessorDescriptor<Value, Obj>,
    callback?: ResultCallback
  ): ThisAccessorDescriptor<Value, Obj> {
    return AccessorDescriptors.define(descriptor, callback);
  }

  /**
   * Returns defined data descriptor of a `DataDescriptor<Value>` interface, on `writable` or `value` property detected.
   * @param descriptor An `object` of a `DataDescriptor<Value>` interface, to set with the default values of the
   * `CommonDescriptor`.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with the `writable` or `value` property, by default it uses `dataCallback()` function from the static `DataDescriptors.guard()` method.
   * @returns The return value is an `object` of a `DataDescriptor<Value>` interface.
   */
  static defineData<Value>(
    descriptor: DataDescriptor<Value>,
    callback?: ResultCallback
  ): DataDescriptor<Value> {
    return DataDescriptors.define(descriptor, callback);
  }

  /**
   * Returns property descriptors from the specified detected object.
   * @param object An `object` of a generic `Obj` type to get own property descriptor with the specified `key`.
   * If `class` is provided then it uses its prototype.
   * @returns The return value is an `object` of a `ObjectPropertyDescriptors<Obj>` type.
   */
  static fromObject<Obj extends object>(
    object: Obj
  ): ObjectPropertyDescriptors<Obj> | undefined {
    return Object.getOwnPropertyDescriptors(Objects.get<Obj>(object));
  }

  /**
   * Returns property descriptor from the `object` or `class` prototype.
   * Wrapper function for the `getOwnPropertyDescriptor`, which "Gets the own property descriptor of the specified object."
   * @param object An `object` of a generic `Obj` type or a class to get own property descriptor with the specified `key`.
   * If `class` is provided then it uses its prototype to get the property descriptor.
   * @param key A `keyof Obj` value to get property descriptor from the `object`.
   * @returns The return value is an `object` of a `PropertyDescriptor` interface or an `undefined`.
   */
  static fromProperty<Obj extends object, Key extends keyof Obj>(
    object: Obj,
    key: Key
  ): PropertyDescriptor | undefined {
    return Object.getOwnPropertyDescriptor(Objects.get(object), key);
  }
}
