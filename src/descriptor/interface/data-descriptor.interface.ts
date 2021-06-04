import { CommonDescriptor } from './common-descriptor.interface';
/**
 * Descriptor with its unique optional keys, `writable` of a `boolean` type and `value` of a generic `Value` type.
 */
export type DataDescriptor<Value> = CommonDescriptor & {
  writable?: boolean;
  value?: Value;
};
