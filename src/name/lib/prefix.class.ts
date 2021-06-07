// @angular-package/type.
import { ResultCallback, guard, is } from '@angular-package/type';
/**
 * Secure define, set, and store privately filtered prefix for the name.
 * + Filter inputted prefix.
 * + Initially set prefix.
 * + Define with a static method `define()`.
 * + Set and store privately with the `set()` method.
 * + Get privately stored prefix.
 * + Change the filter pattern.
 * + Guard the string type prefix value.
 * + Configurable callback function for the `set()` and `define()` methods.
 * + Default callback function for the `set()` method throws an `Error`.
 */
export class Prefix {
  // Returns privately stored prefix.
  public get get(): string {
    return this.#prefix;
  }

  // Filter.
  private filter = /[^a-zA-Z0-9$_]/g;

  // Initialize default prefix.
  #prefix = '';

  /**
   * Creates instance.
   * @param prefix An optional initial `string` type value as prefix.
   */
  constructor(prefix?: string) {
    if (is.string(prefix)) {
      this.#prefix = Prefix.define(prefix);
    }
  }

  /**
   * Define the
   * @param value
   * @returns
   */
   static define(
    value: string,
    filter: RegExp = /[^a-zA-Z0-9$_]/g,
    callback?: ResultCallback
  ): string {
    return guard.is.string(value, callback) ? value.replace(filter, '') : '';
  }

  /**
   * Sets and stores privately prefix for the name.
   * @param prefix A `string` type filtered value.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the prefix is a `string`.
   * @returns The return value is a `Prefix` instance for the chaining.
   */
  public set(prefix: string, callback: ResultCallback = this.callback): this {
    if (guard.is.string(prefix, callback)) {
      this.#prefix = Prefix.define(prefix, this.filter, callback);
    }
    return this;
  }

  /**
   * Callback function for the `set()` method.
   * @param result A `boolean` type `result` of the check.
   * @param value Any type `value` from the check.
   * @returns The return value is a `boolean` indicating whether or not the prefix is a `string` type.
   */
  private callback: ResultCallback = (result: boolean, value: any): boolean => {
    if (result === false) {
       throw new Error(`${Prefix.name} must be a \`string\` type, got value ${value}`);
    }
    return result;
  }
}
