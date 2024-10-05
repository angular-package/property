import { Property } from '../lib/property.class';
import { Descriptor } from '../descriptor/lib/descriptor.class';
/**
 *
 */
class ExampleComponent {
  public set surname(surname: string) {
    this.#surname = surname;
  }
  public get surname(): string{
    return this.#surname;
  }

  public firstname = 'my name';

  public age = 35;

  #surname = 'Surname';

  public service = {
    firstname: '',
    surname: '',
  };

  constructor() {}

  public method(firstname: string, surname: string): string {
    this.firstname = firstname;
    this.surname = surname;
    return this.firstname;
  }
}

const exampleComponent = new ExampleComponent();

// console.log(Object.getOwnPropertyDescriptors(exampleComponent));
// console.log(Descriptor.getAll(exampleComponent));
// console.log(Descriptor.get(exampleComponent, 'age'));


console.log(new Property(exampleComponent));

