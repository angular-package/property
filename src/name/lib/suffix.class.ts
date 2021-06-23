// @angular-package/type.
import { ResultCallback, guard, is } from '@angular-package/type';
// Callback.
import { callbacks } from '../../callback/src/callback.object';
/**
 * Defines, sets, and stores privately, filtered suffix for the name.
 * + Defines a string type suffix with a static method `define()`.
 * + Initially sets suffix.
 * + Filters provided suffix with customizable regular expression.
 * + Sets and stores privately with the `set()` method of instance.
 * + Gets privately stored suffix with the property of the instance.
 * + Sets custom pattern for the regular expression to filter provided suffix.
 * + Guards provided string-type suffix.
 * + Possibility to use custom callback function for the `set()` method of the instance and static `define()` method.
 * + Default callback function for the `set()` method throws an `Error`.
 */
export class Suffix {
  // Returns privately stored suffix.
  public get get(): string {
    return this.#suffix;
  }

  // Pattern.
  #pattern = /[^a-zA-Z0-9$_]/g;

  // Length.
  #length = 3;

  // Initialize default suffix.
  #suffix = '';

  /**
   * Creates instance.
   * @param suffix An optional initial `string` type value as suffix.
   */
  constructor(suffix?: string) {
    if (is.defined(suffix)) {
      this.#suffix = Suffix.define(suffix);
    }
  }

  /**
   * Defines a string type filtered with regexp suffix for the name.
   * @param suffix A `string` type value as suffix.
   * @param pattern A `RegExp` type pattern to filter provided `value`.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the suffix is a `string`.
   * @returns The return value is a `string` type suffix.
   */
  static define(
    suffix: string,
    pattern: RegExp = /[^a-zA-Z0-9$_]/g,
    length: number = 3,
    callback: ResultCallback = callbacks.suffix
  ): string {
    return guard.is.string(suffix, callback)
      ? suffix.replace(pattern, '').slice(0, length)
      : '';
  }

  /**
   * Sets the length of the prefix, which by default is set to 3.
   * @param length A `number` type of the prefix length.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the length is a `number` type.
   * @returns The return value is a `Prefix` instance for the chaining.
   */
  public length(length: number, callback?: ResultCallback): this {
    this.#length = guard.is.number(length, callback) ? length : this.#length;
    return this;
  }

  /**
   * Sets the pattern for the providing suffix in `set()` method of instance and static `define()` method.
   * @param pattern A `RegExp` type to filter the provided prefix.
   * @returns The return value is a `Suffix` instance for the chaining.
   */
  public pattern(pattern: RegExp = /[^a-zA-Z0-9$_]/g): this {
    this.#pattern = pattern;
    return this;
  }

  /**
   * Sets and store privately suffix of a string type for the name.
   * @param suffix A `string` type value.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the suffix is a `string`.
   * @returns The return value is a `Suffix` instance.
   */
  public set(suffix: string, callback?: ResultCallback): this {
    this.#suffix = Suffix.define(suffix, this.#pattern, this.#length, callback);
    return this;
  }
}
