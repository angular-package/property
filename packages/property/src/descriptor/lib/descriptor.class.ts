// @angular-package
import { Func, is, guard, ResultCallback, Key } from '@angular-package/type';
// Class.
import { AccessorDescriptors } from './accessor-descriptors.class';
import { DataDescriptors } from './data-descriptors.class';
import { GetOwnDescriptor } from './get-own-descriptor.class';
// Interface.
import { DataDescriptor } from '../interface/data-descriptor.interface';
import { PickDescriptor } from '../interface/pick-descriptor.interface';
// Type.
import { AccessorThisDescriptor } from '../type/accessor-this-descriptor.type';
import { AnyDescriptor } from '../type/any-descriptor.type';
/**
 * Methods to handle property descriptor or get it from the object.
 */
export class Descriptor<Value extends any, Obj extends object> {
  // Private accessor descriptor instance.
  #accessor: AccessorDescriptors<Value> = new AccessorDescriptors<Value, Obj>();
  // Private data descriptor instance.
  #data: DataDescriptors<Value> = new DataDescriptors<Value>();
  // Private get own descriptor instance.
  #getOwn: GetOwnDescriptor<Obj> = new GetOwnDescriptor();
  // Get accessor, data descriptor or 'get own' descriptor instance.
  get get(): PickDescriptor<Value, Obj> {
    return {
      accessor: this.#accessor.get,
      data: this.#data.get,
      own: this.#getOwn
    };
  }

  /**
   * Creates `Descriptor<Value extends any, Obj extends object>` instance and an optionally set accessor descriptor.
   * @param descriptor An optional `AnyDescriptor<Value, Obj>` type value to initially set.
   */
  constructor(descriptor?: AnyDescriptor<Value, Obj>) {
    if (is.object(descriptor)) {
      this.set(descriptor);
    }
  }

  /**
   * Set accessor descriptor.
   * @param descriptor A `AccessorThisDescriptor<Value, Obj>` type value.
   * @returns A `Descriptor` instance.
   */
   public accessor(descriptor: AccessorThisDescriptor<Value, Obj>): this {
    this.#accessor.set(descriptor);
    return this;
  }

  /**
   * Set data descriptor.
   * @param descriptor A `DataDescriptor` type value.
   * @returns A `Descriptor` instance.
   */
   public data(descriptor: DataDescriptor<Value>): this {
    this.#data.set(descriptor);
    return this;
  }

  /**
   * Set accessor or data descriptor depends on detected properties.
   * @param descriptor A `AnyDescriptor` type value.
   * @param callback
   * @returns A `Descriptor` instance.
   */
  public set(descriptor: AnyDescriptor<Value, Obj>, callback?: ResultCallback): this {
    // TODO: check the value type
    if (is.objectKeys<AccessorThisDescriptor<Value, Obj>>(descriptor, 'get', 'set')) {
      this.#accessor.set(descriptor, callback);
    } else if (is.objectKeys<DataDescriptor<Value>>(descriptor, 'writable', 'value')) {
      this.#data.set(descriptor, callback);
    }
    return this;
  }
}
