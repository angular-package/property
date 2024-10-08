// Class.
import { Obj } from '../../object';
import { Property } from '../../lib';
// Callback.
import { callbacks } from '../../callback/src/callback.object';
// Interface.
import { DataDescriptor } from '../interface/data-descriptor.interface';
// Type.
import { ResultCallback } from '../../type/result-callback.type';

/**
 * Strictly defines, sets, and stores privately property data descriptor of a `DataDescriptor<Value>` interface.
 * Features:
 * + Data descriptor is of a `DataDescriptor<Value>` interface:
 *     - The `value` property is of a generic `Value` type.
 * + Guarded process of defining the object descriptor, but properties are not being checked against proper values.
 * + Strictly defines property data descriptor.
 * + Strictly sets, and stores at the same time property data descriptor.
 * + Method `set()` of the instance and static `define()` picks `configurable`, `enumerable`, `writable`, `value` properties from the
 * provided data.
 * + Get privately stored data descriptor defined by the `set()` method of the instance.
 */
export class DataDescriptors<Value> {
  /**
   * Returns strictly defined data descriptor of a `DataDescriptor<Value>` interface on `writable` or `value` property detected.
   * Strictly means, parameter `descriptor` is type guarded and method picks `configurable`, `enumerable`, `writable`, `value`
   * properties from the provided `descriptor` object.
   * @param descriptor An `object` of a `DataDescriptor<Value>` interface, to set with the default values of the
   * `CommonDescriptor`.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with the `writable` or `value` property, by default it uses `dataCallback()` function from the static `guard()` method.
   * @returns The return value is an `object` of a `DataDescriptor<Value>` interface.
   */
  public static define<Value>(
    descriptor: DataDescriptor<Value>,
    callback: ResultCallback = callbacks['data']
  ): DataDescriptor<Value> | undefined {
    return callback(Obj.isObject(descriptor, 'configurable', 'enumerable', 'writable', 'value'), descriptor)
      ? {
        ...{
          configurable: true,
          enumerable: true,
        },
        ...Property.pick(descriptor, 'configurable', 'enumerable', 'writable', 'value')
      }
      : undefined;
  }

  /**
   * Guards the `descriptor` to be an `object` of a `DataDescriptor<Value>` interface.
   * @param descriptor Object of a `DataDescriptor<Value>` interface to guard.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the `descriptor`
   * is an `object` with the `writable` or `value` property, by default it uses `dataCallback()` function.
   * @throws Throws an error if the `descriptor` is not an `object` of a `DataDescriptor<Value>` interface, which means doesn't
   * contain `writable` or `value` property.
   * @returns The return value is a `boolean` indicating whether the `descriptor` is an `object` with the `writable` or `value` property.
   */
  public static guard<Value>(
    descriptor: DataDescriptor<Value>,
    callback: ResultCallback = callbacks['data']
  ): descriptor is DataDescriptor<Value> {
    let result = true;
    Object
      .keys(descriptor)
      .forEach(key => (result === true) && (result = key in {
        configurable: true, enumerable: true, writable: true, value: true
      }));
    return callback(result, descriptor);
  }

  /**
   * Get privately stored data descriptor of a `DataDescriptor<Value>` interface defined by the `set()` method.
   */
  public get get(): DataDescriptor<Value> {
    return this.#descriptor;
  }

  // Defaults to data descriptor.
  #descriptor: DataDescriptor<Value> = {
    configurable: true,
    enumerable: true,
    writable: true,
    value: undefined,
  };

  /**
   * Creates instance, and optionally set data descriptor of a `DataDescriptor<Value>` interface.
   * @param descriptor An optional `object` of a `DataDescriptor<Value>` interface to initially set.
   */
  constructor(
    descriptor?: DataDescriptor<Value>,
    callback?: ResultCallback
  ) {
    descriptor && this.set(descriptor, callback);
  }

  /**
   * Strictly sets with the last saved descriptor values, and stores privately data descriptor of a `DataDescriptor<Value>`
   * interface. Strictly means, parameter `descriptor` is type guarded and method picks `configurable`, `enumerable`, `writable`, `value`
   * properties from the provided `descriptor` object.
   * @param descriptor An `object` of a `DataDescriptor<Value>` interface, to set with the last saved descriptor.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with the `writable` or `value` property, by default it uses `dataCallback()` function from the static `guard()` method.
   * @throws Throws an error if the `descriptor` is not an `object` of a `DataDescriptor<Value>` interface, which means doesn't
   * contain `writable` or `value` property.
   * @returns The return value is a `DataDescriptors` instance.
   */
  public set(
    descriptor: DataDescriptor<Value>,
    callback?: ResultCallback
  ): this {
    this.#descriptor = {
      ...this.#descriptor,
      ...DataDescriptors.define(descriptor, callback),
    };
    return this;
  }
}
