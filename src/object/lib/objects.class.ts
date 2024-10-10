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
  static objects: any;

  /**
   * @angularpackage
   */
  public get connected() {
    return this.#connected;
  }

  /**
   * @angularpackage
   */
  public get get(): Objs {
    return this.objects;
  }

  /**
   * @angularpackage
   */
  readonly objects: Objs = {} as any; // private 

  /**
   * @angularpackage
   */
  #connected: Map<Names, [PropertyKey, Names, PropertyKey]> = new Map();

  /**
   * Creates an instance of `Objects`.
   * @param object 
   * @angularpackage
   */
  constructor(objects: Objs) {
    Object
      .entries(objects)
      .forEach(([key, obj]) => Object.assign(
        this.objects, {[ key]: new Obj(obj) }));
  }

  /**
   * 
   * @param name 
   * @param key 
   * @param toName 
   * @param toKey 
   * @returns 
   * @angularpackage
   */
  public connect<
    Name extends Names,
    Key extends keyof Objs[Name],
    ToName extends Names,
    ToKey extends keyof Objs[ToName],
  >(
    name: Name,
    key: Key,
    ...to: [toName: ToName, toKey: ToKey | ToKey[]][]
  ): this {
    (!Objects.objects) && (Objects.objects = this.objects);
    to.forEach(([toName, toKey]) => (
      (!Array.isArray(toKey)) && (toKey = [toKey]),
      toKey.forEach(toKey => {
        (this.objects[toName] as unknown as ObjsContainer<Objs, ToName>)!
          .wrapProperty(
            toKey,
            () => Objects.objects[name].get[key],
            value => Object.assign(Objects.objects[name].get, {[key]: value})
          );
        this.#addConnection(toName, toKey, name, key);
      })
    ));
    return this;
  }

  /**
   * 
   * @param name 
   * @returns 
   * @angularpackage
   */
  public getObj<Name extends Names>(
    name: Name
  ): ObjsContainer<Objs, Name> {
    return this.objects[name] as unknown as ObjsContainer<Objs, Name>;
  }

  /**
   * Returns the value 
   * @param key 
   * @returns 
   * @angularpackage
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

  /**
   * 
   * @param name 
   * @param key 
   * @param toName 
   * @param toKey 
   * @returns 
   * @angularpackage
   */
  #addConnection<
    Name extends Names,
    Key extends keyof Objs[Name],
    ToName extends Names,
    ToKey extends keyof Objs[ToName],
  >(
    name: Name,
    key: Key,
    toName: ToName,
    toKey: ToKey
  ) {
    this.#connected.set(name, [key, toName, toKey]);
    return this;
  }
}
