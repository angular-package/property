import { PickProperty } from '../type/pick-property.type';
/**
 * Pick properties from an object with specified keys.
 * @param obj Any type `obj` value to pick property from.
 * @param keys An `Array` of string values to pick from `obj`.
 */
export const pickProperty: PickProperty = <Obj>(obj: any, keys: Array<string>): Obj => {
  return Object.assign({}, ...keys.map((key: string) => ({
    [key]: obj[key]
  })));
};
