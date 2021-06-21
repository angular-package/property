import { GetDescriptor } from '../type/get-descriptor.type';
/**
 * Wrapper function for the `Object` static method `getOwnPropertyDescriptor`.
 * Returns descriptor of the specified property from the specified object.
 * @param object An `object` of a generic `Obj` type, by default of the type captured from the provided `object`,
 * to get the property descriptor from it. The value is not being checked against the proper `object` type.
 * "Object that contains the property."
 * @param key A `keyof` type property name from the `object`, by default of type captured from the provided `key` as the name
 * of the property that the `object` contains. The value is not being checked against its existence in the `object`.
 * "Name of the property."
 * @returns The return value is a property descriptor of the specified object.
 */
export const getDescriptor: GetDescriptor = <Obj extends object, Key extends keyof Obj>(
  object: Obj,
  key: Key
): PropertyDescriptor | undefined =>
  Object.getOwnPropertyDescriptor(object, key);
