import { GetDescriptors } from '../type/get-descriptors.type';
import { ObjectPropertyDescriptors } from '../type/object-property-descriptors.type';
/**
 * 
 * @param object 
 * @param key 
 * @returns 
 */
export const getDescriptors: GetDescriptors = <Obj>(
  object: Obj,
  key?: (keyof Obj | keyof Obj[])
): ObjectPropertyDescriptors<Obj> | undefined =>
  Object.getOwnPropertyDescriptors(object);
