// Type.
import { SetProperty } from '../type/set-property.type';
/**
 * Sets the value of indicated property by its name in the `object`.
 * @param object An `object` of a generic `Obj` type, by default of the type captured from the provided `object`,
 * to set the value with the indicated `key` as its property name. The value is not checked against the proper `object` type.
 * @param key A `keyof` type property name from the `object`, by default of type captured from the provided `key` as the name
 * of the property that the `object` contains
 * @param value The `value` of the type captured from the provided `key` in the provided `object`.
 * The `value` is not checked against the proper type.
 * @returns The return value is from the property of the specified object.
 */
export const setProperty: SetProperty = <
  Obj extends object,
  Key extends keyof Obj
>(
  object: Obj,
  key: Key,
  value: Obj[Key]
): Obj[Key] => (object[key] = value);
