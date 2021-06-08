// `is`, `guard` objects.
import { guard, is, ResultCallback } from '@angular-package/type';
// Function.
import { callbackErrorMessage } from '../../lib/callback-error-message.function';
import { pickProperty } from '../../lib/pick-property.function';
// Type.
import { ThisAccessorDescriptor } from '../type/this-accessor-descriptor.type';
// Constant.
const errorCallback: ResultCallback = callbackErrorMessage(
  `Accessor descriptor must be an \`ThisAccessorDescriptor<Value, Obj>\` type`
);
/**
 * Strictly define, set and store privately single property accessor descriptor of a `ThisAccessorDescriptor<Value, Obj>` type.
 * Features:
 * + The return value of the `get()` function is of a `Value` type.
 * + The parameter of the `set()` function is of a `Value` type.
 * + Use `this` of an `Obj` type in both `get()` and `set()` functions.
 * + Strictly define property accessor descriptor.
 * + Strictly set and store at the same time single property accessor descriptor.
 * + `set()` and `define()` method picks `configurable`, `enumerable`, `get`, `set` properties from the provided data.
 * + Get privately stored accessor descriptor defined by the `set()` method.
 */
export class AccessorDescriptors<Value, Obj = any> {
  // Single private accessor descriptor.
  #descriptor: ThisAccessorDescriptor<Value, Obj> = {
    configurable: true,
    enumerable: true,
  };

  /**
   * Get privately stored accessor descriptor of a `ThisAccessorDescriptor<Value, Obj>` type defined by the `set()` method.
   */
  get get(): ThisAccessorDescriptor<Value, Obj> {
    return this.#descriptor;
  }

  /**
   * Creates an instance, and optionally sets an accessor descriptor of a `ThisAccessorDescriptor<Value, Obj>` type.
   * @param descriptor An optional `object` of a `ThisAccessorDescriptor<Value, Obj>` type to initially set accessor descriptor.
   */
  constructor(descriptor?: ThisAccessorDescriptor<Value, Obj>) {
    if (is.object<ThisAccessorDescriptor<Value, Obj>>(descriptor)) {
      this.set(descriptor);
    }
  }

  /**
   * Returns strictly defined accessor descriptor of a `ThisAccessorDescriptor<Value, Obj>` type on `get` or `set` property detected.
   * @param descriptor An `object` of a `ThisAccessorDescriptor<Value, Obj>` type, to merge with the default descriptor.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with `get` or `set` property.
   * @throws Throws an error if the descriptor is not an object of a `ThisAccessorDescriptor<Value, Obj>` type, which means it
   * doesn't contain `get` or `set` property.
   * @returns The return value is an `object` of a `ThisAccessorDescriptor<Value, Obj>` type.
   */
  static define<Value, Obj>(
    descriptor: ThisAccessorDescriptor<Value, Obj>,
    callback: ResultCallback = errorCallback
  ): ThisAccessorDescriptor<Value, Obj> {
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
   * Strictly set with the default values, and store privately single accessor descriptor.
   * Strictly means method `set()` picks only `configurable`, `enumerable`, `get`, `set` properties.
   * @param descriptor An `object` of a `ThisAccessorDescriptor<Value, Obj>` type to set and store privately.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the descriptor is an `object`
   * containing the `get` or `set` property.
   * @throws Throws an error if the descriptor is not an object of a `ThisAccessorDescriptor<Value, Obj>` type, which means it
   * doesn't contain `get` or `set` property.
   * @returns The return value is the `AccessorDescriptors` instance for the chaining.
   */
  public set(
    descriptor: ThisAccessorDescriptor<Value, Obj>,
    callback: ResultCallback = errorCallback
  ): this {
    this.#descriptor = AccessorDescriptors.define<Value, Obj>(
      descriptor,
      callback
    );
    return this;
  }
}
