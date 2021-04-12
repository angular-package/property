export type PropertyGet = <Obj, Key extends keyof Obj>(object: Obj, key: Key) => Obj[Key] | undefined;
