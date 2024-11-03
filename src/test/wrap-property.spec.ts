import { PropertyWrapper, WrapProperty } from '../lib';
import { GetterCallback, PrototypeOf, SetterCallback } from '../type';


/**
 * Check.
 */
export class ClassB {
  public firstname = "Name";
  public surname = "SurName";

  #age = 27;
  public set age(value: number) {
    this.#age = value;
  }
  public get age() {
    return this.#age;
  }

  methodA() {
    return "methodA";
  }
}

// Wrap property in class.
// new WrapProperty(ClassB, "firstname", {
//   set(value: string) {
//     console.log(`set`, value);
//   },
//   beforeGet(key, instance) {
//     (this as any)[`$${key}`];
//     console.log(`instance`, key, this, instance);
//   },
// });

// new WrapProperty(ClassB, "firstname", {
//   set(value: string) {
//     console.log(`set 1`, value);
//   },
//   beforeGet(key, instance) {
//     (this as any)[`$${key}`];
//     console.log(`instance 1`, key, this, instance);
//   },
// });


const classB = new ClassB();

// PropertyWrapper
// new PropertyWrapper(classB, "firstname").wrap(
//   "firstname",
//   function(key, instance) {
//     console.log(`instance`, key, this, instance);
//     return this.age as any;
//   }, function(value){ 
//     console.log(`set value:`, this);
//   }
// );

// new PropertyWrapper(classB, "firstname").wrap(
//   "firstname",
//   function(key, instance) {
//     console.log(`1 instance`, key, this, instance);
//     return this.age as any;
//   }, function(value){ 
//     console.log(`1 set value:`, this);
//   }
// );

// Wrap property in class instance.
new WrapProperty(classB, "firstname", {
  set(value) {
    console.log(`1. set: `, value);
  },
  // beforeGet(key, instance) {
  //   console.log(`before instance`, this, instance);
  //   return null as any;
  // },
  get(key, instance) {
    console.log(`1. get: '17' `, this, instance);
    return '17';
  }
});

new WrapProperty(classB, "firstname", {
  set(value) {
    console.log(`2. set: `, value);
  },
  // beforeGet(key, instance) {
  //   console.log(`before 1 instance`, this, instance);
  //   return null as any;
  // },
  get(key, instance) {
    console.log(`2. get: '27'`, this, instance);
    return '27';
  }
});

new WrapProperty(classB, "firstname", {
  set(value) {
    console.log(`3. set:`, value);
  },
  beforeGet(key, previousGet, value, instance) {
    console.log(`3. beforeGet: `, previousGet, value, key, this, instance);
    return previousGet;
  },
  get(key, instance) {
    console.log(`3. get: '37'`, this, instance);
    // return (this as any)[`$${key}`];
    return "aaaaa";
  }
});

new WrapProperty(classB, "firstname", {
  set(value) {
    console.log(`4. set:`, value);
  },
  beforeGet(key, previousGet, value, instance) {
    console.log(`4. beforeGet:`, previousGet, value, this, instance);
    return value;
  },
  get(key, instance) {
    console.log(`4. get: '47' `, this, instance);
    return '47';
  }
});

// (classB as any).__proto__.a$firstname = false;
classB.firstname = "test";
// classB.firstname = "test1";

console.log(classB);

