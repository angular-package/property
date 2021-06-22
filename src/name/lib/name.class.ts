// External.
import { guard, is, ResultCallback } from '@angular-package/type';
// Class.
import { CommonName } from './common-name.class';
// Interface.
import { GenericConfigName } from '../interface/generic-config-name.interface';
/**
 * 
 */
export class Name extends CommonName {
  // Get name.
  public get get(): string {
    return this.#name;
  }

  // Initialize name.
  #name = '';

  /**
   * Creates an instance for the generic name.
   * @param config A `ConfigGenericName` type value.
   */
  constructor(config?: GenericConfigName) {
    super(config);
    if (!is.undefined(config)) {
      if (guard.is.objectKey(config, 'name')) {
        if (is.string(config.name)) {
          this.#name = config.name;
        }
      }
    }
  }

  /**
   * Callback function for the `set` method.
   * @param result A `boolean` type `result` of the check.
   * @param value Any type `value` from the check.
   * @returns A `boolean` indicating whether or not the name is a `string` type.
   */
  // TODO: Add errorCallback
  public callback: ResultCallback = (result: boolean, value: string): boolean => {
    if (result === false) {
       throw new Error(`Name must be a \`string\` type, got value ${value}`);
    }
    return result;
  }

  /**
   * Set the name.
   * @param name A `string` type value.
   * @param callback A `ResultCallback` function to handle the result of the check whether or not the name is a `string`.
   * @returns this.
   */
  public set(name: string, callback: ResultCallback = this.callback): this {
    if (guard.is.string(name, callback)) {
      this.#name = name;
    }
    return this;
  }
}
