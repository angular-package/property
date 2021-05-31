import { guard, is, ResultCallback } from '@angular-package/type';

export class BindProperty<Type = any> {

  #name = '';
  #source: any;
  #target: any;

  constructor(name: string) {

  }

  public name(name: string): this {
    if (guard.is.string(name)) {
      this.#name = name;
    }
    return this;
  }

  public source<Source>(source: Source): this {
    this.#source = is.function(source) ? source.prototype : is.object<Source>(source) ? source : undefined;
    return this;
  }

  public target<Target>(target: Target): this {
    this.#target = is.function(target) ? target.prototype : is.object<Target>(target) ? target : undefined;
    return this;
  }

  public bind(): this {
    Object.defineProperty(this.#source, this.#name, {
      get() {
        
      }
    });
    return this;
  }
}

// const bindProperty = <Source, Target>(source: Source, target: Target) => {
//   Object.
// };

// import { Injectable } from '@angular/core';

// // internals
// import { NameProperty } from '../../name/lib/name-property.class';
// import { propertySet } from '../../lib/property-set.function';
// import { propertyGet } from '../../lib/property-get.function';

// // @angular-package/type
// import { Func, guard, is } from '@angular-package/type';
// import { Descriptor } from '../../descriptor/lib/descriptor.class';
// import { VALUE_DESCRIPTOR } from '../../descriptor/lib/value-descriptor.const';

// @Injectable()
// export class PropertyBindClass<From, To> {

//   // private bound$$ = [];
//   private from$$: {
//     object: From;
//     property: string;
//   } = { object: undefined, property: undefined };
//   private to$$: {
//     object: To;
//     property: string;
//   } = { object: undefined, property: undefined };

//   constructor(
//     protected name$?: string,
//     public propertyDescriptor?: any // Descriptor
//   ) {
//     // if (is.instance<Descriptors>(propertyDescriptor, Descriptor) === false) {
//     //   this.propertyDescriptor = new Descriptor();
//     // }
//   }

//   public execute(): void {
//     this.bind();
//   }

//   public from<Obj = From>(object: Obj, property: string = this.name$): this {
//     this.from$$.object = is.function(object) ? object.prototype : is.object<Obj>(object) ? object : undefined;
//     this.from$$.property = is.string(property) ? property : this.name$;
//     return this;
//   }

//   public to<Obj = To>(object: Obj, property: string = this.name$): this {
//     this.to$$.object = is.function(object) ? object.prototype : is.object<Obj>(object) ? object : undefined;
//     this.to$$.property = is.string(property) ? property : this.name$;
//     return this;
//   }

//   public bind(from: From = this.from$$.object, to: To = this.to$$.object): this {
//     // Get descriptor key from source object.
//     const descriptor: PropertyDescriptor = this.propertyDescriptor.getOwn(this.from$$, this.name$);
//     const fromProperty: string = this.from$$.property;
//     const toProperty: string = this.to$$.property;
//     Object.defineProperty(from, fromProperty, Object.assign(VALUE_DESCRIPTOR, {
//       get(): any {
//         if (is.function(descriptor?.get)) {
//           descriptor.get.apply(this, arguments);
//         }
//         return propertyGet<To, any>(to, toProperty);
//       },
//       set(value: any): void {
//         if (is.function(descriptor?.set)) {
//           descriptor.set.apply(this, arguments);
//         }
//         propertySet<To, any>(to, toProperty, value);
//       }
//     }));
//     delete this.from$$;
//     delete this.to$$;
//     return this;
//   }
//   /**
//    * Bind One or Many properties from object to object.
//    * @param source Source object properties to bind.
//    * @param target Target name or object where source properties are bound to.
//    * @param properties Names to bind.
//    */
//   // public bind<Source = From, Target = string>(source: Source, target: Target, properties: Array<string> = this.properties): this {
//   //   if (is.array(properties)){
//   //     properties.forEach(name => this.bind$$<any, Source, Target>(name, source, target));
//   //   } else {
//   //     throw new Error(`Argument \`properties\`: ${properties} must be \`Array<string>\` type`);
//   //   }

//   //   return this;
//   // }
//     //  if (is.object<Source>(source)) {
//     //    // Use key as string.
//     //     const property: string = key.toString();
//     //     if (is.primitive<string>(property, 'string')) {
//     //     }
//     // } else {
//     //   throw new Error(`Argument(\`source\`): is undefined`);
//     // }


//         // if (this.bound$$ instanceof Array && this.bound$$.includes(key) === false) {

//         //   Object.defineProperties(detectedObject, {
//         //     [property]: {
//         //       get(): Source[Key] {
//         //       },
//         //       set(value: Source[Key]): void {
//         //       }
//         //     }
//         //   });
//         //   // this.bound$$.push(property);
//         // }

// }
