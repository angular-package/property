import { CommonDescriptor } from './common-descriptor.type';
/**
 * Descriptor with its unique optional `get` and `set` keys of a function type, with the specified `Value` type.
 */
export type AccessorDescriptor<Value, Obj = any> = CommonDescriptor & {
  get?: () => Value;
  set?: (value: Value) => void;
} & ThisType<Obj>;
