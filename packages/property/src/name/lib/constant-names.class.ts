// `guard` object.
import { guard } from '@angular-package/type';
// Class.
import { CommonNames } from './common-names.class';
// Interface.
import { ConfigName } from '../interface/config-name.interface';
/**
 * Create a constant name with a changeable prefix and suffix.
 */
export class ConstantNames extends CommonNames {
  constructor(name: string, config?: ConfigName) {
    if (guard.is.string(name) === false) {
      throw new Error(`A \`string\` \`name\` must be initialized`);
    }
    super(config, name);
  }
}
