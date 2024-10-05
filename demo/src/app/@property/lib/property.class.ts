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
  Names extends keyof Obj
> extends WrapProperty<Obj, Names> {
  /**
   *
   * @param object
   * @param name
   * @param accessor
   * @returns
   * @angularpackage
   */
  public static define<Obj extends object, Name extends PropertyKey, Value>(
    object: Obj,
    name: Name,
    data?: DataDescriptor<Value>,
    accessor?: AccessorDescriptor<Value> & ThisType<Obj>
  ): Obj & { [K in Name]: Value } {
    typeof data === 'object'
      ? Object.defineProperty(object, name, data)
      : typeof accessor === 'object' &&
        Object.defineProperty(object, name, accessor);
    return object as any;
  }

  /**
   *
   * @param obj
   * @param name
   * @returns
   * @angularpackage
   */
  public static set<Obj extends object, Name extends keyof Obj>(
    object: Obj,
    name: Name,
    value: Obj[Name]
  ): typeof Property {
    object[name] = value;
    return this;
  }

  /**
   *
   * @param object
   * @param name
   * @returns
   * @angularpackage
   */
  public static get<Obj extends object, Name extends keyof Obj>(
    object: Obj,
    name: Name
  ): Obj[Name] {
    return object[name];
  }

  /**
   *
   * @param object
   * @param names
   * @returns
   * @angularpackage
   */
  public static pick<Obj extends object, Names extends keyof Obj>(
    object: Obj,
    ...names: Names[]
  ): { [Key in Names]: Obj[Key] } {
    return Object.assign(
      {},
      ...names.map(key =>
        typeof object[key] !== 'undefined' ? { [key]: object[key] } : undefined
      )
    );
  }

  /**
   *
   * @param object
   * @param names
   * @param getterCallback
   * @param setterCallback
   * @returns
   * @angularpackage
   */
  public static wrap<Obj extends object | Function, Names extends keyof Obj>(
    object: Obj,
    names: Names[],
    getterCallback?: GetterCallback<Obj, Names>,
    setterCallback?: SetterCallback<Obj, Names>
  ): WrapProperty<Obj, Names> {
    return new WrapProperty(object, ...names).wrap(
      names,
      getterCallback,
      setterCallback
    );
  }

  /**
   *
   * @param object
   * @param names
   * @angularpackage
   */
  constructor(object: Obj, ...names: Names[]) {
    super(object, ...names);
  }
}
