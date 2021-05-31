export type ObjectPropertyDescriptors<Obj> = {[P in keyof Obj]: TypedPropertyDescriptor<Obj[P]>} & { [x: string]: PropertyDescriptor };
