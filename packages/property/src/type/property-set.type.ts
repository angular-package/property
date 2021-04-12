export type PropertySet = <Obj, Key extends keyof Obj>(object: Obj, key: Key, value: Obj[Key]) => void;
