import { ResultCallback } from "../../type/result-callback.type";

/**
 *
 */
export class Objects<Obj extends object> {
  /**
   * Detects the type of the specified `object` against and returns its prototype when it's a `class`.
   * @param object Object of a generic `Obj` type to check if it's a `class` or just the `object`.
   * @param callback
   * @returns
   */
  public static get = <Obj extends object>(
    object: Obj,
    callback?: ResultCallback
  ): Obj => {
    return this.guardClass(object, callback)
      ? Objects.getPrototype(object)
      : this.guardObject<Obj>(object, callback)
      ? object
      : object;
  }

  /**
   * Returns the `object` `prototype` of a type detected from the `object`.
   * @param object The `object` that contains the `prototype`.
   * @returns The return value is an `object` of a generic `Obj` type.
   */
  public static getPrototype<Obj extends object>(object: Obj): Obj {
    return Object.getPrototypeOf(object);
  }

  public static hasOwnProperty<O extends object, K extends keyof O>(
    object: O,
    key: K
  ): boolean {
    return {}.hasOwnProperty.call(object, key);
  }

  public static guardClass<Obj extends object, Payload extends object = object>(
    cls: Obj,
    callback?: ResultCallback,
    payload?: Payload
  ) {
    const result = typeof cls === 'function' ||
    (cls instanceof Function && typeof cls === 'function')
    ? /class/.test(Function.prototype.toString.call(cls).slice(0, 5)) : false;
    return (callback && callback(result, cls, payload)) || result;
  }

  public static guardObject<Obj extends object, Payload extends object = object>(
    object: Obj,
    callback?: ResultCallback,
    payload?: Payload
  ) {
    const result = (typeof object === 'object' || typeof object === 'object') &&
      object instanceof Object
      return (callback && callback(result, object, payload)) || result;
  }

  /**
   * 
   */
  get get(): Obj | undefined {
    return this.#object || undefined;
  }

  #object: Obj | undefined;

  constructor(value?: Obj) {
    value && this.set(value);
  }

  public hasOwnProperty<O extends Obj, K extends keyof O>(
    object: O,
    key: K
  ): boolean {
    return {}.hasOwnProperty.call(object, key);
  }

  public set<O extends Obj>(object: O): this {
    this.#object = Objects.get(object);
    return this;
  }
}
