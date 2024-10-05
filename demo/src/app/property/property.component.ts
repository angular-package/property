import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

// Property.
import { Property } from '../@property/lib';

// Descriptor.
import { Descriptor } from '../@property/descriptor';

// Class.
import { AccessorDescriptors } from '../@property/descriptor/lib/accessor-descriptors.class';

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

  constructor(public appService: AppService) {
    this.set('a');
  }

  public set(name: string) {
    console.log(`set()`, this.title, arguments);
  }

  ngOnInit(): void {
    // get
    // console.log(Descriptor.get(this, 'title'));

    // getAll
    // console.log(Descriptor.getAll(this));

    // pick
    // console.log(Descriptor.pick(this, 'title', 'age'));

    // define property with data descriptor
    // console.log(Property.define(this, 'birthday', {configurable: true, value: 1981}))

    // define property with accessor descriptor
    // console.log(Property.define(this, 'active', undefined, {
    //   get(): number {
    //     return this.age;
    //   },
    //   set(age: number) {
    //     this.age = age;
    //   }
    // }))

    this.active = 37;


    // console.log(Property.set(this, 'active', 47))

    const pick = Property.pick(this, 'title', 'active');

    // console.log(pick);

  }
}

