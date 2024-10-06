import { DataDescriptor } from '../interface/data-descriptor.interface';
import { ThisAccessorDescriptor } from './this-accessor-descriptor.type';
// Accessor or data descriptor.
export type AnyDescriptor<Value, Obj extends object = object> = ThisAccessorDescriptor<Value, Obj> | DataDescriptor<Value>;
