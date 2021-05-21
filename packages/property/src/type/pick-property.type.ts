export type PickProperty = <Obj extends object>(obj: Obj, keys: (keyof Obj)[]) => {[P in keyof Obj]: Obj[P]};
