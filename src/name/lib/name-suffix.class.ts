// Object.
import { is, guard, ResultCallback } from '@angular-package/type';

export class NameSuffix {
  // Get suffix.
  public get get(): string {
    return this.#suffix;
  }

  // Initialize default suffix.
  #suffix = '';

  /**
   * Create instance.
   * @param suffix An optional initial `string` type value as suffix.
   */
  constructor(suffix?: string) {
    if (is.string(suffix)) {
      this.set(suffix);
    }
  }

  /**
   * Callback function for the `set` method.
   * @param result A `boolean` type `result` of the check.
   * @param value Any type `value` from the check.
   * @returns A `boolean` indicating whether or not the suffix is a `string` type.
   */
  // TODO: Add errorCallback
  public callback: ResultCallback = (result: boolean, value: any): boolean => {
    if (result === false) {
       throw new Error(`Suffix must be a \`string\` type, got value ${value}`);
    }
    return result;
  }

  /**
   * Set suffix for the name.
   * @param suffix A `string` type value.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the suffix is a `string`.
   * @returns A `NameSuffix` instance.
   */
  public set(suffix: string, callback: ResultCallback = this.callback): this {
    if (guard.is.string(suffix, callback)) {
      this.#suffix = suffix;
    }
    return this;
  }
}
