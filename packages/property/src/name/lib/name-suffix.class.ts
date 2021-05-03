// Object.
import { is } from '@angular-package/type';
// Interface.
import { SuffixName } from '../interface/suffix-name.interface';

export class NameSuffix implements SuffixName {
  // Get suffix.
  public get get(): string {
    return this.#suffix;
  }

  // Initialize default suffix.
  #suffix = '';

  /**
   * Create instance.
   * @param suffix Default `string` value as the suffix.
   */
  constructor(suffix?: string) {
    this.set(suffix);
  }

  /**
   * Set suffix for name.
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
