// External.
import { guard, is } from '@angular-package/type';
// Internal.
import { NameCommon } from './name-common.class';
import { ConfigName } from '../interface/config-name.interface';
import { GenericName } from '../interface/generic-name.interface';
import { ConfigGenericName } from '../interface/config-generic-name.interface';

export class NameGeneric extends NameCommon implements GenericName {
  /**
   * Properties.
   * @public
   */
  // Get name.
  public get get(): string {
    return this.#name;
  }

  #name = '';

  /**
   * Creates instance.
   * @param config Prefix and suffix to generate name.
   */
  constructor(config?: ConfigGenericName) {
    super(config);
    if (is.object<ConfigName>(config)){
      if (is.string(config.name)) {
        this.#name = config.name;
      }
    }
  }

  /**
   * Set name to generate with prefix and suffix.
   * @param name String value to generate name.
   * @returns this.
   */
  public set(name: string): this {
    if (guard.is.string(name)) {
      this.#name = name;
    }
    return this;
  }
}
