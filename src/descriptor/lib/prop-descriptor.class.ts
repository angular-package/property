// Class.
import { Descriptor } from "./descriptor.class";
// Type.
import { PrototypeOf } from "../../type";
/**
 * 
 */
export class PropDescriptor<
  Obj extends object,
  T = (Obj extends new () => any ? PrototypeOf<Obj> : Obj),
  Key extends keyof T = keyof T,
> {

  public get descriptor() {
    return this.#descriptor;
  }

  public get size() {
    return this.#descriptor.length;
  }

  #descriptor = new Array<PropertyDescriptor>();
  constructor(object: Obj, key: Key) {
    this.add(object, key);
  }

  public add(object: Obj, key: Key) {
    this.#descriptor.push(Descriptor.fromProperty(object, key as any)!);
  }

  public get(id: number) {
    return this.#descriptor[id];
  }

  public last(): PropertyDescriptor {
    return this.#descriptor.reverse()[0];
  }
}
