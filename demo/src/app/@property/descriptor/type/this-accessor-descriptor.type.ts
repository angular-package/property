import { AccessorDescriptor } from '../interface/accessor-descriptor.interface';
/**
 * `AccessorDescriptor` interface as a type cause of ease of use `this` of an `Obj` type in the `get()` and `set()` methods.
 */
export type ThisAccessorDescriptor<Value, Obj extends object> = AccessorDescriptor<Value> & ThisType<Obj>;
