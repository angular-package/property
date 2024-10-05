// Class.
import { AccessorDescriptors } from './accessor-descriptors.class';
import { DataDescriptors } from './data-descriptors.class';

// Interface.
import { DataDescriptor } from '../interface';

// Type.
import { ThisAccessorDescriptor } from '../type';
import { ObjectPropertyDescriptors } from '../type/object-property-descriptors.type';
import { ResultCallback } from '../type/result-callback.type';

/**
 *
 */
export class Descriptor {
  /**
   * Returns defined accessor descriptor of a `ThisAccessorDescriptor<Value, Obj>` type, on `get` or `set` property detected.
   * @param descriptor An `object` of a `ThisAccessorDescriptor<Value, Obj>` type, to define with the default values of the
   * `CommonDescriptor`.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an
   * `object` with `get` or `set` property, by default it uses  `accessorCallback()` function from the `guard`.
   * @throws Throws an `Error` if the `descriptor` is not an `object` of a `ThisAccessorDescriptor<Value, Obj>` type,
   * which means it doesn't contain `get` or `set` property.
   * @returns The return value is an `object` of a `ThisAccessorDescriptor<Value, Obj>` type.
   */
  static defineAccessor<Value, Obj extends object>(
    descriptor: ThisAccessorDescriptor<Value, Obj>,
    callback?: ResultCallback
  ): ThisAccessorDescriptor<Value, Obj> {
    return AccessorDescriptors.define(descriptor, callback);
  }

  /**
   * Returns defined data descriptor of a `DataDescriptor<Value>` interface, on `writable` or `value` property detected.
   * @param descriptor An `object` of a `DataDescriptor<Value>` interface, to set with the default values of the
   * `CommonDescriptor`.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `descriptor` is an `object`
   * with the `writable` or `value` property, by default it uses `dataCallback()` function from the static `DataDescriptors.guard()` method.
   * @returns The return value is an `object` of a `DataDescriptor<Value>` interface.
   */
  static defineData<Value>(
    descriptor: DataDescriptor<Value>,
    callback?: ResultCallback
  ): DataDescriptor<Value> {
    return DataDescriptors.define(descriptor, callback);
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
}
