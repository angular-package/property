import { CommonDescriptor } from './common-descriptor.interface';
/**
 * Descriptor with its unique optional `get` and `set` keys of a function type, with the specified `Value` type.
 */
export interface AccessorDescriptor<Value> extends CommonDescriptor {
  get?: () => Value;
  set?: (value: Value) => void;
}
