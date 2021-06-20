// Type.
import { GetExistProperty } from '../type/get-exist-property.type';
import { GetObject } from './get-object.type';
import { GetProperties } from '../type/get-properties.type';
import { GetProperty } from '../type/get-property.type';
import { GetDescriptor } from '../descriptor/type/get-descriptor.type';
import { GetDescriptors } from '../descriptor/type/get-descriptors.type';
// Export interface.
export interface Get {
  descriptor: GetDescriptor;
  descriptors: GetDescriptors;
  existProperty: GetExistProperty;
  object: GetObject;
  properties: GetProperties;
  property: GetProperty;
}
