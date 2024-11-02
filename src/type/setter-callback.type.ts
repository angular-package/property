export type SetterCallback<Obj, Key extends keyof Obj> = (
  this: Obj,
  value: Obj[Key],
  oldValue: Obj[Key],
  key: Key,
  instance: Obj
) => void;
