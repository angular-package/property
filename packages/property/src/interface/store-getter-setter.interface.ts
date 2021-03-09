import { Func } from '@angular-package/type';
import { GenericObject } from './generic-object.interface';
export interface StoreGetterSetter {
  getter: GenericObject<Func>;
  setter: GenericObject<Func>;
}
