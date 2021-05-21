import { Property } from '../lib/property.class';

describe(Property.name, () => {
  // Defined.
  it('is DEFINED', () => expect(Property).toBeDefined());

/*
  it(`constant name`, () => {

  });

  it(`generic name`, () => {
    new Property({
      prefix: '$$'
    }).get;
  });

  const bla =
  bla.name(name => {
    name.set('x');
    console.log(name.generate);
  });
*/
});

/*
interface Person {
  $$age__: number;
  $$firstName__: string;
  firstName: string;
  surname: string;
}

const PERSON: Person = {
  $$age__: 27,
  $$firstName__: 'Ścibor',
  firstName: 'Aaa',
  surname: 'Bbb'
};

const prop: Property = new Property({
  name: 'age',
  prefix: '$$',
  suffix: '__'
});
// prop.#name.set('firstName');
const blaBla = new Property('my');
blaBla.name(name => {
  console.log(name.generate);
});
const bla = new Property({
  prefix: '$$'
});
bla.name(name => {
  name.set('CONSTANT_NAME');
  console.log(name.generate);
});


// console.log(prop.get(PERSON));


// prop.set<Person, 'firstName'>(PERSON, 'firstName', 'Seebor');
// console.log(PERSON, prop.get<Person, 'firstName'>(PERSON, 'firstName'));
*/
