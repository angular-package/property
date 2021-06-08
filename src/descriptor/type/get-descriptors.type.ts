import { ObjectPropertyDescriptors } from './object-property-descriptors.type';
export type GetDescriptors = <Obj>(object: Obj, key?: (keyof Obj | keyof Obj[])) => ObjectPropertyDescriptors<Obj> | undefined;
