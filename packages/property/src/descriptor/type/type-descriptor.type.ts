import { ValueDescriptor } from '../interface/value-descriptor.interface';
import { AccessorDescriptor } from '../interface/accessor-descriptor.interface';
export type TypeDescriptor<ValueType> = AccessorDescriptor<ValueType> | ValueDescriptor<ValueType>;
