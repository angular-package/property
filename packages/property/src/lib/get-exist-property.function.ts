// @angular-package/type
import { guard, ResultCallback } from '@angular-package/type';
// Type.
import { GetProperty } from '../type/get-property.type';
/**
 *
 * @param object
 * @param key
 * @param callback
 * @returns
 */
export const getExistProperty: GetProperty =
  <Obj extends object, Key extends keyof Obj>(object: Obj, key: Key, callback?: ResultCallback): Obj[Key] | undefined => {
    if (guard.is.objectKey(object, key, callback)) {
      return object[key];
    }
    return;
  };
