import { ResultCallback } from '@angular-package/type';
export type GetObject = <Obj extends object>(object: Obj, callback?: ResultCallback) => Obj;
