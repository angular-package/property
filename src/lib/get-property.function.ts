// Type.
import { GetProperty } from '../type/get-property.type';
/**
 * Returns the value of the specified property from the `object`.
 * @param object An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to get property value
 * from.
 * @param key A `keyof` type property name from the `object`, by default of type captured from the provided `key` as the name of the
 * property that the `object` contains.
 * @returns The return value is an undefined or a property value from the `object`.
 */
export const getProperty: GetProperty = <
  Obj extends object,
  Key extends keyof Obj
>(
  object: Obj,
  key: Key
): Obj[Key] => object[key];
