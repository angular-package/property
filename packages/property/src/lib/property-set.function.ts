import { guard } from '@angular-package/type';
import { PropertySet } from '../type/property-set.type';

export const propertySet: PropertySet = <Obj, Key extends keyof Obj>(object: Obj, key: Key, value: Obj[Key]): Obj[Key] | undefined => {
  if (guard.is.objectKey<Obj, Key>(object, key)) {
    Object.assign<Obj, { [index: string]: Obj[Key] }>(object, { [key]: value });
    return object[key];
  }
  return;
};
