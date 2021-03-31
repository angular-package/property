import { NameCommon } from './name-common.class';
import { guard } from '@angular-package/type';
import { ConfigName } from '../interface/config-name.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class NameConstant extends NameCommon {
  readonly name$: string;
  constructor(name: string, config?: ConfigName) {
    super(config);
    if (guard.is.string(name)) {
      this.name$ = name;
    }
  }
}
