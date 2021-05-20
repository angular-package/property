// Object.
import { is, guard, ResultCallback } from '@angular-package/type';
// Function.
import { pickProperty } from '../../lib/pick-property.function';
// Constant.
import { DATA_DESCRIPTOR } from './data-descriptor.const';
// Interface.
import { DataDescriptor } from '../interface/data-descriptor.interface';

export class DataDescriptors<Value> {
  // Which properties to pick.
  #pick: (keyof DataDescriptor<Value>)[] = ['configurable', 'enumerable', 'writable', 'value'];
  // Data descriptor.
  #descriptor: DataDescriptor<Value> = DATA_DESCRIPTOR;

  /**
   * Get the data descriptor.
   */
  get get(): DataDescriptor<Value> {
    return this.#descriptor;
  }

  /**
   * Creates instance.
   * @param descriptor A `DataDescriptor` type value.
   */
  constructor(descriptor?: DataDescriptor<Value>) {
    if (is.object<DataDescriptor<Value>>(descriptor)) {
      this.set(descriptor);
    }
  }

  /**
   * Set the data descriptor that contains `writable` and `value` properties.
   * @param descriptor A `DataDescriptor` type value.
   * @returns this.
   */
  public set(descriptor: DataDescriptor<Value>, callback?: ResultCallback): this {
    if (guard.is.object(descriptor, callback)) {
      this.#descriptor = {
        ...this.#descriptor,
        ...pickProperty(descriptor, this.#pick),
      };
    }
    return this;
  }
}
