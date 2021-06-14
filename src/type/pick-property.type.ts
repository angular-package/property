export type PickProperties = <Obj extends object>(obj: Obj, keys: (keyof Obj)[]) => {[P in keyof Obj]: Obj[P]};
