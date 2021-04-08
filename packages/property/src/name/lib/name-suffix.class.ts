import { is } from '@angular-package/type';
// Internal.
import { SuffixName } from '../interface/suffix-name.interface';

export class NameSuffix implements SuffixName {
  // Declare default suffix.
  #suffix = '';

  // Get suffix.
  get get(): string {
    return this.#suffix;
  }

  /**
   * Create instance.
   * @param suffix Default string value as suffix.
   */
  constructor(suffix?: string) {
    this.set(suffix);
  }

  /**
   * Set suffix for name.
   * @param suffix String value.
   * @returns this.
   */
  public set(suffix?: string): this {
    if (is.string(suffix)) {
      this.#suffix = suffix;
    }
    return this;
  }
}
