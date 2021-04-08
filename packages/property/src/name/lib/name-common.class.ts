// External.
import { is } from '@angular-package/type';
// Classes.
import { NamePrefix } from './name-prefix.class';
import { NameSuffix } from './name-suffix.class';
// Interfaces.
import { ConfigName } from '../interface/config-name.interface';
import { CommonName } from '../interface/common-name.interface';

export abstract class NameCommon implements CommonName {

  // Namespace for prefix.
  #prefix: NamePrefix;
  // Namespace for suffix.
  #suffix: NameSuffix;
  // Name.
  protected $name = '';

  // Get name.
  get get(): string {
    return this.$name;
  }

  // Generate name with prefix and suffix.
  get generate(): string {
    return `${this.#prefix.get}${this.$name}${this.#suffix.get}`;
  }

  /**
   * Create instance.
   * @param config Prefix and suffix for name.
   */
  constructor(config?: ConfigName) {
    this.#prefix = new NamePrefix(config?.prefix);
    this.#suffix = new NameSuffix(config?.suffix);
  }

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
        this.suffix(config?.suffix);
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
