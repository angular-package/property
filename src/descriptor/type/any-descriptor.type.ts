import { AccessorDescriptor } from './accessor-descriptor.type';
import { DataDescriptor } from './data-descriptor.type';
/**
 * 
 */
export type AnyDescriptor<Value, Obj = any> = AccessorDescriptor<Value, Obj> | DataDescriptor<Value>;
