// Type.
import { GetProperty } from '../type/get-property.type';
/**
 * Get property from the object.
 * @param object An `obj` type value to
 * @param key x
 * @returns x
 */
export const getProperty: GetProperty = <Obj extends object, Key extends keyof Obj>(object: Obj, key: Key): Obj[Key] => object[key];
