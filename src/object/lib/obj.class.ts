// Class.
import { AccessorDescriptor, DataDescriptor } from "../../descriptor";
import { Property } from "../../lib";


// Type.
import { GetterCallback, SetterCallback } from "../../type";
import { ResultCallback } from "../../type/result-callback.type";

/**
 *
 */
export class Obj<
  Obj extends object = object,
  Keys extends keyof Obj = keyof Obj
> {
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
   * The get accessor to return initialized object.
   */
  public get get(): Obj {
    return this.#property.object;
  }

  /**
   * The get accessor to return initialized `Property`.
   */
  public get property(): Property<Obj, Keys> {
    return this.#property;
  }

  /**
   * Privately stored initialized `Property`.
   */
  readonly #property: Property<Obj, Keys>;

  /**
   * Creates an instance of `Objects`.
   * @param object 
   */
  constructor(object: Obj = {} as Obj, ...names: Keys[]) {    
    this.#property = new Property(object, ...names);
  }

  /**
   * The instance method defines `accessor` or `data` descriptor property of `name` in stored `object`.
   * @param name The property name to define in the `object`.
   * @param data 
   * @param accessor 
   * @returns 
   */
  public defineProperty<Name extends PropertyKey, Value>(
    name: Name,
    data?: DataDescriptor<Value>,
    accessor?: AccessorDescriptor<Value> & ThisType<Obj>
  ): Obj & { [K in Name]: Value } | Obj {
    return this.#property.define(name, data, accessor);
  }

  /**
   * 
   * @param key 
   * @returns 
   */
  public hasOwnProperty<Key extends Keys>(
    key: Key
  ): boolean {
    return Obj.hasOwnProperty(this.#property.object, key);
  }

  /**
   * Returns the value from the
   * @param key 
   * @returns 
   */
  public getProperty<Key extends Keys>(
    key: Key
  ): Obj[Key] {
    return this.#property.get(key);
  }

  /**
   * @deprecated
   * The method sets `object`.
   * @param object 
   * @returns 
   */
  public set<O extends Obj>(
    object: O
  ): this {
    // this.#object = object;
    return this;
  }

  /**
   * The method sets property in the initialized `object`.
   * @param key The property key to set the `value` in the `object`.
   * @param value The value to set in the `object` under given `key`.
   * @returns The returned is an instance of `Objects`.
   * @angularpackage
   */
  public setProperty<Key extends Keys>(
    key: Key,
    value: Obj[Key]
  ): this {
    this.#property.set(key, value);
    return this;
  }

  /**
   * TODO: Check key of array.
   * The method wraps the property with getter and setter callback.
   * @param key 
   * @param value 
   * @returns 
   * @angularpackage
   */
  public wrapProperty<Key extends Keys>(
    key: Key | Key[],
    getterCallback?: GetterCallback<Obj, Key>,
    setterCallback?: SetterCallback<Obj, Key>
  ): this {
    this.#property.wrap(key, getterCallback, setterCallback);
    return this;
  }

  /**
   * 
   * @returns 
   */
  public valueOf(): Obj {
    return this.#property.object;
  }
}

