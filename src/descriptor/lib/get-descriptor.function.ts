import { GetDescriptor } from '../type/get-descriptor.type';
/**
 * Wrapper function for the `Object` static method `getOwnPropertyDescriptor`.
 * @param object "Object that contains the property."
 * @param key "Name of the property."
 * @returns The return value is a property descriptor of the specified object.
 */
export const getDescriptor: GetDescriptor = <Obj, Key extends keyof Obj>(
  object: Obj,
  key: Key
): PropertyDescriptor | undefined =>
  Object.getOwnPropertyDescriptor(object, key);
