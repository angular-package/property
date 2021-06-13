// Object.
import { is } from '@angular-package/type';
// Type.
import { PickProperty } from '../type/pick-property.type';
/**
 * Picks specified properties from the `object`.
 * @param object An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to pick the `keys` from.
 * The value is not checked against the proper `object` type.
 * @param keys An array of a `keyof` type property names from the `object`, by default of type captured from the provided `keys` in the
 * array as the name of the properties that the `object` contains.
 * @returns The return value is an object with specified properties.
 */
export const pickProperty: PickProperty = <Obj extends object>(
  object: Obj,
  keys: (keyof Obj)[]
): { [P in keyof Obj]: Obj[P] } =>
  Object.assign(
    {},
    ...keys.map((key) =>
      !is.undefined(object[key]) ? { [key]: object[key] } : undefined
    )
  );
