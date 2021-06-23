// @angular-package/type.
import { ResultCallback, guard, is } from '@angular-package/type';
// Callback.
import { callbacks } from '../../callback/src/callback.object';
/**
 * Defines, sets, and stores privately, filtered prefix for the name.
 * + Defines a string type prefix with a static method `define()`.
 * + Initially sets prefix.
 * + Filters provided prefix with customizable regular expression.
 * + Sets and stores privately with the `set()` method of instance.
 * + Gets privately stored prefix with the property of the instance.
 * + Sets custom pattern for the regular expression to filter provided prefix.
 * + Guards provided string-type prefix.
 * + Possibility to use custom callback function for the `set()` method of the instance and static `define()` method.
 * + Default callback function for the `set()` method throws an `Error`.
 */
export class Prefix {
  // Returns privately stored prefix.
  public get get(): string {
    return this.#prefix;
  }

  // Pattern.
  #pattern = /[^a-zA-Z0-9$_]/g;

  // Length.
  #length = 3;

  // Initialize default prefix.
  #prefix = '';

  /**
   * Creates instance.
   * @param prefix An optional initial `string` type value as prefix.
   */
  constructor(prefix?: string) {
    if (is.defined(prefix)) {
      this.#prefix = Prefix.define(prefix);
    }
  }

  /**
   * Defines a string type filtered with regexp prefix for the name.
   * @param prefix A `string` type value as prefix.
   * @param pattern A `RegExp` type pattern to filter the provided prefix. Default value is set to `/[^a-zA-Z0-9$_]/g`.
   * @param length A `number` type of the prefix length.
   * @returns The return value is a `string` type prefix.
   */
  static define(
    prefix: string,
    pattern: RegExp = /[^a-zA-Z0-9$_]/g,
    length: number = 3,
    callback: ResultCallback = callbacks.prefix
  ): string {
    return guard.is.string(prefix, callback)
      ? prefix.replace(pattern, '').slice(0, length)
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
   * Sets the pattern for the providing prefix in `set()` method of instance and static `define()` method.
   * @param pattern A `RegExp` type pattern to filter the provided prefix. Default value is set to `/[^a-zA-Z0-9$_]/g`.
   * @returns The return value is a `Prefix` instance for the chaining.
   */
  public pattern(pattern: RegExp = this.#pattern): this {
    this.#pattern = pattern;
    return this;
  }

  /**
   * Sets and stores privately prefix of a string type for the name.
   * @param prefix A `string` type value as prefix.
   * @param callback An optional `ResultCallback` function to handle the result of the check whether or not the prefix is a `string` type.
   * @returns The return value is a `Prefix` instance for the chaining.
   */
  public set(prefix: string, callback?: ResultCallback): this {
    this.#prefix = Prefix.define(prefix, this.#pattern, this.#length, callback);
    return this;
  }
}
