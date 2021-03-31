import { CommonName } from './common-name.interface';
import { ConfigName } from './config-name.interface';
import { Types } from '@angular-package/type';

export interface GenericName extends CommonName {
  set: <Type>(name: string, type?: Types<Type>) => this;
}
