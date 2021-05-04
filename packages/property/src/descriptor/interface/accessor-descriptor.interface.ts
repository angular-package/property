import { CommonDescriptor } from './common-descriptor.interface';
export interface AccessorDescriptor<ValueType> extends CommonDescriptor {
  get: () => ValueType;
  set: (value: ValueType) => void;
}
