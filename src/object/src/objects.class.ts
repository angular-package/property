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
   * 
   */
  #objects: Objs = {} as any;


  /**
   * Creates an instance of `Objects`.
   * @param object 
   */
  constructor(objects: Objs) {
    Object.entries(objects).forEach(([key, obj]) => {
      console.log(`key`, key, `obj`, obj);
      this.#objects = Object.assign(this.#objects, {[key]: new Obj(obj)});
    });
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
    (this.#objects[objName] as unknown as ObjsContainer<Objs, Name>)
      .getProperty(key);
    return 
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
    (this.#objects[objName] as unknown as ObjsContainer<Objs, Name>).setProperty(key, value);
    return this;
  }
}

const o = new Objects({
  math: {a: 1, b: 2},
  calc: {c: 3, d: 4}
});
o.setProperty('math', 'a', 2);
o.getProperty('math', 'b');
console.log(o.getObj('calc').get.d);
