import { CommonDescriptor } from './common-descriptor.interface';
export interface ValueDescriptor<Type> extends CommonDescriptor {
  writable?: boolean;
  value?: Type;
}
