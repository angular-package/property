// Class.
import { Property } from '../../lib';

// Callback.
import { callbacks } from '../../callback/src/callback.object';

// Type.
import { ResultCallback } from '../../type/result-callback.type';
import { ThisAccessorDescriptor } from '../type/this-accessor-descriptor.type';

/**
 * Strictly defines, sets, and stores privately single property accessor descriptor of a `ThisAccessorDescriptor<Value, Obj>` type.
 * Features:
 * + Guarded process of defining the object descriptor, but properties are not being checked against proper values.
 * + Strictly defines property accessor descriptor.
 * + Strictly sets, and stores at the same time single property accessor descriptor.
 * + Accessor descriptor is of a `ThisAccessorDescriptor<Value, Obj>` type:
 *    - The return value of the `get()` function is of a generic `Value` type.
 *    - The parameter of the `set()` function is of a generic `Value` type.
 *    - Keyword `this` refers to an `Obj` variable in both `get()` and `set()` functions.
 * Methods `set()` and `define()` picks `configurable`, `enumerable`, `get`, `set` properties from the provided data.
 * Get privately stored accessor descriptor defined by the `set()` method.
 */
export class AccessorDescriptors<Value, Obj extends object> {
  /**
   * Returns strictly defined accessor descriptor of a `ThisAccessorDescriptor<Value, Obj>` type on `get` or `set` property detected.
   * @param descriptor An `object` of a `ThisAccessorDescriptor<Value, Obj>` type, to define with the default values of the
   * `CommonDescriptor`.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with `get` or `set` property, by default it uses `accessorCallback()` function.
   * @throws Throws an error if the descriptor is not an object of a `ThisAccessorDescriptor<Value, Obj>` type, which means it
   * doesn't contain `get` or `set` property.
   * @returns The return value is an `object` of a `ThisAccessorDescriptor<Value, Obj>` type.
   */
  public static define<Value, Obj extends object = object>(
    descriptor: ThisAccessorDescriptor<Value, Obj>,
    callback: ResultCallback = callbacks['accessor']
  ): ThisAccessorDescriptor<Value, Obj> {
    const result = {
      ...{
        configurable: true,
        enumerable: true,
      },
      ...Property.pick(descriptor, 'configurable', 'enumerable', 'get', 'set')
    };
    callback && callback(typeof result === 'object', result);
    return result;
  }

  /**
   * Get privately stored accessor descriptor of a `ThisAccessorDescriptor<Value, Obj>` type defined by the `set()` method.
   */
  get get(): ThisAccessorDescriptor<Value, Obj> {
    return this.#descriptor;
  }

  // Single private accessor descriptor.
  #descriptor: ThisAccessorDescriptor<Value, Obj> = {
    configurable: true,
    enumerable: true,
  };

  /**
   * Creates an instance, and optionally sets an accessor descriptor of a `ThisAccessorDescriptor<Value, Obj>` type.
   * @param descriptor An optional `object` of a `ThisAccessorDescriptor<Value, Obj>` type to initially set accessor descriptor.
   */
  constructor(
    descriptor?: ThisAccessorDescriptor<Value, Obj>,
    callback?: ResultCallback
  ) {
    descriptor && this.set(descriptor, callback);
  }

  /**
   * Guards the `descriptor` to be an `object` of a `ThisAccessorDescriptor<Value, Obj>` type.
   * @param descriptor The object of a `ThisAccessorDescriptor<Value, Obj>` type to guard.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the descriptor is an `object`
   * containing the `get` or `set` property.
   * @throws Throws an error if the descriptor is not an object of a `ThisAccessorDescriptor<Value, Obj>` type, which means it
   * doesn't contain `get` or `set` property.
   * @returns The return value is a boolean indicating whether the `descriptor` is an `object` with the `get` or `set` property.
   */
  static guard<Value, Obj extends object>(
    descriptor: ThisAccessorDescriptor<Value, Obj>,
    callback: ResultCallback = callbacks['accessor']
  ): descriptor is ThisAccessorDescriptor<Value, Obj> {
    let result = true;
    Object
      .keys(descriptor)
      .forEach(key => (result === true) && (result = key in {
        'configurable': true, 'enumerable': true, 'get': true, 'set': true
      }));
    return callback(result, descriptor);
  }

  /**
   * Strictly sets with the last saved descriptor values, and stores privately single accessor descriptor.
   * Strictly means, method picks `configurable`, `enumerable`, `get`, `set` properties from the `descriptor` to set.
   * @param descriptor An `object` of a `ThisAccessorDescriptor<Value, Obj>` type, to set with the last saved descriptor.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the descriptor is an `object`
   * containing the `get` or `set` property, by default it uses `accessorCallback()` from the static `guard()` method.
   * @throws Throws an error if the descriptor is not an object of a `ThisAccessorDescriptor<Value, Obj>` type, which means it
   * doesn't contain `get` or `set` property.
   * @returns The return value is the `AccessorDescriptors` instance for the chaining.
   */
  public set(
    descriptor: ThisAccessorDescriptor<Value, Obj>,
    callback?: ResultCallback
  ): this {
    this.#descriptor = AccessorDescriptors.define(descriptor, callback);
    return this;
  }
}
