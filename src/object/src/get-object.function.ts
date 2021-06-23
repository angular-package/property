// @angular-package/type
import { guard, ResultCallback } from '@angular-package/type';
// Object.
import { callbacks } from '../../callback/src/callbacks.object';
// Type.
import { GetObject } from '../../type/get-object.type';
/**
 * Guards getting the specified `object` of a generic `Obj`.
 * @param object An `object` of a generic `Obj` type, by default of the type captured from the provided `object`.
 * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `object` is an `object`,
 * by default it uses `getObject()` function from the static `callbacks` object.
 * @throws By default, throws an `TypeError` if provided object is not an `object`.
 * @returns The return value is an `object`.
 */
export const getObject: GetObject = <Obj extends object>(
  object: Obj,
  callback: ResultCallback = callbacks.getObject
): Obj => (guard.is.object(object, callback) ? object : object);
