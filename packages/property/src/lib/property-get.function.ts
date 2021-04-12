import { guard } from '@angular-package/type';
import { PropertyGet } from '../type/property-get.type';

export const propertyGet: PropertyGet = <Obj, Key extends keyof Obj>(object: Obj, key: Key): Obj[Key] | undefined => {
  if (guard.is.objectKey<Obj, Key>(object, key)) {
    return object[key];
  }
  return;
};
