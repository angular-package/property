import { CommonDescriptor } from './common-descriptor.interface';
export interface ValueDescriptor<ValueType> extends CommonDescriptor {
  writable: boolean;
  value: ValueType;
}
