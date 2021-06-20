export type GetProperties = <Obj extends object, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[]
) => Pick<Obj, Keys>;
