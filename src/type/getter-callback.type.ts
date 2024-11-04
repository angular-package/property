export type GetterCallback<Obj, Key extends keyof Obj> = (
  this: Obj,
  key: Key,
  previousGetValue: Obj[Key],
  value: Obj[Key],
  instance: Obj
) => Obj[Key] | void;
