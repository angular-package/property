// @angular-package/type.
import { ResultCallback, guard, is } from '@angular-package/type';
/**
 * Secure define, set, and store privately filtered suffix for the name.
 * + Filter inputted suffix.
 * + Initially set suffix.
 * + Define with a static method `define()`.
 * + Set and store privately with the `set()` method.
 * + Get privately stored suffix.
 * + Change the filter pattern.
 * + Guard the string type suffix value.
 * + Configurable callback function for the `set()` and `define()` methods.
 * + Default callback function for the `set()` method throws an `Error`.
 */
export class Suffix {
  // Returns privately stored suffix.
  public get get(): string {
    return this.#suffix;
  }

  // Filter.
  private filter = /[^a-zA-Z0-9$_]/g;

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
   *
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
   * Sets and store privately suffix of a string type for the name.
   * @param suffix A `string` type value.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the suffix is a `string`.
   * @returns The return value is a `Suffix` instance.
   */
  public set(suffix: string, callback: ResultCallback = this.callback): this {
    this.#suffix = Suffix.define(suffix, this.filter, callback);
    return this;
  }

  /**
   * Callback function for the `set` method.
   * @param result A `boolean` type `result` of the check.
   * @param value Any type `value` from the check.
   * @returns The return value is a `boolean` indicating whether or not the suffix is a `string` type.
   */
  // TODO: Add errorCallback
  private callback: ResultCallback = (result: boolean, value: any): boolean => {
    if (result === false) {
      throw new Error(`${Suffix.name} must be a \`string\` type, got value ${value}`);
    }
    return result;
  }
}
