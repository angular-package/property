import { CommonDescriptor } from './common-descriptor.interface';
export interface DataDescriptor<Value> extends CommonDescriptor {
  writable: boolean;
  value: Value;
}
