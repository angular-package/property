// Object.
import { is, guard, ResultCallback } from '@angular-package/type';
// Function.
import { callbackErrorMessage } from '../../lib/callback-error-message.function';
import { pickProperty } from '../../lib/pick-property.function';
// Interface.
import { DataDescriptor } from '../interface/data-descriptor.interface';
// Constant.
const errorCallback: ResultCallback = callbackErrorMessage(
  `Data descriptor must be an \`DataDescriptors<Value>\` type`
);
/**
 * Strictly define, set and store privately single property data descriptor of a `DataDescriptor<Value>` interface.
 * Features:
 * + The `value` property is of a generic `Value` type.
 * + Strictly define data descriptor.
 * + Strictly set and store at the same time single property data descriptor.
 * + `set()` and `define()` method picks `configurable`, `enumerable`, `writable`, `value` properties from the provided data.
 * + Get privately stored data descriptor defined by the `set()` method.
 */
export class DataDescriptors<Value> {
  // Defaults to data descriptor.
  #descriptor: DataDescriptor<Value> = {
    configurable: true,
    enumerable: true,
    writable: true,
    value: undefined,
  };

  /**
   * Get privately stored data descriptor defined by the `set()` method.
   */
  get get(): DataDescriptor<Value> {
    return this.#descriptor;
  }

  /**
   * Creates instance, and optionally set data descriptor of a `DataDescriptor<Value>` interface.
   * @param descriptor An optional `object` of a `DataDescriptor<Value>` interface to initially set.
   */
  constructor(descriptor?: DataDescriptor<Value>) {
    if (is.defined(descriptor)) {
      this.set(descriptor);
    }
  }

  /**
   * Returns strictly defined data descriptor of a `DataDescriptor<Value>` interface on `writable` or `value` property detected.
   * Strictly means, method picks `configurable`, `enumerable`, `writable`, `value` properties to define.
   * @param descriptor An object of a `DataDescriptor<Value>` interface to merge with the default descriptor.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with `writable` or `value` property.
   * @returns The return value is an `object` of a `DataDescriptor<Value>` interface.
   */
  static define<Value>(
    descriptor: DataDescriptor<Value>,
    callback: ResultCallback = errorCallback
  ): DataDescriptor<Value> {
    if (
      guard.is.objectKey(descriptor, 'writable', callback) ||
      guard.is.objectKey(descriptor, 'value', callback)
    ) {
      return pickProperty(
        {
          ...{
            configurable: true,
            enumerable: true,
          },
          ...descriptor,
        },
        ['configurable', 'enumerable', 'writable', 'value']
      );
    }
    return {};
  }

  /**
   * Strictly set with the default values, and store privately single data descriptor of a `DataDescriptor<Value>` interface.
   * Strictly means method `set()` picks `configurable`, `enumerable`, `writable`, `value` properties.
   * @param descriptor An object of a `DataDescriptor` with the `value` property of a `Value` type.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`.
   * @throws Throws an error if the descriptor is not an object of a `DataDescriptor<Value>` interface, which means doesn't
   * contain `writable` or `value` property.
   * @returns The return value is a `DataDescriptors` instance.
   */
  public set(
    descriptor: DataDescriptor<Value>,
    callback: ResultCallback = errorCallback
  ): this {
    this.#descriptor = {
      ...this.#descriptor,
      ...DataDescriptors.define(descriptor, callback),
    };
    return this;
  }
}
