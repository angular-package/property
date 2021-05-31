// Function.
import { getObject } from './lib/get-object.function';
import { getProperty } from './lib/get-property.function';
// Interface.
import { Get } from './interface/get.interface';

export const get: Get = {
  object: getObject,
  property: getProperty
};
