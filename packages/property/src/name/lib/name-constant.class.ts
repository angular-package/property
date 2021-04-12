// Internal.
import { NameCommon } from './name-common.class';
import { ConfigName } from '../interface/config-name.interface';
import { guard } from '@angular-package/type';

export class NameConstant extends NameCommon {
  constructor(name: string, config?: ConfigName) {
    if (guard.is.string(name) === false) {
      throw new Error(`
        String \`name\` must be initialized.
      `);
    }
    super(config, name);
  }
}
