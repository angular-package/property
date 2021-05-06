import { PropertyIn } from '../type/property-in.type';
export const propertyIn: PropertyIn = <Obj>(properties: string[], object: Obj): boolean =>
  properties.every(property => property in object === true);
