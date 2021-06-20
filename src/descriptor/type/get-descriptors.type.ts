// @angular-package/type
import { Func } from '@angular-package/type';
// Type.
import { ObjectPropertyDescriptors } from './object-property-descriptors.type';
export type GetDescriptors = <
  Obj extends object | Func,
  Keys extends keyof Obj
>(
  object: Obj,
  keys?: Keys[]
) => ObjectPropertyDescriptors<Obj> | undefined;
