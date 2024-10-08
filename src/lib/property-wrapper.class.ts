// Class.
import { Descriptors } from '../descriptor/lib/descriptors.class';
// Type.
import { GetterCallback } from '../type/getter-callback.type';
import { SetterCallback } from '../type/setter-callback.type';
/**
 * Wrap and unwrap properties in `object`.
 */
export class PropertyWrapper<
  Obj extends object | Function,
  Names extends keyof Obj
> {
  /**
   *
   */
  public get descriptors(): Descriptors<Obj, Names> {
    return this.#descriptors;
  }

  /**
   * 
   */
  public get object(): Obj {
    return this.#object;
  }

  /**
   *
   */
  public get wrapped(): Set<Names> {
    return this.#wrapped;
  }

  /**
   *
   */
  public get wrappedValues(): Map<Names, any> {
    return this.#wrappedValues;
  }

  #deactivated = {
    /**
     * Deactivated from executing getter of property names.
     */
    getter: new Set<Names>(),

    /**
     * Deactivated from executing setter of property names.
     */
    setter: new Set<Names>()
  }

  /**
   *
   */
  readonly #descriptors: Descriptors<Obj, Names>;

  /**
   * Privately stored initialized object.
   */
  readonly #object: Obj;

  /**
   *
   */
  readonly #wrapped: Set<Names> = new Set();

  /**
   *
   */
  readonly #wrappedValues: Map<Names, any> = new Map();

  /**
   * Creates an instance of `WrapProperty`.
   * @param object
   * @param names
   * @angularpackage
   */
  constructor(object: Obj, ...names: Names[]) {
    this.#object = object;
    this.#descriptors = new Descriptors(this.#object, ...names);
  }

  /**
   * The method activates wrap in specified property `names`.
   * @returns The returned value is an instance of `PropertyWrapper`.
   * @angularpackage
   */
  public activate(accessor: 'getter' | 'setter', ...names: Names[]): this {
    names.forEach(name => this.#deactivated[accessor].delete(name));
    return this;
  }

  /**
   * The method deactivates wrap in specified property `names`.
   * @returns The returned value is an instance of `PropertyWrapper`.
   * @angularpackage
   */
  public deactivate(accessor: 'getter' | 'setter', ...names: Names[]): this {
    names.forEach(name => this.#deactivated[accessor].add(name));
    return this;
  }

  /**
   * The method check whether accessor of the `name` is active.
   * @param accessor The `getter` or `setter` accessor to check.
   * @param name The property name of accessor to check.
   * @returns The returned value is a `boolean` indicating whether the `name` has `getter` or `setter` accessor active.
   * @angularpackage
   */
  public isActive<Name extends Names>(accessor: 'getter' | 'setter', name: Name): boolean {
    return this.#deactivated[accessor].has(name) === false;
  }

  /**
   * The method checks whether property of `name` is wrapped.
   * @param name The property name to check.
   * @returns The returned value is a `boolean` indicating the property of `name` is wrapped.
   * @angularpackage
   */
  public isWrapped<Name extends Names>(name: Name): boolean {
    return this.#wrapped.has(name);
  }

  /**
   * The method wraps the property with getter and setter callback.
   * @param names
   * @param getterCallback
   * @param setterCallback
   * @returns
   * @angularpackage
   */
  public wrap<Name extends Names>(
    names: Name | Name[],
    getterCallback?: GetterCallback<Obj, Name>,
    setterCallback?: SetterCallback<Obj, Name>
  ): this {
    Array.isArray(names)
      ? names.forEach(name => this.#wrap(this.#object, name, getterCallback, setterCallback))
      : this.#wrap(this.#object, names, getterCallback, setterCallback);
    return this;
  }

  /**
   * The method unwrap property of `names`.
   * @param names
   * @returns
   * @angularpackage
   */
  public unwrap(...names: Names[]): this {
    Array.isArray(names) &&
      names.forEach(
        name => (
          // Remove from the #wrapped storage.
          this.#wrapped.delete(name),
          Object.defineProperty(
            this.#object,
            name,
            this.#descriptors.get(name)!
          )
        )
      );
    return this;
  }

  /**
   * TODO: Check wrapping for union types.
   * Wrapper for source object property.
   * @param object Source object as decorator function or component type to wrap properties.
   * @param name Source object property key to wrap value.
   * @param getterCallback Function to wrap source property getter.
   * @param setterCallback Function to wrap source property setter.
   * @angularpackage
   */
  #wrap<Name extends Names>(
    object: Obj,
    name: Name,
    getterCallback?: GetterCallback<Obj, Name>,
    setterCallback?: SetterCallback<Obj, Name>
  ): this {
    const propertyWrapperInstance = this;
    if (this.#wrapped.has(name) === false) {
      if (typeof object === 'object' || typeof object === 'function') {
        // If the descriptor is not already found set the original descriptor if exists.
        this.#descriptors.has(name) === false &&
          this.#descriptors.setPicked(object, name);

        // Detect source.
        const detectedSource =
          typeof object === 'function' ? object.prototype : object;

        // Sets the default value to wrapped property.
        this.#wrappedValues.set(name, detectedSource[name]);

        // Define property.
        Object.defineProperty(detectedSource, name, {
          // Configurable.
          configurable: true,

          // If true then Maximum call exceeded.
          enumerable: false,

          // Getter accessor.
          get(): Obj[Name] {
            // Perform stored getter.
            propertyWrapperInstance.descriptors.has(name) &&
              propertyWrapperInstance.descriptors
                .get(name)
                ?.get
                ?.apply(this, arguments as any);

            // Custom getter.
            return propertyWrapperInstance.isActive('getter', name)
              && typeof getterCallback === 'function'
              ? getterCallback.apply(this, [name, this])
              : propertyWrapperInstance.wrappedValues.get(name);
          },

          // Setter accessor.
          set(value: Obj[Name]): void {
            // Store the old value to pass to setterCallback.
            const oldValue = propertyWrapperInstance.wrappedValues.get(name);
            // Perform stored setter.
            propertyWrapperInstance.descriptors.has(name) &&
              propertyWrapperInstance.descriptors
                .get(name)
                ?.set
                ?.apply(this, arguments as any);
            // Set the value.
            propertyWrapperInstance.wrappedValues.set(name, value);
            // Use custom setter.
            propertyWrapperInstance.isActive('setter', name)
              && typeof setterCallback === 'function'
              && setterCallback.apply(this, [value, oldValue, name, this]);
          },
        });
        this.#wrapped.add(name);
      } else {
        throw new Error(
          `Problem: Argument \`object\`: ${object} must be generic type variable \`Obj\`.
          Quick fix: Check the passed object in the constructor.
          `
        );
      }
    } else {
      throw new Error(
        `Problem: Property \`name\`: ${String(name)} is already wrapped.`
      );
    }
    return this;
  }
}
