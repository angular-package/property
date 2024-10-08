// Class.
import { Obj } from "./obj.class";

// Type.
import { ObjsContainer } from "../type/objs-container.type";

/**
 *
 */
export class Objects<
  Objs extends object,
  Names extends keyof Objs
> {
  /**
   * @angularpackage
   */
  public get get(): Objs {
    return this.#objects;
  }

  /**
   * 
   */
  readonly #objects: Objs = {} as any;


  /**
   * Creates an instance of `Objects`.
   * @param object 
   */
  constructor(objects: Objs) {
    Object.entries(objects).forEach(([key, obj]) => Object.assign(this.#objects, {[key]: new Obj(obj)}));
  }

  /**
   * 
   * @param name 
   * @returns 
   */
  public getObj<Name extends Names>(
    name: Name
  ): ObjsContainer<Objs, Name> {
    return this.#objects[name] as unknown as ObjsContainer<Objs, Name>;
  }

  /**
   * Returns the value 
   * @param key 
   * @returns 
   */
  public getProperty<Name extends Names, Key extends keyof Objs[Name]>(
    objName: Name,
    key: Key,
  ): Objs[Name][Key] {
    return this.getObj(objName)!.getProperty(key);
  }

  /**
   * The method sets property in the initialized `object`.
   * @param key The property key to set the `value` in the `object`.
   * @param value The value to set in the `object` under given `key`.
   * @returns The returned is an instance of `Objects`.
   * @angularpackage
   */
  public setProperty<Name extends Names, Key extends keyof Objs[Name]>(
    objName: Name,
    key: Key,
    value: Objs[Name][Key]
  ): this {
    this.getObj(objName)!.setProperty(key, value);
    return this;
  }
}
