// Object.
import { is } from '@angular-package/type';
// Type.
import { GetProperties } from '../type/get-properties.type';
/**
 * Gets specified properties from the `object`.
 * @param object An `object` of a generic `Obj` type, by default of the type captured from the provided `object`, to get the `keys` from.
 * The value is not checked against the proper `object` type.
 * @param keys An array of a `keyof` type property names from the `object`, by default of type captured from the provided `keys` in the
 * array as the name of the properties that the `object` contains.
 * @returns The return value is an object with specified properties.
 */
export const getProperties: GetProperties = <
  Obj extends object,
  Keys extends keyof Obj
>(
  object: Obj,
  keys: Keys[]
): Pick<{ [P in keyof Obj]: Obj[P] }, Keys> =>
  Object.assign(
    {},
    ...keys.map((key) =>
      !is.undefined(object[key]) ? { [key]: object[key] } : undefined
    )
  );
