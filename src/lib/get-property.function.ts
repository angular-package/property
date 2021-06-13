// Type.
import { GetProperty } from '../type/get-property.type';
/**
 * Returns the value of the specified property from the `object`.
 * @param object An `object` of a generic `Obj` type to get property value from.
 * @param key A `keyof Obj` type value, as the name of the property that an `object` contains.
 * @returns The return value is an undefined or a property value from the `object`.
 */
export const getProperty: GetProperty = <
  Obj extends object,
  Key extends keyof Obj
>(
  object: Obj,
  key: Key
): Obj[Key] => object[key];
