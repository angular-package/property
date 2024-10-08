// Class.
import { PropertyWrapper } from './property-wrapper.class';

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
> extends PropertyWrapper<Obj, Names> {
  /**
   * The method defines `accessor` or `data` descriptor property in `object` of `name`.
   * @param object
   * @param name
   * @param accessor
   * @returns The returned value `object` with.
   * @angularpackage
   */
  public static define<Obj extends object, Name extends PropertyKey, Value>(
    object: Obj,
    name: Name,
    data?: DataDescriptor<Value>,
    accessor?: AccessorDescriptor<Value> & ThisType<Obj>
  ): Obj & { [K in Name]: Value } | Obj {
    return data && Object.defineProperty(object, name, data) as Obj & { [K in Name]: Value }
      || accessor && Object.defineProperty(object, name, accessor) as Obj & { [K in Name]: Value }
      || object;
  }

  /**
   * The method return the value of the specified property `name` from the `object`.
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
   * The static method gets specified properties from the specified `object`.
   * @param object
   * @param names
   * @returns
   * @angularpackage
   */
  public static pick<Obj extends object, Names extends keyof Obj>(
    object: Obj,
    ...names: Names[]
  ): { [Key in Names]: Obj[Key] } | undefined {
    return Object.assign(
      {},
      ...names.map(key =>
        typeof object[key] !== 'undefined' ? { [key]: object[key] } : undefined
      )
    );
  }

  /**
   * The method sets the `value` of indicated property by its `name` in the `object`.
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
    Object.assign(object, {[name]: value});
    return this;
  }

  /**
   * The static method wraps properties of `names` .
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
  ): PropertyWrapper<Obj, Names> {
    return new PropertyWrapper(object, ...names).wrap(
      names,
      getterCallback,
      setterCallback
    );
  }

  /**
   * Creates an instance of `Property`.
   * @param object
   * @param names
   * @angularpackage
   */
  constructor(
    object: Obj,
    ...names: Names[]
  ) {
    super(object, ...names);
  }

  /**
   * The instance method defines `accessor` or `data` descriptor property of `name` in stored `object`.
   * @param object
   * @param name
   * @param accessor
   * @returns The returned value `object` with .
   * @angularpackage
   */
  public define<Name extends PropertyKey, Value>(
    name: Name,
    data?: DataDescriptor<Value>,
    accessor?: AccessorDescriptor<Value> & ThisType<Obj>
  ): Obj & { [K in Name]: Value } | Obj {
    return this.#define(super.object, name, data, accessor) as any;
  }

  /**
   * 
   * @param name 
   * @returns 
   * @angularpackage
   */
  public get<Name extends keyof Obj>(
    name: Name,
  ): Obj[Name] {
    return super.object[name];
  }

  /**
   *
   * @param object 
   * @param name 
   * @param value 
   * @returns 
   */
  public set<Name extends keyof Obj>(
    name: Name,
    value: Obj[Name]
  ): this {
    Object.assign(super.object, {[name]: value});
    return this;
  }

  /**
   * 
   * @param object 
   * @param name 
   * @param data 
   * @param accessor 
   * @returns 
   * @angularpackage
   */
  #define<O extends Obj, Name extends PropertyKey, Value>(
    object: O,
    name: Name,
    data?: DataDescriptor<Value>,
    accessor?: AccessorDescriptor<Value> & ThisType<Obj>
  ): Obj & { [K in Name]: Value } | Obj {
    return data
      ? Object.defineProperty(object, name, data) as Obj & { [K in Name]: Value } : 
      accessor 
        ? Object.defineProperty(object, name, accessor) as Obj & { [K in Name]: Value }
        : object;
  }
}
