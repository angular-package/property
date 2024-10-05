// Class.
import { WrapProperty } from './wrap-property.class';

// Type.
import { GetterCallback } from '../type/getter-callback.type';
import { SetterCallback } from '../type/setter-callback.type';

// Interface.
import { AccessorDescriptor } from '../descriptor/interface/accessor-descriptor.interface';
import { DataDescriptor } from '../descriptor/interface/data-descriptor.interface';

/**
 *
 */
export class Property<
  Obj extends object,
  Keys extends keyof Obj
> extends WrapProperty<Obj, Keys> {
  /**
   *
   * @param object
   * @param key
   * @param accessor
   * @returns
   * @angularpackage
   */
  public static define<Obj extends object, Key extends PropertyKey, Value>(
    object: Obj,
    key: Key,
    data?: DataDescriptor<Value>,
    accessor?: AccessorDescriptor<Value> & ThisType<Obj>
  ): Obj & { [K in Key]: Value } {
    typeof data === 'object'
      ? Object.defineProperty(object, key, data)
      : typeof accessor === 'object' &&
        Object.defineProperty(object, key, accessor);
    return object as any;
  }

  /**
   *
   * @param obj
   * @param key
   * @returns
   * @angularpackage
   */
  public static set<Obj extends object, Key extends keyof Obj>(
    object: Obj,
    key: Key,
    value: Obj[Key]
  ): typeof Property {
    object[key] = value;
    return this;
  }

  /**
   *
   * @param object
   * @param key
   * @returns
   * @angularpackage
   */
  public static get<Obj extends object, Key extends keyof Obj>(
    object: Obj,
    key: Key
  ): Obj[Key] {
    return object[key];
  }

  /**
   *
   * @param object
   * @param keys
   * @returns
   * @angularpackage
   */
  public static pick<Obj extends object, Keys extends keyof Obj>(
    object: Obj,
    ...keys: Keys[]
  ): { [Key in Keys]: Obj[Key] } {
    return Object.assign(
      {},
      ...keys.map(key =>
        typeof object[key] !== 'undefined' ? { [key]: object[key] } : undefined
      )
    );
  }

  /**
   *
   * @param object
   * @param keys
   * @param getterCallback
   * @param setterCallback
   * @returns
   * @angularpackage
   */
  public static wrap<Obj extends object | Function, Keys extends keyof Obj>(
    object: Obj,
    keys: Keys[],
    getterCallback?: GetterCallback<Obj, Keys>,
    setterCallback?: SetterCallback<Obj, Keys>
  ): WrapProperty<Obj, Keys> {
    return new WrapProperty(object, ...keys).wrap(
      keys,
      getterCallback,
      setterCallback
    );
  }

  /**
   *
   * @param object
   * @param keys
   * @angularpackage
   */
  constructor(object: Obj, ...keys: Keys[]) {
    super(object, ...keys);
  }
}
