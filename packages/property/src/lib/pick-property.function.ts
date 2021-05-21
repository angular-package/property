import { PickProperty } from '../type/pick-property.type';
import { is } from '@angular-package/type';
/**
 * Pick properties from an object with specified keys.
 * @param obj Any type `obj` value to pick property from.
 * @param keys An `Array` of string values to pick from `obj`.
 */
export const pickProperty: PickProperty = <Obj extends object>(obj: Obj, keys: (keyof Obj)[]): {[P in keyof Obj]: Obj[P]} => {
  return Object.assign({}, ...keys.map(key => {
    if (!is.undefined(obj[key])) {
      return {
        [key]: obj[key]
      };
    }
    return;
  }));
};
