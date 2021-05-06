// Object,
import { is } from '@angular-package/type';

export class NamePrefix {
  // Get prefix.
  public get get(): string {
    return this.#prefix;
  }

  // Initialize default prefix.
  #prefix = '';

  /**
   * Creates instance.
   * @param prefix Default `string` value as prefix.
   */
  constructor(prefix?: string ) {
    this.set(prefix);
  }

  /**
   * Set prefix for the name.
   * @param prefix A `string` type value.
   * @returns this.
   */
  public set(prefix?: string): this {
    if (is.string(prefix)) {
      this.#prefix = prefix;
    }
    return this;
  }
}
