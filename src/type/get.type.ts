import { GetExistProperty } from '../type/get-exist-property.type';
import { GetProperties } from '../type/get-properties.type';
import { GetProperty } from '../type/get-property.type';

export interface Get {
  existProperty: GetExistProperty;
  properties: GetProperties;
  property: GetProperty;
}
