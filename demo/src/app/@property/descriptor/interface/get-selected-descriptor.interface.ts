// Interface.
import { DataDescriptor } from './data-descriptor.interface';
import { ThisAccessorDescriptor } from '../type/this-accessor-descriptor.type';
import { ObjectPropertyDescriptors } from '../type/object-property-descriptors.type';
/**
 * Get stored accessor or data descriptor, or from the object, or from the specified object property.
 */
export interface GetSelectedDescriptor<Value, Obj extends object> {
  accessor: ThisAccessorDescriptor<Value, Obj>;
  data: DataDescriptor<Value>;
  from: {
    object: (object: Obj) => ObjectPropertyDescriptors<Obj> | undefined;
    property: <O extends Obj, Key extends keyof Obj>(
      object: O,
      key: Key
    ) => PropertyDescriptor | undefined;
  };
}
