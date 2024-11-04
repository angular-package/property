// Type.
import { PropDescriptor } from '../descriptor/lib/prop-descriptor.class';
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
  public static privateIndicator = '_';
  public static activeIndicator = `${WrapProperty.privateIndicator}a`;
  public static descriptorIndicator = `${WrapProperty.privateIndicator}d`;

  #indicator;

  constructor(
    object: Obj,
    name: Name,
    callback: {
      get?: GetterCallback<T, Name>,
      set?: SetterCallback<T, Name>,
    },
    configurable = true,
    enumerable = false,
    indicator = {
      active: WrapProperty.activeIndicator,
      descriptor: WrapProperty.descriptorIndicator,
      private: WrapProperty.privateIndicator,
    }
  ) {
    this.#indicator = indicator;
    this
      .#defineActive(object, name)
      .#definePrivate(object, name)
      .#defineDescriptor(object, name)
      .#defineProperty(
        object,
        name,
        callback.get,
        callback.set,
        configurable,
        enumerable
      )
  }

  /**
   * @description Returns `PropDescriptor` instance of property `name`.
   * @param object Object to get `PropDescriptor` of property `name`.
   * @param name Property name.
   * @returns The returned value is an instance of `PropDescriptor`.
   */
  public getPropertyDescriptor(object: Obj, name: Name) {
    return Object.getPrototypeOf(object)[this.getPropertyName('descriptor', name)] as PropDescriptor<Obj>
  }

  public getPropertyName(indicator: 'active' | 'descriptor' | 'private', name: Name) {
    return `${this.#indicator[indicator]}${String(name)}`;
  }

  #defineActive(object: Obj, name: Name) {
    if (this.getPropertyName('active', name) in object === false) {
      Object.defineProperty(
        Object.getPrototypeOf(object),
        this.getPropertyName('active', name), {
          configurable: false,
          enumerable: false,
          value: true,
          writable: true
        }
      );  
    }
    return this;
  }

  // Original descriptor.
  #defineDescriptor(object: Obj, name: Name) {
    if (this.getPropertyName('descriptor', name) in object) {
      this.getPropertyDescriptor(object, name).add(object, name);
    } else {
      Object.defineProperty(
        Object.getPrototypeOf(object),
        this.getPropertyName('descriptor', name), {
          configurable: false,
          enumerable: false,
          value: new PropDescriptor(object, name),
          writable: true
        }
      );  
    }
    return this;
  }

  // Defines private property.
  #definePrivate(object: Obj, name: Name) {
    const obj = Object.getPrototypeOf(object);
    if (this.getPropertyName('private', name) in object) {
      Object.assign(obj, { [this.getPropertyName('private', name)]: obj[name] });
    } else {
      Object.defineProperty(
        obj,
        this.getPropertyName('private', name), {
          configurable: false,
          enumerable: false,
          value: (typeof object === 'function' ? Object.getPrototypeOf(object) : object)[name],
          writable: true
        }
      );  
    }  
    return this;
  }

  #defineProperty(
    object: Obj,
    name: Name,
    getterCallbackFn?: GetterCallback<T, Name>,
    setterCallbackFn?: SetterCallback<T, Name>,
    configurable = true,
    enumerable = false,
  ) {
    const t = this;
    // TODO: Check.
    const descriptorId = this.getPropertyDescriptor(object, name).size - 1;
    Object.defineProperty(
      typeof object === 'function' ? Object.getPrototypeOf(object) : object,
      name, {
        configurable,
        enumerable,
        get(): T[Name] {
          // perform original getter.
          const propDescriptor = (this[t.getPropertyName('descriptor', name)] as PropDescriptor<Obj>);
          const descriptor = propDescriptor.get(descriptorId);
          const previousDescriptorValue = descriptor
            ? 'value' in descriptor
              ? descriptor.value
              : descriptor.get?.apply(this, arguments as any)
            : undefined;

          // Use custom getter.
          let value = typeof getterCallbackFn === "function" && this[t.getPropertyName('active', name)]
            ? getterCallbackFn.apply(this, [name, previousDescriptorValue, this[t.getPropertyName('private', name)], this]) 
            : this[t.getPropertyName('private', name)];

          return value;
        },
        set(value: T[Name]){
          // Previous value.
          const previousValue = this[t.getPropertyName('private', name)];
  
          // Perform original setter.
          (this[t.getPropertyName('descriptor', name)] as PropDescriptor<Obj>)
            .get(descriptorId)
            ?.set
            ?.apply(this, arguments as any);
    
          // Use custom setter.
          typeof setterCallbackFn === "function" && this[t.getPropertyName('active', name)] &&
            setterCallbackFn.apply(this, [value, previousValue, name, this]);

          // Set value in the private property.
          Object.getPrototypeOf(this)[t.getPropertyName('private', name)] = value;
        }
      }
    );  
  }
}
