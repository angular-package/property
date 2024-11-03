export type BeforeGetCallback<Obj, Key extends keyof Obj> = (
  this: Obj,
  key: Key,
  previousGet: Obj[Key],
  value: Obj[Key],
  instance: Obj
) => Obj[Key] | void;
