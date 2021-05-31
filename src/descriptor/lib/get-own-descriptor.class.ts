// @angular-package/type
import { Key, guard, ResultCallback, Func, is } from '@angular-package/type';
// Class.
import { Objects } from '../../objects.class';
import { ObjectPropertyDescriptors } from '../type/object-property-descriptors.type';

export class GetOwnDescriptor<Obj extends object> {
  protected objects: Objects<Obj> = new Objects();

  public object<O extends Obj>(object: O): this {
    this.objects.set(object);
    return this;
  }

  /**
   * Return an object property descriptor.
   * @param object Generic `Obj` type value that contains `property`.
   * @returns An object properties descriptors.
   */
  public properties<O extends Obj>(object?: O): ObjectPropertyDescriptors<O> | undefined {
    if (guard.is.defined(object)) {
      return Object.getOwnPropertyDescriptors<O>(this.objects.detect<O>(object));
    }
    console.log(this.objects.get);
    return Object.getOwnPropertyDescriptors<O>(this.objects.get);
  }

  /**
   * Return object property descriptor from detected object.
   * @param object Generic `Obj` type value that contains the `key`.
   * @param key A `keyof Obj` type name of the property.
   * @returns A `PropertyDescriptor` type.
   */
  public property<O extends Obj>(key: keyof O, object?: O, callback?: ResultCallback): PropertyDescriptor | undefined {
    if (guard.is.defined(object)) {
      // if (guard.is.objectKey<O>(object, key, callback)) { } // TODO: consider use
      return Object.getOwnPropertyDescriptor(this.objects.detect<O>(object), key);
    }
    if (guard.is.object<Obj>(this.objects.get)) {
      console.log(this.objects.get, key);
      return Object.getOwnPropertyDescriptor(this.objects.get, key);
    }
    return;
  }
}
