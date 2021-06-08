import { CommonDescriptor } from './common-descriptor.interface';
/**
 * Descriptor with its unique optional `get()` and `set()` functions, of the `Value` type.
 * For the accessor descriptor with also the object type, please use the type `ThisAccessorDescriptor<Value, Obj>`.
 */
export interface AccessorDescriptor<Value> extends CommonDescriptor {
  get?: () => Value;
  set?: (value: Value) => void;
}
