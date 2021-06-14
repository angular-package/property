// @angular-package/type
import { guard, ResultCallback } from '@angular-package/type';
// Type.
import { GetProperty } from '../type/get-property.type';
import { getProperty } from './get-property.function';
/**
 * Returns the value of the existing specified property from the `object`.
 * @param object An `object` of a generic `Obj` type, by default of the type captured from the provided `object`,
 * to get the existing property value from. The value is being checked against the proper `object` type
 * @param key A `keyof` type property name from the existing `object`, by default of type captured from the provided `key`
 * as the name of the property that the `object` contains. The value is being checked against existence the property in the `object`.
 * @returns The return value is a property value from the `object`.
 */
export const getExistProperty: GetProperty = <
  Obj extends object,
  Key extends keyof Obj
>(
  object: Obj,
  key: Key,
  callback?: ResultCallback
): Obj[Key] =>
  guard.is.objectKey(object, key, callback)
    ? getProperty(object, key)
    : getProperty(object, key);
