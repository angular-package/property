import { DataDescriptors } from '../lib/data-descriptors.class';
import { ObjectOne, OBJECT_ONE } from '../../test/variables/object.const';
import { FALSE, TRUE } from '../../test/variables/boolean.const';
import { DATA_DESCRIPTOR } from '../lib/data-descriptor.const';

describe(DataDescriptors.name, () => {
  // Variables.
  let dataDescriptors: DataDescriptors<string | undefined>;
  const STRING = 'Bla';

  // Before.
  beforeEach(() => dataDescriptors = new DataDescriptors());
  // Defined.
  it('is defined', () => expect(dataDescriptors).toBeDefined());


  it(`default descriptor`, () => expect(dataDescriptors.set({ writable: true, value: undefined }).get).toEqual(DATA_DESCRIPTOR));

  it(`set method`, () => {
    dataDescriptors.set({
      configurable: false,
      enumerable: true,
      writable: false,
      value: STRING
    });

    expect(dataDescriptors.get.configurable).toBe(FALSE);
    expect(dataDescriptors.get.enumerable).toBe(TRUE);
    expect(dataDescriptors.get.writable).toBe(FALSE);
    expect(dataDescriptors.get.value).toBe(STRING);
  });

  it(`define property with data descriptor`, () => {
    dataDescriptors.set({
      configurable: false,
      enumerable: true,
      writable: false,
      value: STRING
    });

    expect(dataDescriptors.get.configurable).toBe(FALSE);
    expect(dataDescriptors.get.enumerable).toBe(TRUE);
    expect(dataDescriptors.get.writable).toBe(FALSE);
    expect(dataDescriptors.get.value).toBe(STRING);

    const newObject: { prop: string } & ObjectOne = Object.defineProperty({ ...{}, ...OBJECT_ONE }, 'prop', dataDescriptors.get);
    expect(newObject.prop).toEqual(STRING);

    // Object.defineProperty(OBJECT_ONE, 'data', dataDescriptors.get);
    // console.log(newObject.data);

    // getter.
    // expect(newObject.data).toEqual(STRING);

    // setter.
    // OBJECT_ONE[1030405027] = 'key is not number';
    // expect(OBJECT_ONE.test).toEqual('key is not number');
  });
});
