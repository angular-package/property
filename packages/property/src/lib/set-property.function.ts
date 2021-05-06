// `guard` object.
import { guard } from '@angular-package/type';
// Type.
import { SetProperty } from '../type/set-property.type';
/**
 * 
 * @param object An `object` of generic`Obj` type to set the `value` in the `key`.
 * @param key 
 * @param value 
 */
export const setProperty: SetProperty =
  <Obj extends object, Key extends keyof Obj>(object: Obj, key: Key, value: Obj[Key]): Obj[Key] | undefined => {
  if (guard.is.objectKey<Obj, Key>(object, key)) {
    Object.assign<Obj, { [index: string]: Obj[Key] }>(object, { [key]: value });
    return object[key];
  }
  return;
};
