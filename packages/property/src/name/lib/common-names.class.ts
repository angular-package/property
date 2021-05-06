// External.
import { is } from '@angular-package/type';
// Classes.
import { NamePrefix } from './name-prefix.class';
import { NameSuffix } from './name-suffix.class';
// Interfaces.
import { ConfigName } from '../interface/config-name.interface';
import { PickName } from '../interface/pick-name.interface';

export abstract class CommonNames {
  // Get name.
  public get get(): string {
    return this.#name;
  }

  // Generate a name with prefix and suffix.
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
  #name;
  // Private namespace for prefix.
  #prefix: NamePrefix = new NamePrefix();
  // Private namespace for suffix.
  #suffix: NameSuffix = new NameSuffix();

  /**
   * Creates instance.
   * @param config An optional `ConfigName` type `prefix` or `suffix` for the name.
   */
  constructor(config?: ConfigName, name = '') {
    this.#name = name;
    if (is.object<ConfigName>(config)) {
      this.#prefix.set(config.prefix);
      this.#suffix.set(config.suffix);
    }
  }

  /**
   * Set prefix or suffix for the name.
   * @param config A `ConfigName` type value.
   * @returns this.
   */
  public config(config: ConfigName): this {
    if (is.object<ConfigName>(config)) {
      this.#prefix.set(config.prefix);
      this.#suffix.set(config.suffix);
    }
    return this;
  }

  /**
   * Set prefix for the name.
   * @param prefix A `string` type value as prefix.
   * @returns this.
   */
  public prefix(prefix: string): this {
    this.#prefix.set(prefix);
    return this;
  }

  /**
   * Set suffix for the name.
   * @param suffix A `string` type value as suffix.
   * @returns this.
   */
  public suffix(suffix: string): this {
    this.#suffix.set(suffix);
    return this;
  }
}
