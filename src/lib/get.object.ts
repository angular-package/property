// Function.
import { getExistProperty } from './get-exist-property.function';
import { getObject } from '../object/src/get-object.function';
import { getProperties } from './get-properties.function';
import { getProperty } from './get-property.function';
// Type.
import { Get } from '../type/get.type';
// Export object.
export const get: Get = {
  existProperty: getExistProperty,
  object: getObject,
  properties: getProperties,
  property: getProperty
};
