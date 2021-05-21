import { AccessorDescriptor } from '../interface/accessor-descriptor.interface';
/**
 * Accessor descriptor structure with the `Value`, `Obj` type extended with `ThisType<Obj>` object to use `this` properly its unique
 * attributes.
 */
export type AccessorThisDescriptor<Value, Obj = any> = AccessorDescriptor<Value> & ThisType<Obj>;
