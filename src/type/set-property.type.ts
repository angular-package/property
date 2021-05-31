export type SetProperty = <Obj extends object, Key extends keyof Obj>(object: Obj, key: Key, value: Obj[Key]) => Obj[Key];
