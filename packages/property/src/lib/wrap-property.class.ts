
export class WrapProperty<Type = any> {

  /**
   * Wrapper for source object property.
   * @param source Source object as decorator function or component type to wrap properties.
   * @param key Source object property key to wrap value.
   * @param getterCallback Function to wrap source property getter.
   * @param setterCallback Function to wrap source property setter.
   */
  // public wrap<Source, Key extends keyof Source>(
  //   source: Source,
  //   key: Key,
  //   getterCallback?: GetterCallback<Source, Key>,
  //   setterCallback?: SetterCallback<Source, Key>
  // ): this {
  //   if (is.object<Source>(source)) {
  //     // Use key as string.
  //     const property: string = key.toString();
  //     if (guard.is.string(property)) {
  //       if (this.wrapped$$ instanceof Array && this.wrapped$$.includes(key) === false) {
  //         // Store original property getter and setter.
  //         const stored = new StoreOriginalClass().properties(property, source);
  //         // Create property with prefix and suffix to be wrapped by original name.
  //         const privatePropertyName = property; // this.name.generate(property);
  //         // Wrap property.
  //         if (is.string(privatePropertyName)) {
  //           Object.defineProperties(is.function(source) ? source.prototype : source, {
  //             [privatePropertyName]: {
  //               writable: true,
  //               value: (is.function(source) ? source.prototype : source)[key]
  //             }
  //           });
  //           Object.defineProperties(is.function(source) ? source.prototype : source, {
  //             [key]: {
  //               configurable: true,
  //               get(): Source[Key] {
  //                 // Custom getter.
  //                 if (is.object<GetterCallback<Source, Key>>(getterCallback)) {
  //                   getterCallback(key, this);
  //                 }
  //                 // Perform stored getter.
  //                 if (stored.getter[property]) {
  //                   return stored.getter[property].apply(this, arguments);
  //                 }
  //                 if (this[privatePropertyName]) {
  //                   return this[privatePropertyName];
  //                 }
  //               },
  //               set(value: Source[Key]): void {
  //                 const oldValue = this[privatePropertyName];
  //                 // Remember input value.
  //                 this[privatePropertyName] = value;
  //                 // Perform stored setter.
  //                 if (stored.setter[property]) {
  //                   stored.setter[property].apply(this, arguments);
  //                 }
  //                 // Use custom setter.
  //                 if (is.object<SetterCallback<Source, Key>>(setterCallback)) {
  //                   setterCallback(value, oldValue, this);
  //                 }
  //               }
  //             }
  //           });
  //           this.wrapped$$.push(key);
  //         } else {
  //           throw new Error(`Problem: const \`privatePropertyName\`: ${privatePropertyName} must be \`string\` type`);
  //         }
  //       }
  //     } else {
  //       throw new Error(`Problem: Argument \`key\`: ${key} must be \`Key\` type`);
  //     }
  //   } else {
  //     throw new Error(`Problem: Argument \`source\`: ${source} must be \`Source\` type`);
  //   }
  //   return this;
  // }
}
