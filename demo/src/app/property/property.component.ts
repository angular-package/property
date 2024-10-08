import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

// Property.
import { Property } from '../@property/lib';

// Descriptor.
import { Descriptor } from '../@property/descriptor';

// Objects.
import { Obj, Objects } from '../@property/object';

// Class.
import { AccessorDescriptors } from '../@property/descriptor/lib/accessor-descriptors.class';

new Objects({});

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss'],
  providers: [
    AppService
  ]
})
export class PropertyComponent implements OnInit {
  public title = 'title';
  public age = 27;
  public active: number = 13;
  public test = 37;

  constructor(public appService: AppService) {
    this.obj();
  }

  /**
   * Example usage of `AccessorDescriptors`.
   */
  public accessor() {
  }

  /**
   * Example usage of `DataDescriptors`.
   */
  public data() {
  }

  /**
   * Example usage of `Obj`.
   */
  public obj() {
    // Create new instance of `Obj`.
    const obj = new Obj(
      // Object to perform property wrap.
      { number: 27, string: 'string', language: ['polish', 'english'], $number: 0 },

      // Properties to store original setter/getter descriptor in `PropertyWrapper` instance.
      // If empty, then all property descriptors of the given object are stored.
      'number', 'language', 'string'
    );

    // Access to property class by `property` accessor.
    console.log(`obj.property `, obj.property);

    // Access to object stored in `Obj`.
    console.log(`obj.get `, obj.get);
    console.log(`obj.property.object `, obj.property.object);

    // Set property by using `setProperty()` and `set()` methods, and get property by using `getProperty()` and `get()` methods.
    obj.setProperty('number', 37);
    console.log(`obj.getProperty('number') `, obj.getProperty('number')); // 37

    obj.property.set('number', 47);
    console.log(`obj.property.get('number') `, obj.property.get('number')); // 47

    // Check whether obj has property.
    console.log(`obj.hasOwnProperty('number') `, obj.hasOwnProperty('number')); // true

    // Wrap property `number` to bind it with `$number`.
    obj.property.wrap(
      'number',

      // Define getter.
      function(key, instance){
        // key = 'number'
        // instance = this
        console.log(`getter:`, this); // Context this of the initialized object.
        return this.$number;
      },

      // Define setter.
      function(value, oldValue, key, instance){
        // oldValue is a previous value
        // key = 'number'
        // instance = this
        console.log(`setter: `, this); // Context this of the initialized object.
        this.$number = value;
      }
    );

    // Check if `number` property is connected with `$number`.
    // Set property.
    obj.get.number = 15; // By object.
    obj.setProperty('number', 27); // By method.

    // Check by get method and object.
    console.log(obj.get.number, obj.getProperty('number')); // 27 27

    // Check obj.
    console.log(obj);
  }

  /**
   * Example usage of `Property`.
   */
  public property() {
  }

  public object() {
    // const o = new Objects({
    //   math: {a: 1, b: 2},
    //   calc: {c: 3, d: 4}
    // });
    // o.setProperty('math', 'a', 2);
    // o.getProperty('math', 'b');
    // console.log(o.getObj('calc').get?.d);
    
  }

  ngOnInit(): void {
    // console.log(`AccessorDescriptors.define()`, AccessorDescriptors.define(
    //   {configurable: false, enumerable: false, error: false} as any,
    //   (result, value) => (console.log(`accessor define:`, result, value), result)
    // ));

    // // console.log(`AccessorDescriptors.define()`, AccessorDescriptors.define([1, 2, 3] as any));

    // // get
    // console.log(`Descriptor.get()`, Descriptor.get(this, 'title'));
    // console.log(`Descriptor.get()`, Descriptor.get(Object.create({a: 1, b: 2}) as {a: 1, b: 2}, 'a'));
    // // fromProperty
    // console.log(`Descriptor.fromProperty()`, Descriptor.fromProperty(this, 'active'));
    // console.log(`Descriptor.fromProperty()`, Descriptor.fromProperty(Object.create({a: 1, b: 2}) as {a: 1, b: 2}, 'a'));

    // // getAll
    // console.log(`Descriptor.getAll()`, Descriptor.getAll(this));
    // // fromObject
    // console.log(`Descriptor.getAll()`, Descriptor.fromObject(this));

    // // pick
    // console.log(`Descriptor.pick()`, Descriptor.pick(this, 'title', 'age'));

    // // define()
    // console.log(`Property.define()`, );

    // // assign
    // // console.log(`Object.defineProperty()`, Object.defineProperty(this, Property.define('test', {'value': 1, 'writable': true, 'enumerable': true})));

    // // define property with data descriptor
    // console.log(`Property.defineInObject()`, Property.define(this, 'birthday', {configurable: true, value: 1981}))

    // // define property with accessor descriptor
    // console.log(`Property.defineInObject()`, Property.define(this, 'active', undefined, {
    //   get(): number {
    //     return this.age;
    //   },
    //   set(age: number) {
    //     this.age = age;
    //   }
    // }))

    // this.active = 37;


    // console.log(`Property.set()`, Property.set(this, 'active', 47))

    // const pick = Property.pick(this, 'title', 'active');

    // console.log(pick);

    // // const descriptor = new Descriptor({configurable: true, enumerable: false, value: 27});
    // // console.log(`descriptor`, descriptor);
    // // console.log(`get.accessor`, descriptor.get.accessor);
    // // console.log(`get.data`, descriptor.get.data);
    // // console.log(`get.accessor`, descriptor.set.accessor);
    // // console.log(`get.data`, descriptor.get.data);

    // // const a = new Object({a: 1, b: 2});

    // const obj = new Obj({a: 1, b: 2, test: 37});

    // /**
    //  * Wrap and unwrap.
    //  */
    // // Wrap.
    // obj.property.wrap('a',
    //   function(key, instance){ console.log(`this get`, this, instance); return this.test; },
    //   function(value, oldValue, key, instance) { console.log(`this`, value, oldValue, key, this, instance); this.test = value; }
    // );
  
    // // Define property.
    // obj.property.define('new', { value: 1 });

    // // Set in object wrapped property.
    // obj.property.set('a', 7);

    // /**
    //  * Activate and deactivate.
    //  */
    // obj.property.deactivate('getter', 'a').deactivate('setter', 'a');

    // obj.property.set('a', 27);

    // // console.log(obj.property.isActive('getter', 'a'));

    // console.log(`teeest: `, obj.property.object.a);

    // // Unwrap wrapped property.
    // // obj.property.unwrap('a');

    // // Not set in `test` property.
    // // obj.property.set('a', 47);

  
    // // Define property.
    // // console.log(Object.assign(obj, {a: 7}));

    // console.log(obj);
  }
}
