import { is } from '@angular-package/type';
// Internal.
import { PrefixName } from '../interface/prefix-name.interface';

export class NamePrefix implements PrefixName {
  // Get prefix.
  public get get(): string {
    return this.#prefix;
  }

  // Declare default prefix.
  #prefix = '';

  /**
   * Creates instance.
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
