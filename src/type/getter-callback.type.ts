export type GetterCallback<Obj, Key extends keyof Obj> = (
  this: Obj,
  key: Key,
  instance: Obj
) => Obj[Key] | void;
