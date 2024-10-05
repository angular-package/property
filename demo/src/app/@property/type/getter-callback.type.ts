export type GetterCallback<Obj, Key extends keyof Obj> = (
  key: Key,
  instance: Obj
) => Obj[Key] | void;
