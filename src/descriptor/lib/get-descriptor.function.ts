import { GetDescriptor } from '../type/get-descriptor.type';
export const getDescriptor: GetDescriptor = <Obj, Key extends keyof Obj>(
  object: Obj,
  key: Key
): PropertyDescriptor | undefined =>
  Object.getOwnPropertyDescriptor(object, key);
