// Interface.
import { DataDescriptor } from '../interface/data-descriptor.interface';
import { ThisAccessorDescriptor } from '../type/this-accessor-descriptor.type';
/**
 * Get accessor or data descriptor.
 */
export interface GetSelectedDescriptor<Value, Obj extends object> {
  accessor: ThisAccessorDescriptor<Value, Obj>;
  data: DataDescriptor<Value>;
}
