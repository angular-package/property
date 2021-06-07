// `is`, `guard` objects.
import { guard, is, ResultCallback } from '@angular-package/type';
// Function.
import { pickProperty } from '../../lib/pick-property.function';
// Type.
import { AccessorDescriptor } from '../type/accessor-descriptor.type';
/**
 * Strictly define, set and store privately single property accessor descriptor.
 * Features:
 * + Strictly define accessor descriptor.
 * + Strictly set and store at the same time single property accessor descriptor.
 * + `set()` and `define()` method picks `configurable`, `enumerable`, `get`, `set` properties from the provided data.
 * + Get privately stored accessor descriptor defined by `set()` method.
 */
export class AccessorDescriptors<Value, Obj = any> {
  // Single private accessor descriptor.
  #descriptor: AccessorDescriptor<Value, Obj> = {
    configurable: true,
    enumerable: true,
  };

  /**
   * Get privately stored accessor descriptor defined by `set()` method.
   */
  get get(): AccessorDescriptor<Value, Obj> {
    return this.#descriptor;
  }

  /**
   * Creates an instance and optionally sets an accessor descriptor.
   * @param descriptor An optional `AccessorDescriptor<Value>` type value to initially set.
   */
  constructor(descriptor?: AccessorDescriptor<Value, Obj>) {
    if (is.object<AccessorDescriptor<Value, Obj>>(descriptor)) {
      this.set(descriptor);
    }
  }

  /**
   * Returns strictly defined accessor descriptor of an `AccessorDescriptor` type when `get` or `set` property is detected.
   * @param descriptor The value of an `AccessorDescriptor` type to merge with the default descriptor.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with `get` or `set` property.
   * @returns The return value is an `object` of an `AccessorDescriptor` of a generic `Value` type.
   */
  static define<Value, Obj>(
    descriptor: AccessorDescriptor<Value, Obj>,
    callback?: ResultCallback
  ): AccessorDescriptor<Value, Obj> {
    if (
      guard.is.objectKey(descriptor, 'get', callback) ||
      guard.is.objectKey(descriptor, 'set', callback)
    ) {
      return pickProperty(
        {
          ...{
            configurable: true,
            enumerable: true,
          },
          ...descriptor,
        },
        ['configurable', 'enumerable', 'get', 'set']
      );
    }
    return {};
  }

  /**
   * Strictly set with the default values and store privately single accessor descriptor.
   * Strictly means method `set()` picks only `configurable`, `enumerable`, `get`, `set` properties.
   * @param descriptor An `AccessorDescriptor` type value.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not a descriptor is an object
   * containing the `get` or `set` key.
   * @throws Throws an error if the descriptor is not an `AccessorDescriptor<Value, Obj>` type.
   * @returns The return value is the `AccessorDescriptors` instance for the chaining.
   */
  public set(
    descriptor: AccessorDescriptor<Value, Obj>,
    callback: ResultCallback = this.callback
  ): this {
    this.#descriptor = AccessorDescriptors.define<Value, Obj>(
      descriptor,
      callback
    );
    return this;
  }

  /**
   * Callback function for the `set()` method to check the inputted `descriptor`.
   * @param result A `boolean` type `result` of the check.
   * @param value Any type `value` from the check.
   * @returns A `boolean` indicating whether or not the descriptor is an `AccessorDescriptor` type.
   */
  private callback: ResultCallback = (result: boolean, value: any): boolean => {
    if (result === false) {
      value = is.object(value) ? JSON.stringify(value) : value;
      throw new Error(
        `Property accessor descriptor must be an \`AccessorDescriptor<Value, Obj>\` type, got value ${value}`
      );
    }
    return result;
  }
}
