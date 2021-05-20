import { CommonDescriptor } from './common-descriptor.interface';
/**
 * Accessor descriptor with `get` and `set` keys.
 */
export interface AccessorDescriptor<Value> extends CommonDescriptor {
  get: (() => Value) | undefined;
  set: ((value: Value) => void) | undefined;
}
