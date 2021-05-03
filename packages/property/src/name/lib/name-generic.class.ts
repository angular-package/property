// External.
import { guard, is } from '@angular-package/type';
// Class.
import { NameCommon } from './name-common.class';
// Interface.
import { ConfigGenericName } from '../interface/config-generic-name.interface';
import { GenericName } from '../interface/generic-name.interface';

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
    if (!is.undefined(config)) {
      if (guard.is.objectKey<ConfigGenericName, 'name'>(config, 'name')) {
        if (is.string(config.name)) {
          this.#name = config.name;
        }
      }
    }
  }

  /**
   * Set the name to generate with prefix and suffix.
   * @param name A `string` type value as the `name`.
   * @returns this.
   */
  public set(name: string): this {
    if (guard.is.string(name)) {
      this.#name = name;
    }
    return this;
  }
}
