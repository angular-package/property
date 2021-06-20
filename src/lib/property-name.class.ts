// Object.
import { is } from '@angular-package/type';
// Class.
import { ConstantName } from '../name/lib/constant-names.class';
import { Name } from '../name/lib/name.class';
// Interface.
import { ConfigName } from '../name/interface/config-name.interface';
import { PickName } from '../name/interface/pick-name.interface';
import { GenericConfigName } from '../name/interface/generic-config-name.interface';
// Type.
import { Names } from '../name/type/names.type';
/**
 * Class to handle string type property name.
 */
export class PropertyName {
  public get generate(): string {
    return this.pick.generate;
  }

  public get get(): string {
    return this.pick.name;
  }

  public get pick(): PickName {
    return this.detect.pick;
  }

  private get detect(): Names {
    return this.#constant || this.#generic;
  }

  #constant?: ConstantName;
  #generic: Name = new Name();

  constructor(constantOrConfig?: string | GenericConfigName, config?: ConfigName) {
    if (is.string(constantOrConfig)) {
      this.#constant = new ConstantName(constantOrConfig, config);
    } else if (is.object<GenericConfigName>(constantOrConfig)) {
      this.config(constantOrConfig);
      if (is.objectKey<GenericConfigName>(constantOrConfig, ['name'])) {
        if (is.string(constantOrConfig.name)) {
          this.set(constantOrConfig.name);
        }
      }
    }
  }

  public config(config: ConfigName): this {
    if (is.object(this.detect)) {
      if (is.string(config.prefix)) {
        this.detect.prefix(config.prefix);
      }
      if (is.string(config.suffix)) {
        this.detect.suffix(config.suffix);
      }
    }
    return this;
  }

  public set(name: string): this {
    if (is.instance(this.#constant, ConstantName)) {
      throw new Error(`Name ${this.#constant.get} is readonly`);
    }
    this.#generic.set(name);
    return this;
  }
}
