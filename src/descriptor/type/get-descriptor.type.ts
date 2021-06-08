export type GetDescriptor = <Obj, Key extends keyof Obj>(object: Obj, key: Key) => PropertyDescriptor | undefined;
