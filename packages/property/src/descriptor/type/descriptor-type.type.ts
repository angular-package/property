import { DescriptorAccessor } from '../lib/descriptor-accessor.class';
import { DescriptorValue } from '../lib/descriptor-value.class';
export type DescriptorType<ValueType> = DescriptorAccessor<ValueType> | DescriptorValue<ValueType>;
