import { Injectable } from '@angular/core';
import { SuffixName } from '../interface/suffix-name.interface';
import { propertySet } from '../../lib/set-property.function';

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
    propertySet<NameSuffix, any, string>(this, 'suffix$$', suffix, 'string');
    return this;
  }
}
