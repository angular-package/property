import { ResultCallback } from '@angular-package/type';
export type GetExistProperty = <Obj extends object, Key extends keyof Obj>(
  object: Obj,
  key: Key,
  callback?: ResultCallback
) => Obj[Key];
