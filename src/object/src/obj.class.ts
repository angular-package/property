// Class.
import { Property } from "../../lib";

// Type.
import { ResultCallback } from "../../type/result-callback.type";

/**
 *
 */
export class Obj<
  Obj extends object,
  Keys extends keyof Obj = keyof Obj
> extends Object {
  /**
   * Returns object with merged with prototype.
   * @param object Object of a generic `Obj` type.
   * @param callback
   * @returns
   */
  public static get = <Obj extends object>(
    object: Obj,
  ): Obj => {
    return {
      ...(object as any)['prototype'] && (object as any['prototype']) || {},
      ...(object as any)['__proto__'] && (object as any)['__proto__'] || {},
      ...Object.getPrototypeOf(object) || {},
      ...object || {},
    };
  }

  /**
   * @deprecated
   * Returns the `object` `prototype` of a type detected from the `object`.
   * @param object The `object` that contains the `prototype`.
   * @returns The return value is an `object` of a generic `Obj` type.
   */
  public static getPrototype<Obj extends object>(object: Obj): Obj {
    return Object.getPrototypeOf(object);
  }

  /**
   * 
   * @param object 
   * @param key 
   * @returns 
   */
  public static hasOwnProperty<Obj extends object, Key extends keyof Obj>(
    object: Obj,
    key: Key
  ): boolean {
    return {}.hasOwnProperty.call(object, key);
  }

  /**
   * 
   * @param object 
   * @param callback 
   * @param payload 
   * @returns 
   */
  public static guard<Obj extends object, Payload extends object = object>(
    object: Obj,
    callback?: ResultCallback,
    payload?: Payload
  ) {
    const result = this.isObject(object);
    return (callback && callback(result, object, payload)) || result;
  }

  /**
   * 
   * @param value 
   * @returns 
   */
  public static isObject(value: any, ...keys: PropertyKey[]) {
    const isObject = typeof value === 'object' &&
      Object.prototype.toString.call(value).slice(8, -1).toLowerCase() === 'object' &&
      value instanceof Object;

    let result = true;
    if (keys && isObject) {
      keys.forEach(key => (result === true) && (result = key in value));
    }

    return keys ? isObject && result : isObject;
  }

  /**
   * 
   */
  public get get(): Obj | undefined {
    return this.#object || undefined;
  }

  /**
   * 
   */
  public get property(): Property<Obj, Keys> {
    return this.#property;
  }

  /**
   * 
   */
  #object: Obj | undefined;

  /**
   * 
   */
  #property!: Property<Obj, Keys>;

  /**
   * Creates an instance of `Objects`.
   * @param object 
   */
  constructor(object?: Obj, ...names: Keys[]) {
    super(object);
    object
      && this.set(object)
      && (this.#property = new Property(this.#object!, ...names));
  }

  /**
   * 
   * @param key 
   * @returns 
   */
  public hasOwnProperty<O extends Obj, Key extends keyof O>(
    key: Key
  ): boolean {
    return super.hasOwnProperty(key);
  }

  /**
   * The method sets `object` in 
   * @param object 
   * @returns 
   */
  public set<O extends Obj>(object: O): this {
    this.#object = Obj.get(object);
    return this;
  }

  /**
   * Returns the value 
   * @param key 
   * @returns 
   */
  public getProperty<Key extends keyof Obj>(key: Key): Obj[Key] {
    return this.property.object[key];
  }

  /**
   * The method sets property in the initialized `object`.
   * @param key The property key to set the `value` in the `object`.
   * @param value The value to set in the `object` under given `key`.
   * @returns The returned is an instance of `Objects`.
   * @angularpackage
   */
  public setProperty<Key extends keyof Obj>(
    key: Key,
    value: Obj[Key]
  ): this {
    this.property.set(key, value);
    return this;
  }
}
