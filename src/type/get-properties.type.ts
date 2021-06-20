export type GetProperties = <Obj extends object, Keys extends keyof Obj>(
  obj: Obj,
  keys: Keys[]
) => Pick<{ [P in keyof Obj]: Obj[P] }, Keys>;
