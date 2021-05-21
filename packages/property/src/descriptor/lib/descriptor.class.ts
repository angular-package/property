// @angular-package
import { Func, is, guard, ResultCallback, Key } from '@angular-package/type';
// Classes.
import { AccessorDescriptors } from './accessor-descriptors.class';
import { DataDescriptors } from './data-descriptors.class';
// Interfaces.
// import { UnifiedDescriptor } from '../interface/unified-descriptor.interface';
import { AccessorDescriptor } from '../interface/accessor-descriptor.interface';
import { DataDescriptor } from '../interface/data-descriptor.interface';
import { GenericObject } from '../../interface/generic-object.interface';
import { PickDescriptor } from '../interface/pick-descriptor.interface';
// Types.
// import { IsObject } from '@angular-package/type/is/type/is-object.type';
import { AccessorThisDescriptor } from '../type/accessor-this-descriptor.type';
import { AnyDescriptor } from '../type/any-descriptor.type';
import { GetOwnDescriptor } from './get-own-descriptor.class';


export class Descriptor<Value extends any, Obj extends object> {
  // Accessor descriptor instance.
  #accessor: AccessorDescriptors<Value> = new AccessorDescriptors<Value, Obj>();
  // Data descriptor instance.
  #data: DataDescriptors<Value> = new DataDescriptors<Value>();
  // getOwn descriptor.
  #getOwn: GetOwnDescriptor<Obj> = new GetOwnDescriptor();
  // Get accessor or data descriptor depends on an existing instance.
  get get(): PickDescriptor<Value, Obj> {
    return {
      accessor: this.#accessor.get,
      data: this.#data.get,
      own: this.#getOwn
    };
  }

  /**
   * Creates instance.
   * @param descriptor Accessor or data descriptor to set.
   */
  constructor(descriptor?: AnyDescriptor<Value, Obj>) {
    if (is.object<AnyDescriptor<Value, Obj>>(descriptor)) {
      this.set(descriptor);
    }
  }

  /**
   * Set `AccessorThisDescriptor` type.
   * @param descriptor A `AccessorThisDescriptor` type value.
   * @returns this.
   */
   public accessor(descriptor: AccessorThisDescriptor<Value, Obj>): this {
    this.#accessor.set(descriptor);
    return this;
  }

  /**
   * Set `DataDescriptor` type.
   * @param descriptor A `DataDescriptor` type value.
   * @returns this.
   */
   public data(descriptor: DataDescriptor<Value>): this {
    this.#data.set(descriptor);
    return this;
  }

  /**
   * Set `AccessorThisDescriptor` or `DataDescriptor`
   * @param descriptor A `AnyDescriptor` type value.
   * @param callback
   * @returns this.
   */
   public set(descriptor: AnyDescriptor<Value, Obj>, callback?: ResultCallback): this {
    // TODO: check the value type
    if (is.objectKey<AccessorThisDescriptor<Value, Obj>>(descriptor, ['get', 'set'], callback)) {
      this.accessor(descriptor);
    } else if (is.objectKey<DataDescriptor<Value>>(descriptor, 'value')) {
      this.data(descriptor);
    }
    return this;
  }
}

class Person {
  #firstName = '';
  #surname = 'bla';

  age = 5;
  private city = 'Poznań';

  get _city(): string {
    return this.city;
  }

  get firstName(): string {
    return this.#firstName;
  }
  set firstName(value: string) {
    this.#firstName = value;
  }
  get surname(): string {
    return this.#surname;
  }
  set surname(value: string) {
    this.#surname = value;
  }
}

const p: Person = new Person();

const descriptoR: Descriptor<string, Person> = new Descriptor();
console.log(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(p)));
console.log(descriptoR.get.own.property('firstName'));

// public type<Type = TypeDescriptor<ValueType>>(): Type {
//   if (is.object<Type>(this.accessor$$)) {
//     return this.accessor$$.get as Type;
//   } else if (is.object<Type>(this.value$$)) {
//     return this.value$$.get as Type;
//   }
// }

export function Lookup<Obj extends object>(property: keyof Obj): Func {
  return (component: Obj): any => {
    const descriptor: GetOwnDescriptor<Obj> = new GetOwnDescriptor();
    // console.log(`Lookup is class: `, is.class(component));
    // console.log(`Lookup: `, descriptor.property(property, component));
  };
}

  // /**
  //  * Return an object property descriptor.
  //  * @param object Generic `Obj` type value that contains `property`.
  //  * @returns An object properties descriptors.
  //  */
  //  public object<O extends Obj>(object: O): {[P in keyof O]: TypedPropertyDescriptor<O[P]>} & { [x: string]: PropertyDescriptor } {
  //   const detectedObject: O = is.function(object) ? object.prototype : is.object<O>(object) ? object : undefined ;
  //   return Object.getOwnPropertyDescriptors<O>(detectedObject);
  // }

  // /**
  //  * Return object property descriptor.
  //  * @param object Generic `Obj` type value that contains the `key`.
  //  * @param key A `Key` type name of the property that `object` contains.
  //  * @returns A `PropertyDescriptor` type.
  //  */
  //  public property(object: Obj, key: Key): PropertyDescriptor | undefined {
  //   const detectedObject: Func | Obj = is.function(object) ? object.prototype : is.object<Obj>(object) ? object : undefined ;
  //   return !is.undefined(detectedObject)
  //     ? guard.is.key(key)
  //       ? Object.getOwnPropertyDescriptor(detectedObject, key)
  //     : undefined
  //   : undefined;
  // }
