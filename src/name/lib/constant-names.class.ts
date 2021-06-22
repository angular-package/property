// Object.
import { guard } from '@angular-package/type';
// Class.
import { CommonName } from './common-name.class';
// Interface.
import { ConfigName } from '../interface/config-name.interface';
/**
 * Create a constant name with a changeable prefix and suffix.
 */
export class ConstantName extends CommonName {
  /**
   * Creates an instance for the constant/readonly name.
   * @param name A `string` type value for the readonly `name`.
   * @param config A `ConfigName` type value with `prefix` and `suffix` for the name.
   */
  constructor(name: string, config?: ConfigName) {
    if (guard.is.string(name) === false) {
      throw new Error(`A \`string\` \`name\` must be initialized`);
    }
    super(config, name);
  }
}
