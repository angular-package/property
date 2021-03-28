import { Injectable } from '@angular/core';
import { propertySet } from '../../lib/set-property.function';
import { PrefixName } from '../interface/prefix-name.interface';

@Injectable()
export class NamePrefix implements PrefixName {
  // Declare default prefix.
  private prefix$$ = '';

  // Get prefix.
  get get(): string {
    return this.prefix$$;
  }

  /**
   * Create instance.
   * @param suffix Just suffix.
   */
  constructor(prefix?: string ) {
    this.set(prefix);
  }

  /**
   * Set prefix.
   * @param prefix String value to be prefix.
   * @returns this.
   */
  public set(prefix: string): this {
    propertySet<NamePrefix, any, string>(this, 'prefix$$', prefix, 'string');
    return this;
  }
}
