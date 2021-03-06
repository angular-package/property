// External.
import { is, ResultCallback } from '@angular-package/type';
// Classes.
import { Prefix } from './prefix.class';
import { Suffix } from './suffix.class';
// Interfaces.
import { ConfigName } from '../interface/config-name.interface';
import { PickName } from '../interface/pick-name.interface';

export abstract class CommonName {
  // Returns privately stored name.
  public get get(): string {
    return this.#name;
  }

  // Generates the name with prefix and suffix.
  public get generate(): string {
    return `${this.#prefix.get}${this.get}${this.#suffix.get}`;
  }

  // Pick all property from the name.
  public get pick(): PickName {
    return {
      generate: this.generate,
      name: this.get,
      prefix: this.#prefix.get,
      suffix: this.#suffix.get
    };
  }

  // Name.
  #name = '';
  // Private namespace for prefix.
  #prefix: Prefix = new Prefix();
  // Private namespace for suffix.
  #suffix: Suffix = new Suffix();

  /**
   * Creates an instance.
   * @param configName An optional `ConfigName` type value to set initially prefix and suffix.
   * @param name A `string` type value for the readonly name.
   */
  constructor(configName?: ConfigName, name = '') {
    this.#name = name;
    if (is.object<ConfigName>(configName)) {
      if (is.string(configName.prefix)) {
        this.#prefix.set(configName.prefix);
      }
      if (is.string(configName.suffix)) {
        this.#suffix.set(configName.suffix);
      }
    }
  }

  /**
   * Set prefix for the name.
   * @param prefix A `string` type value as prefix.
   * @param callback A `ResultCallback` function to handle the result of the check if the prefix is a `string`.
   * @returns this.
   */
  public prefix(prefix: string, callback?: ResultCallback): this {
    this.#prefix.set(prefix, callback);
    return this;
  }

  /**
   * Set suffix for the name.
   * @param suffix A `string` type value as suffix.
   * @param callback A `ResultCallback` function to handle the result of the check if the suffix is a `string`.
   * @returns this.
   */
  public suffix(suffix: string, callback?: ResultCallback): this {
    this.#suffix.set(suffix, callback);
    return this;
  }
}
