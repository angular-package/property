// Type.
import { GetExistProperty } from '../type/get-exist-property.type';
import { GetObject } from './get-object.type';
import { GetProperties } from '../type/get-properties.type';
import { GetProperty } from '../type/get-property.type';
// Export interface.
export interface Get {
  existProperty: GetExistProperty;
  object: GetObject;
  properties: GetProperties;
  property: GetProperty;
}
