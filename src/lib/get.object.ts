// Function.
import { getDescriptor } from '../descriptor/lib/get-descriptor.function';
import { getDescriptors } from '../descriptor/lib/get-descriptors.function';
import { getExistProperty } from './get-exist-property.function';
import { getObject } from '../object/src/get-object.function';
import { getProperties } from './get-properties.function';
import { getProperty } from './get-property.function';
// Type.
import { Get } from '../type/get.type';
// Export object.
/**
 * Get object with all the get functions.
 */
export const get: Get = {
  descriptor: getDescriptor,
  descriptors: getDescriptors,
  existProperty: getExistProperty,
  object: getObject,
  properties: getProperties,
  property: getProperty
};
