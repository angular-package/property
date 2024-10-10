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
   * @param param0 
   * @returns 
   * @angularpackage
   */
  public query<
    Name extends Names,
    Key extends keyof Objs[Name],
    ToName extends Names,
  >({}: Partial<{
    connect: {
      [N in Name]: {
        [K in Key]: Partial<{
          [TN in ToName]: keyof Objs[TN] | (keyof Objs[TN])[]
        }>
      }
    },

    // forEach.
    forEach: (name: Names, objects: Objs) => void,

    // Get.
    get: {
      [N in Name]: {
        [K in Key]: (value: Objs[N][K]) => void
      }
    },

    // Set.
    set: {
      [N in Name]: {
        [K in Key]: {
          value: Objs[N][K],
          callbackfn: (value: Objs[N][K]) => void
        }
      }
    },
  }>) {
    // forEach
    if (arguments[0].forEach) {
      (Object
        .entries(this.objects) as [Name, Objs[Names]][])
        .forEach(([name, obj]) => arguments[0].forEach(name, this.objects));
    }

    // Get.
    if (arguments[0].get) {
      (Object
        .entries(arguments[0].get) as [Name, {
          [K in Key]: (value: Objs[Name][K]) => void
        }][])
        .forEach(([name, keyCallbackFn]) => 
          (Object
            .entries(keyCallbackFn) as [Key, (value: Objs[Name][Key]) => void][])
            .forEach(([key, callbackfn]) => callbackfn(Objects.objects[name].get[key]))
        );
    }

    // Set.
    if (arguments[0].set) {
      (Object
        .entries(arguments[0].set) as [Name, {
          [K in Key]: Partial<{ value: Objs[Name][K], callbackfn: (value: Objs[Name][Key]) => void }>
        }][])
        .forEach(([name, keyToValue]) => 
          (Object
            .entries(keyToValue) as [Key, Partial< { value: Objs[Name][Key], callbackfn: (value: Objs[Name][Key]) => void }>][])
            .forEach(([key, set]) => (
              Object.assign(Objects.objects[name].get, {[key]: set.value}),
              set.callbackfn && set.value && set.callbackfn(set.value)
            ))
        )
    }

    // Connect.
    if (arguments[0].connect) {
      (Object
        .entries(arguments[0].connect) as [Name, {
          [K in Key]: Partial<{ [TN in ToName]: keyof Objs[TN] | (keyof Objs[TN])[] }>
        }][])
        .forEach(([name, keyTo]) => 
          (Object
            .entries(keyTo) as [Key, Partial<{ [TN in ToName]: keyof Objs[TN] | (keyof Objs[TN])[] }>][])
            .forEach(([key, to]) => {
              (Object
                .entries(to) as [ToName, keyof Objs[ToName] | (keyof Objs[ToName])[]][])
                .forEach(([toName, toKey]) => this.connect(name, key, [toName, toKey]));
            })
        );
    }
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
