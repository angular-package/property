// External.
import { guard } from '@angular-package/type';
// Internal.
import { NameCommon } from './name-common.class';
import { ConfigName } from '../interface/config-name.interface';

export class NameConstant extends NameCommon {
  readonly $name: string;
  constructor(name: string, config?: ConfigName) {
    super(config);
    this.$name = guard.is.string(name) ? name : '';
  }
}
