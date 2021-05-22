// Object.
import { is, guard, ResultCallback } from '@angular-package/type';
// Function.
import { pickProperty } from '../../lib/pick-property.function';
// Constant.
import { DATA_DESCRIPTOR } from './data-descriptor.const';
// Interface.
import { DataDescriptor } from '../interface/data-descriptor.interface';
/**
 * Strictly set and store privately single data descriptor.
 */
export class DataDescriptors<Value> {
  // Data descriptor properties of `Value` type.
  #pick: (keyof DataDescriptor<Value>)[] = ['configurable', 'enumerable', 'writable', 'value'];
  // Single private data descriptor.
  #descriptor: DataDescriptor<Value> = DATA_DESCRIPTOR;

  /**
   * Get privately stored accessor descriptor defined by `set()` method.
   */
  get get(): DataDescriptor<Value> {
    return this.#descriptor;
  }

  /**
   * Creates `DataDescriptors<Value>` instance and an optionally set data descriptor.
   * @param descriptor A `DataDescriptor` type value.
   */
  constructor(descriptor?: DataDescriptor<Value>) {
    if (is.objectKey<DataDescriptor<Value>>(descriptor, 'value')) {
      this.set(descriptor);
    }
  }

  /**
   * Callback function for the `set()` method to check the inputted descriptor.
   * @param result A `boolean` type `result` of the check.
   * @param value Any type `value` from the check.
   * @returns A `boolean` indicating whether or not the descriptor is an `DataDescriptors<Value>` type.
   */
   public callback: ResultCallback = (result: boolean, value: any): boolean => {
    if (result === false) {
       throw new Error(`Accessor descriptor must be an \`DataDescriptors<Value>\` type, got value ${value}`);
    }
    return result;
  }

  /**
   * Strictly set with default values and store privately single data descriptor that contains `writable` and `value` properties.
   * Strictly means method `set()` picks only data descriptor `configurable`, `enumerable`, `writable`, `value` properties.
   * @param descriptor A `DataDescriptor` type value.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`.
   * @callback `this.callback()`
   * @throws Throws an error if the descriptor is not an `DataDescriptors<Value>` type.
   * @returns this.
   */
  public set(descriptor: DataDescriptor<Value>, callback: ResultCallback = this.callback): this {
    if (guard.is.objectKey(descriptor, 'value', callback)) {
      this.#descriptor = {
        ...this.#descriptor,
        ...pickProperty(descriptor, this.#pick),
      };
    }
    return this;
  }
}
