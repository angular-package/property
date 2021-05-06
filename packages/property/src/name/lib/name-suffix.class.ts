// Object.
import { is } from '@angular-package/type';

export class NameSuffix {
  // Get suffix.
  public get get(): string {
    return this.#suffix;
  }

  // Initialize default suffix.
  #suffix = '';

  /**
   * Create instance.
   * @param suffix Default `string` value as suffix.
   */
  constructor(suffix?: string) {
    this.set(suffix);
  }

  /**
   * Set suffix for the name.
   * @param suffix A `string` type value.
   * @returns this.
   */
  public set(suffix?: string): this {
    if (is.string(suffix)) {
      this.#suffix = suffix;
    }
    return this;
  }
}
