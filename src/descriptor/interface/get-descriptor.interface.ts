// Class.
import { OwnDescriptor } from '../lib/get-own-descriptor.class';
// Type.
import { AccessorDescriptor } from '../interface/accessor-descriptor.interface';
import { DataDescriptor } from '../interface/data-descriptor.interface';
/**
 * Get accessor or data descriptor, or `own` as `GetOwnDescriptor` class to get descriptor.
 */
export interface GetDescriptor<Value, Obj extends object> {
  accessor: AccessorDescriptor<Value>;
  data: DataDescriptor<Value>;
  own: OwnDescriptor<Obj>;
}
