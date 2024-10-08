// Class.
import { Descriptor } from './descriptor.class';
/**
 *
 */
export class Descriptors<
  Obj extends object | Function,
  Keys extends keyof Obj
> {
  /**
   * Accessor to get stored property descriptors.
   * @returns The returned value is descriptors of map type.
   * @angularpackage
   */
  public get descriptors(): Map<Keys, PropertyDescriptor> {
    return this.#descriptors;
  }

  /**
   * Privately stored property descriptors.
   * @angularpackage
   */
  readonly #descriptors: Map<Keys, PropertyDescriptor> = new Map();

  /**
   * Creates an instance of `Descriptors` with obj and `keys` to pick descriptors.
   * @param object An object from which descriptors are retrieved.
   * @param keys Optional property keys to retrieve from specified `object`.
   * @angularpackage
   */
  constructor(object: Obj, ...keys: Keys[]) {
    Array.isArray(keys) && keys.length > 0
      ? this.setPicked(object, ...keys)
      : this.setAll(object);
  }

  /**
   * Get property descriptor from `#descriptors`.
   * @param key
   * @returns
   * @angularpackage
   */
  public get(key: Keys): PropertyDescriptor | undefined {
    return this.#descriptors.get(key);
  }

  /**
   * Get all descriptors from `#descriptors`.
   * @returns The returned value is array of all stored descriptors.
   * @angularpackage
   */
  public getAll(): Array<[Keys, PropertyDescriptor]> {
    return Array.from(this.#descriptors.entries());
  }

  /**
   * Check whether `#descriptors` has `key`.
   * @param key The `key` to check whether descriptors has.
   * @returns The returned value is a `boolean` indicating whether descriptors has descriptor of property `key`.
   * @angularpackage
   */
  public has(key: Keys): boolean {
    return this.#descriptors.has(key);
  }

  /**
   * The method sets the `value` under `key` in `#descriptors`.
   * @param key The property key to set descriptor.
   * @param value Property descriptor to set under the `key`.
   * @returns The returned value is an instance of `Descriptors`.
   * @angularpackage
   */
  public set(key: Keys, value: PropertyDescriptor): this {
    this.#descriptors.set(key, value);
    return this;
  }

  /**
   * The method sets all descriptors from `object`.
   * @param object The object from which all descriptors are set.
   * @returns The returned value is an instance of this.
   * @angularpackage
   */
  public setAll<Key extends Keys>(object: Obj): this {
    // Pick all the descriptors of the given `object`.
    const objectDescriptors = Descriptor.getAll(object);
    // If description exists in the object set them into the map storage.
    typeof objectDescriptors === 'object' &&
      Object.keys(objectDescriptors).forEach((key) =>
        this.#descriptors.set(key as Key, objectDescriptors[key as Key])
      );
    return this;
  }

  /**
   * The method sets descriptors from `object` of `keys`.
   * @param object An object from which descriptors are set to `#descriptors`.
   * @param keys Keys of `object` to retrieved descriptors.
   * @returns The returned value is an instance of `Descriptors`.
   * @angularpackage
   */
  public setPicked<Key extends Keys>(object: Obj, ...keys: Key[]): this {
    // Pick the descriptors of the given `keys`.
    const pickedDescriptors = Descriptor.pick(object, ...keys);
    // If description exists in the object set them into the map storage.
    typeof pickedDescriptors === 'object' &&
      Object.keys(pickedDescriptors).forEach(key =>
        this.#descriptors.set(key as Key, pickedDescriptors[key as Key])
      );
    return this;
  }
}
