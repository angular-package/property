import { guard, is, ResultCallback, Func } from '@angular-package/type';
/**
 *
 */
export class Objects<Obj extends object> {
  #object: Obj | undefined;

  /**
   * 
   */
  get get(): Obj | undefined {
    return this.#object || undefined;
  }

  constructor(value?: Obj) {
    if (is.defined(value)) {
      this.set(value);
    }
  }

  /**
   * Detects the type of the specified `object` against and returns its prototype when it's a `class`.
   * @param object Object of a generic `Obj` type to check if it's a `class` or just the `object`.
   * @param callback
   * @returns
   */
  static get = <Obj extends object>(
    object: Obj,
    callback?: ResultCallback
  ): Obj => {
    return is.class(object, callback)
      ? Objects.getPrototype(object)
      : guard.is.object<Obj>(object, callback)
      ? object
      : object;
  }

  /**
   * Returns the `object` `prototype` of a type detected from the `object`.
   * @param object The `object` that contains the `prototype`.
   * @returns The return value is an `object` of a generic `Obj` type.
   */
  static getPrototype<Obj extends object>(object: Obj): Obj {
    return Object.getPrototypeOf(object);
  }

  static hasOwnProperty<O extends object, K extends keyof O>(
    object: O,
    key: K
  ): boolean {
    return {}.hasOwnProperty.call(object, key);
  }

  public hasOwnProperty<O extends Obj, K extends keyof O>(
    object: O,
    key: K
  ): boolean {
    return {}.hasOwnProperty.call(object, key);
  }

  public set<O extends Obj>(object: O): this {
    this.#object = Objects.get(object);
    return this;
  }
}
