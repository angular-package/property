// External.
import { guard } from '@angular-package/type';
// Internal.
import { NameCommon } from './name-common.class';
import { ConfigName } from '../interface/config-name.interface';
import { GenericName } from '../interface/generic-name.interface';

export class NameGeneric extends NameCommon implements GenericName {
  /**
   * Creates instance.
   * @param config Prefix and suffix to generate name.
   */
  constructor(config?: ConfigName) {
    super(config);
  }

  /**
   * Set name to generate with prefix and suffix.
   * @param name String value to generate name.
   * @returns this.
   */
  public set(name: string): this {
    if (guard.is.string(name)) {
      this.$name = name;
    }
    return this;
  }
}
