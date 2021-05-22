// `is`, `guard` objects.
import { guard, is, ResultCallback } from '@angular-package/type';
// Function.
import { pickProperty } from '../../lib/pick-property.function';
// Constant.
import { ACCESSOR_DESCRIPTOR } from './accessor-descriptor.const';
// Interface.
import { AccessorThisDescriptor } from '../type/accessor-this-descriptor.type';
/**
 * Class to strictly define and store privately single accessor descriptor.
 */
export class AccessorDescriptors<Value, Obj = any> {
  // Accessor descriptor properties.
  #pick: (keyof AccessorThisDescriptor<Value, Obj>)[] = ['configurable', 'enumerable', 'get', 'set'];
  // Single private accessor descriptor.
  #descriptor: AccessorThisDescriptor<Value, Obj> = ACCESSOR_DESCRIPTOR;

  /**
   * Get privately stored accessor descriptor defined by `set()` method.
   */
  get get(): AccessorThisDescriptor<Value, Obj> {
    return this.#descriptor;
  }

  /**
   * Creates `AccessorDescriptors<Value, Obj = any>` instance and an optionally set accessor descriptor.
   * @param descriptor An optional `AccessorDescriptor<Value>` type value to initially set.
   */
  constructor(descriptor?: AccessorThisDescriptor<Value, Obj>) {
    if (is.object<AccessorThisDescriptor<Value, Obj>>(descriptor)) {
      this.set(descriptor);
    }
  }

  /**
   * Callback function for the `set()` method to check the inputted descriptor.
   * @param result A `boolean` type `result` of the check.
   * @param value Any type `value` from the check.
   * @returns A `boolean` indicating whether or not the descriptor is an `AccessorThisDescriptor` type.
   */
  public callback: ResultCallback = (result: boolean, value: any): boolean => {
    if (result === false) {
       throw new Error(`Accessor descriptor must be an \`AccessorThisDescriptor<Value, Obj>\` type, got value ${value}`);
    }
    return result;
  }

  /**
   * Strictly set with default values and store privately single accessor descriptor that contains `get` and `set` properties.
   * Strictly means method `set()` picks only accessor descriptor `configurable`, `enumerable`, `get`, `set` properties.
   * @param descriptor A `AccessorDescriptor` type value.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`.
   * @callback `this.callback()`
   * @throws Throws an error if the descriptor is not an `AccessorThisDescriptor<Value, Obj>` type.
   * @returns A `this` instance.
   */
  public set(descriptor: AccessorThisDescriptor<Value, Obj>, callback: ResultCallback = this.callback): this {
    if (guard.is.objectKey(descriptor, 'get', callback)) {
        this.#descriptor = {
          ...this.#descriptor,
          ...pickProperty(descriptor, this.#pick),
        };
    }
    return this;
  }
}
