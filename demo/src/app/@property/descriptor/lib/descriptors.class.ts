import { Descriptor } from './descriptor.class';
/**
 *
 */
export class Descriptors<
  Obj extends object | Function,
  Keys extends keyof Obj
> {
  /**
   *
   * @returns
   * @angularpackage
   */
  public get descriptors(): Map<Keys, PropertyDescriptor> {
    return this.#descriptors;
  }

  /**
   *
   */
  #descriptors: Map<Keys, PropertyDescriptor> = new Map();

  /**
   *
   * @param obj
   * @param keys
   * @angularpackage
   */
  constructor(obj: Obj, ...keys: Keys[]) {
    Array.isArray(keys) && keys.length > 0
      ? this.setPicked(obj, ...keys)
      : this.setAll(obj);
  }

  /**
   *
   * @param key
   * @returns
   * @angularpackage
   */
  public get(key: Keys): PropertyDescriptor | undefined {
    return this.#descriptors.get(key);
  }

  /**
   *
   * @param key
   * @returns
   * @angularpackage
   */
  public getAll(): Array<[Keys, PropertyDescriptor]> {
    return Array.from(this.#descriptors.entries());
  }

  /**
   *
   * @param key
   * @returns
   * @angularpackage
   */
  public has(key: Keys): boolean {
    return this.#descriptors.has(key);
  }

  /**
   *
   * @param key
   * @param value
   * @returns
   * @angularpackage
   */
  public set(key: Keys, value: PropertyDescriptor): this {
    this.#descriptors.set(key, value);
    return this;
  }
  /**
   *
   * @param object
   * @returns
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
   *
   * @param obj
   * @param keys
   * @returns
   * @angularpackage
   */
  public setPicked<Key extends Keys>(obj: Obj, ...keys: Key[]): this {
    // Pick the descriptors of the given `keys`.
    const pickedDescriptors = Descriptor.pick(obj, ...keys);
    // If description exists in the object set them into the map storage.
    typeof pickedDescriptors === 'object' &&
      Object.keys(pickedDescriptors).forEach((key) =>
        this.#descriptors.set(key as Key, pickedDescriptors[key as Key])
      );
    return this;
  }
}
