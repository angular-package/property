import { is, guard, Key, ResultCallback } from '@angular-package/type';

import { Descriptor } from '../descriptor/lib/descriptor.class';
import { PropertyName } from './property-name.class';

import { ConfigName } from '../name/interface/config-name.interface';
import { GenericConfigName } from '../name/interface/generic-config-name.interface';

import { AnyDescriptor } from '../descriptor/type/any-descriptor.type';
import { getProperty } from './get-property.function';
import { setProperty } from './set-property.function';

/**
 * Methods to handle object properties.
 */
export default class Property<Value> {

  check = {
    object: false,
    key: false,
    type: false
  };

  #descriptor: Descriptor<Value, any> = new Descriptor();
  #name: PropertyName;
  #value: Value | any;
  // #bind: PropertyBind<Type> = new PropertyBind();
  // #wrap: PropertyWrap<Type> = new PropertyWrap();
  constructor(constantOrConfig?: string | GenericConfigName, config?: ConfigName) {
    if (is.string(constantOrConfig)) {
      this.#name = new PropertyName(constantOrConfig, config);
    } else {
      this.#name = new PropertyName(constantOrConfig);
    }
  }

  /**
   * 
   * @param configName 
   */
  public config(configName: ConfigName): this {
    this.#name.config(configName);
    return this;
  }

  /**
   * 
   * @param object 
   * @param value 
   * @param key 
   */
  public define<Obj extends object, K extends keyof Obj>(
    object: Obj,
    value: Obj[K] = this.#value,
    key: K = this.#name.generate as K
  ): this {
    // Object.defineProperty(object, key, );
    return this;
  }

  /**
   * 
   * @param descriptor 
   */
  public descriptor(descriptor: AnyDescriptor<Value>): this {
    return this;
  }

  /**
   * 
   * @param object 
   * @param key 
   * @param callback 
   */
  public get<Obj extends object, K extends keyof Obj>(
    object: Obj,
    key: K = this.#name.generate as K,
    callback?: ResultCallback
  ): Obj[K] | undefined {
    return getProperty(object, key, callback);
  }

  /**
   * 
   * @param name 
   */
  public name(name: string): this {
    this.#name.set(name);
    return this;
  }

  /**
   * 
   * @description 
   * @param object 
   * @param value 
   * @param key 
   */
  public set<Obj extends object, K extends keyof Obj>(object: Obj, value: Obj[K] = this.#value, key: K = this.#name.generate as K): this {
// if (guard.is.objectKey(object, key)) {
//   if (is.type(value, typeof object[key])) {
//     object[key] = value;
//   }
// }
    setProperty(object, key, value);
    return this;
  }

  /**
   * 
   * @param value 
   */
  public value<Type extends Value>(value: Type): this {
    this.#value = value;
    return this;
  }
}
