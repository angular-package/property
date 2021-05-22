// Object.
import { is } from '@angular-package/type';
// Type.
import { PickProperty } from '../type/pick-property.type';
/**
 * Pick specified properties from an object.
 * @param obj A generic `Obj` type `value` to pick the `keys` from.
 * @param keys An `Array` of a key of `Obj` type values to pick from the `obj`.
 * @returns An object with specified properties.
 */
export const pickProperty: PickProperty = <Obj extends object>(obj: Obj, keys: (keyof Obj)[]): {[P in keyof Obj]: Obj[P]} =>
  Object.assign({}, ...keys.map(key => !is.undefined(obj[key]) ? { [key]: obj[key] } : undefined ));
