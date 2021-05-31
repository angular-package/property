// Object,
import { ResultCallback, guard, is } from '@angular-package/type';

export class NamePrefix {
  // Get prefix.
  public get get(): string {
    return this.#prefix;
  }

  // Initialize default prefix.
  #prefix = '';

  /**
   * Creates instance.
   * @param prefix An optional initial `string` type value as prefix.
   */
  constructor(prefix?: string) {
    if (is.string(prefix)) {
      this.#prefix = prefix;
    }
  }

  /**
   * Callback function for `set()` method.
   * @param result A `boolean` type `result` of the check.
   * @param value Any type `value` from the check.
   * @returns A `boolean` indicating whether or not the prefix is a `string` type.
   */
   public callback: ResultCallback = (result: boolean, value: any): boolean => {
    if (result === false) {
       throw new Error(`Prefix must be a \`string\` type, got value ${value}`);
    }
    return result;
  }

  /**
   * Set prefix for the name.
   * @param prefix A `string` type value.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the prefix is a `string`.
   * @returns A `NamePrefix` instance.
   */
  public set(prefix: string, callback: ResultCallback = this.callback): this {
    if (guard.is.string(prefix, callback)) {
      this.#prefix = prefix;
    }
    return this;
  }
}

