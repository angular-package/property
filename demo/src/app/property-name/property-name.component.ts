import { Component, OnInit } from '@angular/core';
// import { PropertyName } from '../../../../packages/property/src/lib/property-name.class';
// import { Descriptor, Lookup } from '../../../../packages/property/src/descriptor/lib/descriptor.class';

@Component({
  selector: 'app-property-name',
  templateUrl: './property-name.component.html',
  styleUrls: ['./property-name.component.scss']
})
// @Lookup<PropertyNameComponent>('title')
export class PropertyNameComponent implements OnInit {

  #title = '';
  get title(): string {
    return this.#title;
  }
  set title(value: string) {
    this.#title = value;
  }

  // Constant.
  // public title: NameProperty = new NameProperty('title');
  // set constantPrefix(value: string) {
  //   this.title.constant.Prefix(value);
  // }
  // get constantPrefix(): string {
  //   return this.title.constant?.prefix.get;
  // }

  // set constantSuffix(value: string) {
  //   this.title.constant.Suffix(value);
  // }
  // get constantSuffix(): string {
  //   return this.title.constant?.suffix.get;
  // }

  // set constantName(value: string) {}
  // get constantName(): string {
  //   return this.title.constant?.get;
  // }

  // // Generic.
  // public genericProperty: NameProperty = new NameProperty();
  // set prefix(value: string) {
  //   this.genericProperty.generic?.Prefix(value);
  // }
  // get prefix(): string {
  //   return this.genericProperty.generic?.prefix.get;
  // }

  // set suffix(value: string) {
  //   this.genericProperty.generic.Suffix(value);
  // }
  // get suffix(): string {
  //   return this.genericProperty.generic?.suffix.get;
  // }

  // set name(value: string) {
  //   this.genericProperty.generic.set(value);
  // }
  // get name(): string {
  //   return this.genericProperty.generic?.get;
  // }

  ngOnInit(): void {
    // const nameProperty = new PropertyName();
    // const descriptor = new Descriptor<string>();
    // console.log(this);
  }
}
