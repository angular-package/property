export const propertyIn = <Obj>(properties: string[], object: Obj): boolean => properties.every(property => property in object === true);
