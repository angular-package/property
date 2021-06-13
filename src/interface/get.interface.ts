import { GetObject } from '../type/get-object.type';
import { GetProperty } from '../type/get-property.type';

export interface Get {
  object: GetObject;
  property: GetProperty;
}
