import { AccessorThisDescriptor } from './accessor-this-descriptor.type';
import { DataDescriptor } from '../interface/data-descriptor.interface';
export type AnyDescriptor<Value, Obj = any> = AccessorThisDescriptor<Value, Obj> | DataDescriptor<Value>;
