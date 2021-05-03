// `guard` object.
import { guard } from '@angular-package/type';
// Class.
import { NameCommon } from './name-common.class';
// Interface.
import { ConfigName } from '../interface/config-name.interface';
/**
 * Create a constant name with a changeable prefix and suffix.
 */
export class NameConstant extends NameCommon {
  constructor(name: string, config?: ConfigName) {
    if (guard.is.string(name) === false) {
      throw new Error(`A \`string\` \`name\` must be initialized`);
    }
    super(config, name);
  }
}
