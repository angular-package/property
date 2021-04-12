// External.
import { is } from '@angular-package/type';
// Classes.
import { NamePrefix } from './name-prefix.class';
import { NameSuffix } from './name-suffix.class';
// Interfaces.
import { ConfigName } from '../interface/config-name.interface';
import { CommonName } from '../interface/common-name.interface';
import { PickName } from '../interface/pick-name.interface';

export abstract class NameCommon implements CommonName {
  /**
   * Properties.
   * @public
   */
  // Get name.
  public get get(): string {
    return this.#name;
  }

  // Generate name with prefix and suffix.
  public get generate(): string {
    return `${this.#prefix.get}${this.get}${this.#suffix.get}`;
  }

  public get pick(): PickName {
    return {
      generate: this.generate,
      name: this.get,
      prefix: this.#prefix.get,
      suffix: this.#suffix.get
    };
  }

  /**
   * Properties.
   * @private
   */
  // Name.
  #name = '';
  // Namespace for prefix.
  #prefix: NamePrefix = new NamePrefix();
  // Namespace for suffix.
  #suffix: NameSuffix = new NameSuffix();

  /**
   * Create instance.
   * @param config Prefix and suffix for name.
   */
  constructor(config?: ConfigName, name = '') {
    this.#name = name;
    if (is.object<ConfigName>(config)) {
      this.#prefix.set(config.prefix);
      this.#suffix.set(config.suffix);
    }
  }

  /**
   * Methods.
   * @public
   */
  /**
   * Configure prefix and suffix to generate name.
   * @param config Prefix and suffix for generating name.
   * @returns this.
   */
  public config(config?: ConfigName): this {
    if (is.object<ConfigName>(config)) {
      if (is.string(config.prefix)) {
        this.prefix(config.prefix);
      }
      if (is.string(config.suffix)) {
        this.suffix(config.suffix);
      }
    }
    return this;
  }

  /**
   * Set prefix to generate name.
   * @param value Prefix for name.
   * @returns this.
   */
  public prefix(value: string): this {
    this.#prefix.set(value);
    return this;
  }

  /**
   * Set suffix to generate name.
   * @param value Suffix for name.
   * @returns this.
   */
  public suffix(value: string): this {
    this.#suffix.set(value);
    return this;
  }
}
