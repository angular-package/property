export interface DataDescriptor<Value>
  extends Pick<PropertyDescriptor, 'configurable' | 'enumerable'> {
  writable?: boolean;
  value?: Value;
}
