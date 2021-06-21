// Class.
import { Descriptor } from '../lib/descriptor.class';
// Interface.
import { DataDescriptor } from './data-descriptor.interface';
// Type.
import { ResultCallback } from '@angular-package/type';
import { ThisAccessorDescriptor } from '../type/this-accessor-descriptor.type';
/**
 * Select accessor or data descriptor instance to set.
 */
export interface SetSelectedDescriptor<Value, Obj extends object> {
  accessor: (
    descriptor: ThisAccessorDescriptor<Value, Obj>,
    callback?: ResultCallback
  ) => Descriptor<Value, Obj>;
  data: (
    descriptor: DataDescriptor<Value>,
    callback?: ResultCallback
  ) => Descriptor<Value, Obj>;
}
