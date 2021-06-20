// @angular-package/type
import { guard, ResultCallback } from '@angular-package/type';
// Type.
import { GetObject } from '../../type/get-object.type';
/**
 *
 * @param object
 * @param callback
 * @returns
 */
export const getObject: GetObject = <Obj extends object>(
  object: Obj,
  callback?: ResultCallback
): Obj => (guard.is.object(object, callback) ? object : object);
