export type GetDescriptor = <Obj extends object, Key extends keyof Obj>(
  object: Obj,
  key: Key
) => PropertyDescriptor | undefined;
