// Type.
import { GetterCallback, PrototypeOf, SetterCallback } from '../type';
/**
 * Creates an instance of `WrapProperty`.
 * @class
 * @classdesc Wrap property in `object`.
 */
export class WrapProperty<
  Obj extends object | (new () => any),
  T = (Obj extends new () => any ? PrototypeOf<Obj> : Obj),
  Name extends keyof T = keyof T,
> {
  public static descriptorIndicator = '$$';
  public static privateIndicator = '$';

  constructor(
    object: Obj,
    name: Name,
    setterCallback?: SetterCallback<T, Name>,
    getterCallback?: GetterCallback<T, Name> ,
    configurable = false,
    enumerable = true,
  ) {
    this
      .#definePrivate(object, name)
      .#storeDescriptor(object, name)
      .#defineProperty(object, name, setterCallback, getterCallback, configurable, enumerable)
  }

  #definePrivate(object: Obj, name: Name) {
    Object.defineProperty(
      typeof object === 'function' ? (object as new () => any).prototype : (object as any).__proto__,
      `${WrapProperty.privateIndicator}${String(name)}`, {
        configurable: false,
        enumerable: false,
        value: this.#getProto(object)[name],
        writable: true
      }
    );
    return this;
  }

  #defineProperty(
    object: Obj,
    name: Name,
    setterCallback?: SetterCallback<T, Name>,
    getterCallback?: GetterCallback<T, Name>,
    configurable = false,
    enumerable = true,
  ) {
    Object.defineProperty(
      typeof object === 'function' ? (object as new () => any).prototype : (object as any),
      name, {
        configurable,
        enumerable,
        get(): T[Name] {
          // perform original getter.
          this.__proto__[`${WrapProperty.descriptorIndicator}${String(name)}`]
            ?.get
            ?.apply(this, arguments as any);
  
          // Use custom getter.
          return typeof getterCallback === "function"
            ? getterCallback.apply(this, [name, this])
            : this.__proto__[`${WrapProperty.privateIndicator}${String(name)}`];
        },
        set(value: T[Name]){
          // Previous value.
          const previousValue = this.__proto__[`${WrapProperty.privateIndicator}${String(name)}`];
  
          // Perform original setter.
          this.__proto__[`${WrapProperty.descriptorIndicator}${String(name)}`]
            ?.set
            ?.apply(this, arguments as any);
  
          // Store in private property.
          Object.assign(this.__proto__, {
            [`${WrapProperty.privateIndicator}${String(name)}`]: value
          });
  
          // Use custom setter.
          typeof setterCallback === "function" &&
            setterCallback.apply(this, [value, previousValue, name, this]);
        }
      }
    );  
  }

  // Original descriptor.
  #storeDescriptor(object: Obj, name: Name) {
    Object.defineProperty(
      typeof object === 'function' ? (object as new () => any).prototype : (object as any).__proto__,
      `${WrapProperty.descriptorIndicator}${String(name)}`, {
        value: Object.getOwnPropertyDescriptor(
          typeof object === "function" ? (object as new () => any).prototype : object,
          name
        )
      }
    );
    return this;
  }

  // Get class/object proto.
  #getProto(object: Obj) {
    return typeof object === 'function'
      ? (object as new () => any).prototype
      : (object as any).__proto__;
  }
}
