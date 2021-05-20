// `is`, `guard` objects.
import { guard, is } from '@angular-package/type';
// Function.
import { pickProperty } from '../../lib/pick-property.function';
// Constant.
import { ACCESSOR_DESCRIPTOR } from './accessor-descriptor.const';
// Interface.
import { AccessorThisDescriptor } from '../type/accessor-this-descriptor.type';

export class AccessorDescriptors<Value, Obj = any> {
  // Which properties to pick.
  #pick: (keyof AccessorThisDescriptor<Value, Obj>)[] = ['configurable', 'enumerable', 'get', 'set'];
  // Private accessor descriptor.
  #descriptor: AccessorThisDescriptor<Value, Obj> = ACCESSOR_DESCRIPTOR;

  /**
   * Get accessor descriptor.
   */
  get get(): AccessorThisDescriptor<Value, Obj> {
    return this.#descriptor;
  }

  /**
   * Creates instance.
   * @param descriptor A `AccessorDescriptor` type value to define descriptor.
   */
  constructor(descriptor?: AccessorThisDescriptor<Value, Obj>) {
    if (is.object<AccessorThisDescriptor<Value, Obj>>(descriptor)) {
      this.set(descriptor);
    }
  }

  /**
   * Set accessor descriptor that contains `get` and `set` properties.
   * @param descriptor A `AccessorDescriptor` type value.
   * @returns this.
   */
  public set(descriptor: AccessorThisDescriptor<Value, Obj>): this {
    if (guard.is.object(descriptor)) {
        this.#descriptor = {
          ...this.#descriptor,
          ...pickProperty(descriptor, this.#pick),
        };
    }
    return this;
  }
}
