import { Injectable } from '@angular/core';
import { is, Types } from '@angular-package/type';
// Internal.
import { ValueDescriptor } from '../interface/value-descriptor.interface';
import { VALUE_DESCRIPTOR } from './value-descriptor.const';

@Injectable()
export class DescriptorValue<ValueType = any> {
  // Value descriptor.
  private descriptor$$: ValueDescriptor<ValueType> = VALUE_DESCRIPTOR;

  /**
   * Get value descriptor.
   */
  get get(): ValueDescriptor<ValueType> {
    return this.descriptor$$ as ValueDescriptor<ValueType>;
  }

  /**
   * Creates instance.
   * @param descriptor Value descriptor.
   * @param type One of the types to check descriptor value.
   */
  constructor(descriptor: ValueDescriptor<ValueType>, type?: Types<ValueType>) {
    this.set(descriptor, type);
  }

  /**
   * Set value descriptor that means without accessors `get` `set` and `writable`.
   * @param descriptor Value descriptor.
   * @param type One of the types to check descriptor value.
   * @returns this.
   */
  public set(descriptor: ValueDescriptor<ValueType>, type?: Types<ValueType>): this {
    if (is.object<ValueDescriptor<ValueType>>(descriptor)) {
      if (is.defined(type)) {
        if (is.type<ValueType>(descriptor.value, type)) {
          this.descriptor$$ = { ...this.descriptor$$, ...descriptor };
        }
      } else {
        this.descriptor$$ = { ...this.descriptor$$, ...descriptor };
      }
    }
    return this;
  }
}
