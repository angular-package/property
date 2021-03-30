import { Injectable } from '@angular/core';
import { guard } from '@angular-package/type';
// Internal.
import { SuffixName } from '../interface/suffix-name.interface';

@Injectable()
export class NameSuffix implements SuffixName {
  // Declare default suffix.
  private suffix$$ = '';

  // Get suffix.
  get get(): string {
    return this.suffix$$;
  }

  /**
   * Create instance.
   * @param suffix Just suffix.
   */
  constructor(suffix?: string) {
    this.set(suffix);
  }

  /**
   * Set suffix.
   * @param suffix String value to be suffix.
   * @returns this.
   */
  public set(suffix: string): this {
    if (guard.is.string(suffix)) {
      this.suffix$$ = suffix;
    }
    return this;
  }
}
