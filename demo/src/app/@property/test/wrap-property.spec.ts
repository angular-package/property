import { Component, ChangeDetectorRef } from '@angular/core';
import { WrapProperty } from '../lib/wrap-property.class';

@Component({
  selector: 'lib-selector',
})
@ChangeDetection('firstname', 'surname')
class ExampleComponent {
  public set surname(surname: string | undefined) {
    this.#surname = surname;
  }
  public get surname(): string | undefined {
    return this.#surname;
  }

  public firstname = 'my name';

  public age = 35;

  #surname?: string;

  public service = {
    firstname: '',
    surname: '',
  };

  constructor() {}

  @ExampleMethodDecorator('firstname')
  public method(firstname: string, surname: string): string {
    this.firstname = firstname;
    this.surname = surname;
    return this.firstname;
  }
}

// const a = new ExampleComponent();

// a.age = 123;
// console.log(a.age);
// console.log(a.age);
// console.log(a.age);

// a.method('a', 'b');

// new WrapProperty(a, 'age', 'firstname')
//   .wrap(a, 'age', (property, instance) => {
//     console.log(`getter: `, property, instance);
//   }, (value, oldValue, instance) => {
//     console.log(`setter`, value, oldValue, instance);
//   });




// a.firstname = 'new name';

// a.firstname = 'second name';

// console.log(a);

// console.log(getDescriptor(a, 'age'));

// console.log(getDescriptor(a, 'surname'));

// console.log(getDescriptors(a));


export function ChangeDetection(
  ...properties: PropertyKey[]
): ClassDecorator {
  return <TFunction extends Function>(target: TFunction) => {
    // console.log(target);

    // new WrapProperty(target.prototype, 'surname',  'age' as any, 'firstname')
    // .wrap(target, 'age', (property, instance) => {
    //   console.log(`getter: `, property, instance);
    // }, (value, oldValue, instance) => {
    //   console.log(`setter`, value, oldValue, instance);
    // });

    // const prop = 'firstname';
    // new WrapProperty().wrap(
    //   target,
    //   prop as any,
    //   (key, instance) => {
    //     ((instance as any).cd as ChangeDetectorRef).detectChanges();
    //   },
    //   (value) => {
    //   }
    // );

    return target;
  };
}


export function ExampleMethodDecorator(
  param: string | Array<string>
): MethodDecorator {
  return <T>(
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> | void => {
    const originalMethod = descriptor.value;

    // console.log(target, propertyKey, descriptor);

    // descriptor.value = function (this: any): void {
    //   if (typeof param === 'string') {
    //     param = [param];
    //   }
    //   return (originalMethod as any).apply(this, arguments);
    // } as any;

    return descriptor;
  };
}
