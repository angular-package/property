import { AccessorDescriptor } from '../interface/accessor-descriptor.interface';
/**
 * `AccessorDescriptor` type with ease of use `this` of an `Obj` type in the `get()` and `set()` functions.
 */
export type ThisAccessorDescriptor<Value, Obj> = AccessorDescriptor<Value> & ThisType<Obj>;
