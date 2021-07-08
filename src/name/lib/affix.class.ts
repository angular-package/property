// @angular-package/type.
import { ResultCallback, guard, is } from '@angular-package/type';
// Class.
import { ObjectLock } from '../../object/src/object-lock.class';
/**
 * Manages settings for the affix of a string type.
 * - Default `length` of the affix is `3`, and pattern is `/[^a-zA-Z0-9$_]/g`.
 *
 *   Sets
 * - Initially sets the affix with optional settings.
 * - Sets the maximum length of the affix with the `setLength()` method.
 * - Sets custom regular expression with the `setPattern()` method.
 *
 *   Gets privately stored
 * - maximum `length` of the affix with the `getLength()` method.
 * - pattern to filter the affix with the `getPattern()` method.
 */
export abstract class Affix extends ObjectLock {
  //#region private properties
  /**
   * The maximum affix length of a `number` type with the default value of `3`.
   */
  #length = 3;

  /**
   * The pattern of a `RegExp` type for the affix. The Default value is set to `/[^a-zA-Z0-9$_]/g`.
   */
  #pattern = /[^a-zA-Z0-9$_]/g;
  //#endregion

  /**
   * Manages the affix.
   * Creates an instance and initially sets the affix `length` and `pattern`.
   */
  constructor(length?: number, pattern?: RegExp) {
    super();
    if (is.defined(length)) {
      this.setLength(length);
    }
    if (is.defined(pattern)) {
      this.setPattern(pattern);
    }
  }

  //#region instance methods
  /**
   * Returns the maximum `length` of the actual settings for the affix, which by default is set to `3`.
   * @returns The return value is a privately stored maximum length of the affix of a `number` type.
   */
  public getLength(): number {
    return this.#length;
  }

  /**
   * Returns `pattern` of the actual settings for the affix, which by default is set to `/[^a-zA-Z0-9$_]/g`.
   * @returns The return value is a privately stored regular expression of a `RegExp` type.
   */
  public getPattern(): RegExp {
    return this.#pattern;
  }

  /**
   * Sets the length of the affix, which by default is set to `3`.
   * The method works if an instance is not locked by the `lock()` method.
   * @param length A `number` type value, that indicates the maximum `length` of the affix.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the length is
   * of a `number` type.
   * @returns The return value is a child class instance for the chaining.
   */
  public setLength(length: number, callback?: ResultCallback): this {
    this.#length =
      guard.number(length, callback) && is.false(this.isLocked)
        ? length
        : this.#length;
    return this;
  }

  /**
   * Sets the pattern of a `RegExp` for the affix.
   * The method works if an instance is not locked by the `lock()` method.
   * @param pattern A `RegExp` type value used to filter the affix.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the `pattern`
   * is of a `RegExp` type.
   * @returns The return value is a child class instance for the chaining.
   */
  public setPattern(pattern: RegExp, callback?: ResultCallback): this {
    this.#pattern =
      is.regexp(pattern, callback) && is.false(this.isLocked)
        ? pattern
        : this.#pattern;
    return this;
  }
  //#endregion
}
