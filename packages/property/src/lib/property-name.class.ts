// External.
import { is } from '@angular-package/type';
// Internal.
import { NameConstant } from '../name/lib/name-constant.class';
import { NameGeneric } from '../name/lib/name-generic.class';
// Interface.
import { ConfigName } from '../name/interface/config-name.interface';
import { PickName } from '../name/interface/pick-name.interface';
// Type.
import { NameType } from '../name/type/name-type.type';

export class PropertyName {
  /**
   * Properties.
   * @public
   */
  public get generate(): string {
    return this.pick?.generate || '';
  }

  public get get(): string {
    return this.pick?.name || '';
  }

  public get pick(): PickName | undefined {
    return this.detect?.pick;
  }

  /**
   * Properties.
   * @private
   */
  private get detect(): NameType | undefined {
    return this.type<NameConstant>() || this.type<NameGeneric>();
  }

  #constant?: NameConstant;
  #generic: NameGeneric = new NameGeneric();

  /**
   * Creates instance.
   * @param constantOrConfig
   * @param config
   */
  constructor(constantOrConfig?: string | ConfigName, config?: ConfigName) {
    if (is.string(constantOrConfig)) {
      this.#constant = new NameConstant(constantOrConfig, config);
    } else {
      this.#generic?.config(constantOrConfig);
    }
  }

  /**
   * Methods.
   * @public
   */
  public config(config: ConfigName): this {
    this.detect?.config(config);
    return this;
  }

  public set(name: string): this {
    if (is.instance<NameConstant>(this.#constant, NameConstant)) {
      throw new Error(`Name is readonly.`);
    }
    this.#generic.set(name);
    return this;
  }

  /**
   * Methods.
   * @private
   */
  private type<Type>(): Type | undefined {
    if (is.object<Type>(this.#constant)) {
      return this.#constant as Type;
    }
    if (is.object<Type>(this.#generic)) {
      return this.#generic as Type;
    }
    return;
  }
}
