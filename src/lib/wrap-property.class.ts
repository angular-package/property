// Class.
import { Descriptors } from '../descriptor/lib/descriptors.class';
// Type.
import { GetterCallback } from '../type/getter-callback.type';
import { SetterCallback } from '../type/setter-callback.type';
/**
 *
 */
export class WrapProperty<
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

  /**
   *
   */
  #descriptors: Descriptors<Obj, Names>;

  /**
   *
   */
  #object: Obj;

  /**
   *
   */
  #wrapped: Set<Names> = new Set();

  /**
   *
   */
  #wrappedValues: Map<Names, any> = new Map();

  /**
   *
   * @param object
   * @param names
   * @angularpackage
   */
  constructor(object: Obj, ...names: Names[]) {
    this.#object = object;
    this.#descriptors = new Descriptors(object, ...names);
  }

  /**
   *
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
   *
   * @param names
   * @returns
   * @angularpackage
   */
  public unwrap(...names: Names[]): this {
    Array.isArray(names) &&
      names.forEach(
        (name) => (
          // Remove from the #wrapped storage.
          this.#wrapped.delete(name),
          Object.defineProperty(this.#object, name, {
            ...this.#descriptors.get(name),
          })
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
    const wrapPropertyInstance = this;
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
          configurable: true,
          // If true then Maximum call exceeded.
          enumerable: false,
          get(): Obj[Name] {
            // Prepare variable to return.
            let result;
            // Perform stored getter.
            wrapPropertyInstance.descriptors.has(name) &&
              wrapPropertyInstance.descriptors
                .get(name)
                ?.get?.apply(this, arguments as any);

            // Custom getter.
            typeof getterCallback === 'function' &&
              (result = getterCallback.apply(this, [name, this]));

            // Returns the value.
            return result || wrapPropertyInstance.wrappedValues.get(name);
          },
          set(value: Obj[Name]): void {
            // Store the old value to pass to setterCallback.
            const oldValue = wrapPropertyInstance.wrappedValues.get(name);
            // Perform stored setter.
            wrapPropertyInstance.descriptors.has(name) &&
              wrapPropertyInstance.descriptors
                .get(name)
                ?.set?.apply(this, arguments as any);
            // Set the value.
            wrapPropertyInstance.wrappedValues.set(name, value);
            // Use custom setter.
            typeof setterCallback === 'function' &&
              setterCallback.apply(this, [value, oldValue, name, this])
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
