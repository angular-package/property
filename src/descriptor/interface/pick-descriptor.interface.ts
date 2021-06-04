// Class.
import { GetOwnDescriptor } from '../lib/get-own-descriptor.class';
// Interface.
import { AccessorDescriptor } from '../type/accessor-descriptor.type';
import { DataDescriptor } from '../type/data-descriptor.type';
/**
 * Pick `accessor`, `data` descriptor or 'get own' class to get descriptor in `own`.
 */
export interface PickDescriptor<Value, Obj extends object> {
  accessor: AccessorDescriptor<Value>;
  data: DataDescriptor<Value>;
  own: GetOwnDescriptor<Obj>;
}
