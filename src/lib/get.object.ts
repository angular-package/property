// Function.
import { getExistProperty } from './get-exist-property.function';
import { getProperties } from './get-properties.function';
import { getProperty } from './get-property.function';
// Type.
import { Get } from '../type/get.type';
// Object.
export const get: Get = {
  existProperty: getExistProperty,
  properties: getProperties,
  property: getProperty
};
