import { GetDescriptors } from '../type/get-descriptors.type';
import { ObjectPropertyDescriptors } from '../type/object-property-descriptors.type';
/**
 * Wrapper function for the `Object` static method `getOwnPropertyDescriptors`.
 * "Returns an object containing all own property descriptors of an object".
 * @param object An `object` of a generic `Obj` type, by default of the type captured from the provided `object`,
 * to get all property descriptors from it. The value is being checked against the proper `object` type.
 * "Object that contains the properties and methods.
 * This can be an object that you created or an existing Document Object Model (DOM) object."
 * @param keys Specify which property descriptors should be returned.
 * @returns The return value is an object containing all own property descriptors of an object.
 */
export const getDescriptors: GetDescriptors = <Obj extends object, Keys extends keyof Obj>(
  object: Obj,
  keys?: Keys[]
): ObjectPropertyDescriptors<Obj> | undefined =>
  Object.getOwnPropertyDescriptors(object);
