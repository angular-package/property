// Object.
import { guard } from '@angular-package/type';
// Type.
import { GetProperty } from '../type/get-property.type';

export const getProperty: GetProperty = <Obj extends object, Key extends keyof Obj>(object: Obj, key: Key): Obj[Key] | undefined => {
  if (guard.is.objectKey<Obj, Key>(object, key)) {
    return object[key];
  }
  return;
};
