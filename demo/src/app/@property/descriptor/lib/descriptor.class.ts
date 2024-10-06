// Class.
import { AccessorDescriptors } from './accessor-descriptors.class';
import { DataDescriptors } from './data-descriptors.class';
import { Objects } from '../../object';

// Interface.
import { DataDescriptor } from '../interface';
import { GetSelectedDescriptor } from '../interface/get-selected-descriptor.interface';
import { SetSelectedDescriptor } from '../interface/set-selected-descriptor.interface';

// Type.
import { AnyDescriptor } from '../type/any-descriptor.type';
import { ObjectPropertyDescriptors } from '../type/object-property-descriptors.type';
import { ResultCallback } from '../../type/result-callback.type';
import { ThisAccessorDescriptor } from '../type';
import { callbacks } from '../../callback/src/callback.object';

/**
 *
 */
export class Descriptor<Value, Obj extends object = object> {
  /**
   * Returns accessor descriptor of a `ThisAccessorDescriptor<Value, Obj>` type, on `get` or `set` property detected.
   * @param descriptor An `object` of a `ThisAccessorDescriptor<Value, Obj>` type, to define with the default values of the
   * `CommonDescriptor`.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an
   * `object` with `get` or `set` property, by default it uses  `accessorCallback()` function from the `guard`.
   * @throws Throws an `Error` if the `descriptor` is not an `object` of a `ThisAccessorDescriptor<Value, Obj>` type,
   * which means it doesn't contain `get` or `set` property.
   * @returns The return value is an `object` of a `ThisAccessorDescriptor<Value, Obj>` type.
   */
  public static defineAccessor<Value, Obj extends object>(
    descriptor: ThisAccessorDescriptor<Value, Obj>,
    callback?: ResultCallback
  ): ThisAccessorDescriptor<Value, Obj> {
    return AccessorDescriptors.define(descriptor, callback);
  }

  /**
   * Returns data descriptor of a `DataDescriptor<Value>` interface, on `writable` or `value` property detected.
   * @param descriptor An `object` of a `DataDescriptor<Value>` interface, to set with the default values of the
   * `CommonDescriptor`.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with the `writable` or `value` property, by default it uses `dataCallback()` function from the static `DataDescriptors.guard()` method.
   * @returns The return value is an `object` of a `DataDescriptor<Value>` interface.
   */
  public static defineData<Value>(
    descriptor: DataDescriptor<Value>,
    callback?: ResultCallback
  ): DataDescriptor<Value> {
    return DataDescriptors.define(descriptor, callback);
  }

  /**
   * Returns property descriptors from the specified detected object.
   * @param object An `object` of a generic `Obj` type to get own property descriptor with the specified `key`.
   * If `class` is provided then it uses its prototype.
   * @returns The return value is an `object` of a `ObjectPropertyDescriptors<Obj>` type.
   */
  public static fromObject<Obj extends object>(
    object: Obj
  ): ObjectPropertyDescriptors<Obj> | undefined {
    return Object.getOwnPropertyDescriptors(Objects.get<Obj>(object));
  }

  /**
   * Returns property descriptor from the `object` or `class` prototype.
   * Wrapper function for the `getOwnPropertyDescriptor`, which "Gets the own property descriptor of the specified object."
   * @param object An `object` of a generic `Obj` type or a class to get own property descriptor with the specified `key`.
   * If `class` is provided then it uses its prototype to get the property descriptor.
   * @param key A `keyof Obj` value to get property descriptor from the `object`.
   * @returns The return value is an `object` of a `PropertyDescriptor` interface or an `undefined`.
   */
  public static fromProperty<Obj extends object, Key extends keyof Obj>(
    object: Obj,
    key: Key
  ): PropertyDescriptor | undefined {
    return Object.getOwnPropertyDescriptor(Objects.get(object), key);
  }
  /**
   *
   * @param object
   * @param name
   * @returns
   * @angularpackage
   */
  public static get<Obj, Name extends keyof Obj>(
    object: Obj,
    name: Name
  ): PropertyDescriptor | undefined {
    return (
      Object.getOwnPropertyDescriptor(object, name) ||
      Object.getOwnPropertyDescriptor(this.#detectObject(object), name)
    );
  }

  /**
   *
   * @param object
   * @returns
   * @angularpackage
   */
  public static getAll<Obj extends object | Function>(
    object: Obj
  ): ObjectPropertyDescriptors<Obj> {
    return {
      ...Object.getOwnPropertyDescriptors(object),
      ...Object.getOwnPropertyDescriptors(this.#detectObject(object)),
    };
  }

  /**
   *
   * @param object
   * @param names
   * @returns
   * @angularpackage
   */
  public static pick<Obj extends object | Function, Names extends keyof Obj>(
    object: Obj,
    ...names: Names[]
  ): Pick<ObjectPropertyDescriptors<Obj>, Names> {
    // Prepare constant to assign descriptors of picked keys.
    const pickedDescriptors: Pick<
      ObjectPropertyDescriptors<Obj>,
      Names
    > = {} as any;

    // Get all descriptors.
    const descriptors = this.getAll(object);

    // If descriptors exists then set picked descriptor into the map storage.
    typeof descriptors === 'object' &&
      Object.keys(descriptors)
        .filter(key => names.includes(key as any))
        .forEach(key =>
          Object.assign(pickedDescriptors, {
            [key]: descriptors[key],
          })
        );
    return pickedDescriptors;
  }

  /**
   * Returns the `__proto__` or `prototype` of the given `object` depending on the detected type.
   * @param object
   * @returns
   * @angularpackage
   */
  static #detectObject(object: any): object {
    return typeof object === 'object'
      ? (object as any)['__proto__']
      : object.prototype;
  }

  /**
   * Creates an instance, and optionally sets descriptor of any type.
   * @param descriptor An optional `object` of an `AnyDescriptor<Value, Obj>` type to initially set any kind of descriptor.
   */
  constructor(descriptor?: AnyDescriptor<Value, Obj>) {
    if (descriptor) {
      this.#accessor.set(descriptor, result => result);
      this.#data.set(descriptor, result => result);
    }
  }

  // Get privately stored descriptor, and from the object or object property.
  get get(): GetSelectedDescriptor<Value, Obj> {
    return {
      accessor: this.#accessor.get,
      data: this.#data.get,
      from: {
        object: Descriptor.fromObject,
        property: Descriptor.fromProperty,
      },
    };
  }

  // Set selected accessor or data descriptor.
  get set(): SetSelectedDescriptor<Value, Obj> {
    return {
      accessor: (
        descriptor: ThisAccessorDescriptor<Value, Obj>,
        callback?: ResultCallback
      ): this => {
        this.#accessor.set(descriptor, callback);
        return this;
      },
      data: (
        descriptor: DataDescriptor<Value>,
        callback?: ResultCallback
      ): this => {
        this.#data.set(descriptor, callback);
        return this;
      },
    };
  }

  // Private accessor descriptor instance.
  #accessor: AccessorDescriptors<Value, Obj> = new AccessorDescriptors<
    Value,
    Obj
  >();
  // Private data descriptor instance.
  #data: DataDescriptors<Value> = new DataDescriptors<Value>();
}
