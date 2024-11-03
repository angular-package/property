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
  public static activeIndicator = 'a$';
  public static descriptorIndicator = 'd$';
  public static privateIndicator = '$';

  constructor(
    object: Obj,
    name: Name,
    callback: {
      beforeGet?: GetterCallback<T, Name>,
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
    this
      .#defineIndicator(object, indicator)
      .#defineActive(object, name)
      .#definePrivate(object, name)
      .#storeDescriptor(object, name)
      .#defineProperty(
        object,
        name,
        callback.get,
        callback.set,
        callback.beforeGet,
        configurable,
        enumerable
      )
  }

  public propertyDescriptor(object: Obj, name: Name) {
    return Object.getPrototypeOf(object)[this.propertyName(object, 'descriptor', name)] as PropDescriptor<Obj>
  }

  public propertyName(object: Obj, indicator: 'active' | 'descriptor' | 'private', name: Name) {
    return `${Object.getPrototypeOf(object)[`$indicator`][indicator]}${String(name)}`;
  }

  #defineIndicator(object: Obj, indicator: {}) {
    if ('$indicator' in object === false) {
      Object.defineProperty(
        Object.getPrototypeOf(object),
        `$indicator`, {
          configurable: false,
          enumerable: false,
          value: indicator,
          writable: true
        }
      );  
    }
    return this;
  }

  #defineActive(object: Obj, name: Name) {
    if (this.propertyName(object, 'active', name) in object === false) {
      Object.defineProperty(
        Object.getPrototypeOf(object),
        this.propertyName(object, 'active', name), {
          configurable: false,
          enumerable: false,
          value: true,
          writable: true
        }
      );  
    }
    return this;
  }

  #definePrivate(object: Obj, name: Name) {
    const obj = Object.getPrototypeOf(object);
    if (this.propertyName(object, 'private', name) in obj) {
      Object.assign(obj, { [this.propertyName(object, 'private', name)]: obj[name] });
    } else {
      Object.defineProperty(
        obj,
        this.propertyName(object, 'private', name), {
          configurable: false,
          enumerable: false,
          value: obj[name],
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
    beforeGetCallbackFn?: GetterCallback<T, Name>,
    configurable = true,
    enumerable = false,
  ) {
    const t = this;
    const descriptorId = this.propertyDescriptor(typeof object === 'function' ? Object.getPrototypeOf(object) : object, name).size - 1;
    Object.defineProperty(
      typeof object === 'function' ? Object.getPrototypeOf(object) : object,
      name, {
        configurable,
        enumerable,
        get(): T[Name] {
          // perform original getter.
          (this[t.propertyName(this, 'descriptor', name)] as PropDescriptor<Obj>)
            .get(descriptorId)
            ?.get
            ?.apply(this, arguments as any);
  
          // before get callback
          typeof beforeGetCallbackFn === "function" && beforeGetCallbackFn.apply(this, [name, this]);

          // Use custom getter.
          return typeof getterCallbackFn === "function" && this[t.propertyName(this, 'active', name)]
            ? getterCallbackFn.apply(this, [name, this]) 
            : this[t.propertyName(this, 'private', name)];
        },
        set(value: T[Name]){
          // Previous value.
          const previousValue = this[t.propertyName(this, 'private', name)];
  
          // Perform original setter.
          (this[t.propertyName(this, 'descriptor', name)] as PropDescriptor<Obj>)
            .get(descriptorId)
            ?.set
            ?.apply(this, arguments as any);
  
          // Set value in the private property.
          Object.assign(Object.getPrototypeOf(this), { [t.propertyName(this, 'private', name)]: value });
  
          // Use custom setter.
          typeof setterCallbackFn === "function" && this[t.propertyName(this, 'active', name)] &&
            setterCallbackFn.apply(this, [value, previousValue, name, this]);

          console.log(`set`, this, Object.getPrototypeOf(this), this[t.propertyName(this, 'private', name)]);
        }
      }
    );  
  }

  // Original descriptor.
  #storeDescriptor(object: Obj, name: Name) {
    const obj = Object.getPrototypeOf(object);
    if (this.propertyName(object, 'descriptor', name) in object) {
      this.propertyDescriptor(object, name).add(object, name);
    } else {
      Object.defineProperty(
        obj,
        this.propertyName(object, 'descriptor', name), {
          configurable: false,
          enumerable: false,
          value: new PropDescriptor(obj, name),
          writable: true
        }
      );  
    }
    return this;
  }
}
