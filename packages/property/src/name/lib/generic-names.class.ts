// External.
import { guard, is } from '@angular-package/type';
// Class.
import { CommonNames } from './common-names.class';
// Interface.
import { GenericConfigName } from '../interface/generic-config-name.interface';

export class GenericNames extends CommonNames {
  // Get name.
  public get get(): string {
    return this.#name;
  }

  #name = '';

  /**
   * Creates instance.
   * @param config A `ConfigGenericName` type value.
   */
  constructor(config?: GenericConfigName) {
    super(config);
    if (!is.undefined(config)) {
      if (guard.is.objectKey<GenericConfigName, 'name'>(config, 'name')) {
        if (is.string(config.name)) {
          this.#name = config.name;
        }
      }
    }
  }

  /**
   * Set the name.
   * @param name A `string` type value.
   * @returns this.
   */
  public set(name: string): this {
    if (guard.is.string(name)) {
      this.#name = name;
    }
    return this;
  }
}
