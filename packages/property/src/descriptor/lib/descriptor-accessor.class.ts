import { Injectable } from '@angular/core';
import { guard } from '@angular-package/type';
// Internal.
import { ACCESSOR_DESCRIPTOR } from './accessor-descriptor.const';
import { AccessorDescriptor } from '../interface/accessor-descriptor.interface';

@Injectable()
export class DescriptorAccessor<ValueType = any> {
  // Accessor descriptor.
  private descriptor$$: AccessorDescriptor<ValueType> = ACCESSOR_DESCRIPTOR;

  /**
   * Get accessor descriptor.
   */
  get get(): AccessorDescriptor<ValueType> {
    return this.descriptor$$;
  }

  /**
   * Creates instance.
   * @param descriptor Accessor descriptor.
   */
  constructor(descriptor?: AccessorDescriptor<ValueType>) {
    this.set(descriptor);
  }

  /**
   * Set accessor descriptor without value and writable.
   * @param descriptor Accessor descriptor with `get` and `set.
   * @returns this.
   */
  public set(descriptor: AccessorDescriptor<ValueType>): this {
    if (guard.is.object<AccessorDescriptor<ValueType>>(descriptor)) {
      this.descriptor$$ = { ...this.descriptor$$, ...descriptor };
    }
    return this;
  }
}
