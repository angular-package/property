export type GetProperty = <Obj extends object, Key extends keyof Obj>(
  object: Obj,
  key: Key
) => Obj[Key];
