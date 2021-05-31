// Class.
import { GetOwnDescriptor } from '../lib/get-own-descriptor.class';
// Interface.
import { AccessorDescriptor } from './accessor-descriptor.interface';
import { DataDescriptor } from './data-descriptor.interface';
/**
 * Pick `accessor`, `data` descriptor or 'get own' class to get descriptor in `own`.
 */
export interface PickDescriptor<Value, Obj extends object> {
  accessor: AccessorDescriptor<Value> & ThisType<Obj>;
  data: DataDescriptor<Value>;
  own: GetOwnDescriptor<Obj>;
}
