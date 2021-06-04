// `is`, `guard` objects.
import { guard, is, ResultCallback } from '@angular-package/type';
// Function.
import { pickProperty } from '../../lib/pick-property.function';
// Type.
import { AccessorDescriptor } from '../type/accessor-descriptor.type';
/**
 * Class to strictly define and store privately single accessor descriptor.
 * Features:
 * ✓ Strictly define accessor descriptor, when .
 * ✓ Strictly set and store at the same time single accessor descriptor.
 * ✓ `set()` and `define()` method filters provided data with `configurable`, `enumerable`, `get`, `set` properties.
 * ✓ Get privately stored accessor descriptor defined by `set()` method.
 */
export class AccessorDescriptors<Value, Obj = any> {
  // Accessor descriptor properties.
  #pick: (keyof AccessorDescriptor<Value, Obj>)[] = [
    'configurable',
    'enumerable',
    'get',
    'set',
  ];
  // Single private accessor descriptor.
  #descriptor: AccessorDescriptor<Value, Obj> = {
    configurable: true, // Defaults from js is set to `false`
    enumerable: true, // Defaults from js is set to `false`
  };

  /**
   * Get privately stored accessor descriptor defined by `set()` method.
   */
  get get(): AccessorDescriptor<Value, Obj> {
    return this.#descriptor;
  }

  /**
   * Creates instance and an optionally set accessor descriptor.
   * @param descriptor An optional `AccessorDescriptor<Value>` type value to initially set accessor descriptor.
   */
  constructor(descriptor?: AccessorDescriptor<Value, Obj>) {
    if (is.object<AccessorDescriptor<Value, Obj>>(descriptor)) {
      this.set(descriptor);
    }
  }

  /**
   * Callback function for the `set()` method to check the inputted `descriptor`.
   * @param result A `boolean` type `result` of the check.
   * @param value Any type `value` from the check.
   * @returns A `boolean` indicating whether or not the descriptor is an `AccessorDescriptor` type.
   */
  public callback: ResultCallback = (result: boolean, value: any): boolean => {
    if (result === false) {
      value = is.object(value) ? JSON.stringify(value) : value;
      throw new Error(
        `Accessor descriptor must be an \`AccessorDescriptor<Value, Obj>\` type, got value ${value}`
      );
    }
    return result;
  };

  /**
   * Strictly define accessor descriptor when `get` or `set` property is detected.
   * @param descriptor The value of a `AccessorDescriptor` type to merge with the default descriptor.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with `get` or `set` property.
   * @throws Throws an error if the `descriptor` is not an `object` and has no `get` or `set` property.
   * @returns A `AccessorDescriptor` of a `Value` type.
   */
  public define(
    descriptor: AccessorDescriptor<Value, Obj>,
    callback: ResultCallback = this.callback
  ): AccessorDescriptor<Value, Obj> {
    if (
      guard.is.objectKey(descriptor, 'get', callback) ||
      guard.is.objectKey(descriptor, 'set', callback)
    ) {
      return {
        ...this.#descriptor,
        ...pickProperty(descriptor, this.#pick),
      };
    }
    return this.#descriptor;
  }

  /**
   * Strictly set with the default values and store privately single accessor descriptor.
   * Strictly means method `set()` picks only `configurable`, `enumerable`, `get`, `set` properties.
   * @param descriptor A `AccessorDescriptor` type value.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`.
   * @throws Throws an error if the descriptor is not an `AccessorDescriptor<Value, Obj>` type.
   * @returns A `AccessorDescriptors` instance.
   */
  public set(
    descriptor: AccessorDescriptor<Value, Obj>,
    callback: ResultCallback = this.callback
  ): this {
    this.#descriptor = {
      ...this.#descriptor,
      ...this.define(descriptor, callback),
    };
    return this;
  }
}
