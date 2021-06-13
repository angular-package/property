import { isObject, ResultCallback } from '@angular-package/type';
import { GetObject } from '../../type/get-object.type';
/**
 * 
 * @param object 
 * @param callback 
 * @returns 
 */
export const getObject: GetObject =
  <Obj>(object: Obj, callback?: ResultCallback): Obj | undefined => isObject<Obj>(object, callback) ? object : undefined;
