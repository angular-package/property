// @angular-package/type
import { guard, ResultCallback } from '@angular-package/type';
// Type.
import { GetProperty } from '../type/get-property.type';

/**
 * Get property from the object.
 * @param object An `obj` type value to
 * @param key x
 * @returns x
 */
export const getProperty: GetProperty = <Obj extends object, Key extends keyof Obj>(object: Obj, key: Key): Obj[Key] => object[key];

/**
 *
 * @param object
 * @param key
 * @param callback
 * @returns
 */
export default
  (<Obj extends object, Key extends keyof Obj>(object: Obj, key: Key, callback?: ResultCallback): Obj[Key] | undefined => {
    if (guard.is.objectKey(object, key, callback)) {
      return object[key];
    }
    return;
  }) as GetProperty;
