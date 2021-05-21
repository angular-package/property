import { ResultCallback } from '@angular-package/type';
export type GetProperty =
  <Obj extends object, Key extends keyof Obj>(object: Obj, key: Key, callback?: ResultCallback) => Obj[Key] | undefined;
