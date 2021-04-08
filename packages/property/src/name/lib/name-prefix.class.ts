import { is } from '@angular-package/type';
// Internal.
import { PrefixName } from '../interface/prefix-name.interface';

export class NamePrefix implements PrefixName {
  // Declare default prefix.
  #prefix = '';

  // Get prefix.
  get get(): string {
    return this.#prefix;
  }

  /**
   * Create instance.
   * @param prefix Default string value as prefix.
   */
  constructor(prefix?: string ) {
    this.set(prefix);
  }

  /**
   * Set prefix for name.
   * @param prefix String value.
   * @returns this.
   */
  public set(prefix?: string): this {
    if (is.string(prefix)) {
      this.#prefix = prefix;
    }
    return this;
  }
}

