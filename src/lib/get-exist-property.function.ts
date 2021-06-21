// @angular-package/type
import { guard, ResultCallback } from '@angular-package/type';
// Function.
import { getProperty } from './get-property.function';
// Type.
import { GetExistProperty } from '../type/get-exist-property.type';
// Callback.
import { callbacks } from '../callback/src/callback.object';
/**
 * Returns the value of the existing specified property from the specified `object`.
 * @param object An `object` of a generic `Obj` type, by default of the type captured from the provided `object`,
 * to get the existing property value from it. The value is being checked against the proper `object` type.
 * @param key A `keyof` type property name from the existing `object`, by default of type captured from the provided `key`
 * as the name of the property that the `object` contains. The value is being checked against its existence in the `object`.
 * @throws By default throws an `Error` if the specified object does not exist or object exists but its key doesn't.
 * @returns The return value is a property value from the `object`.
 */
export const getExistProperty: GetExistProperty = <
  Obj extends object,
  Key extends keyof Obj
>(
  object: Obj,
  key: Key,
  callback: ResultCallback = callbacks.getExistProperty
): Obj[Key] =>
  guard.is.objectKey(object, key, callback)
    ? getProperty(object, key)
    : getProperty(object, key);
