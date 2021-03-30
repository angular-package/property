import { AccessorDescriptor } from './accessor-descriptor.interface';
import { ValueDescriptor } from './value-descriptor.interface';
export interface UnifiedDescriptor<ValueType> extends AccessorDescriptor<ValueType>, ValueDescriptor<ValueType> {}
