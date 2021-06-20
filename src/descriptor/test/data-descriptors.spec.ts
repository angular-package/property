import { DataDescriptors } from '../lib/data-descriptors.class';
import { ObjectOne, OBJECT_ONE } from '../../test/variables/object.const';
import { FALSE, TRUE } from '../../test/variables/boolean.const';

describe(DataDescriptors.name, () => {
  // Constants.
  const STRING = 'Bla';

  // Variables.
  let dataDescriptors: DataDescriptors<string | undefined>;
  let OBJECT_ONE_CLONE: ObjectOne;

  // Before.
  beforeEach(() => (dataDescriptors = new DataDescriptors()));
  beforeEach(() => OBJECT_ONE_CLONE = { ...{}, ...OBJECT_ONE });

  // Defined.
  it('is defined', () => expect(dataDescriptors).toBeDefined());

  it(`default descriptor`, () =>
    expect(
      dataDescriptors.set({ writable: true, value: undefined }).get
    ).toEqual({
      configurable: true,
      enumerable: true,
      writable: true,
      value: undefined,
    }));

  it(`set method`, () => {
    dataDescriptors.set({
      configurable: false,
      enumerable: true,
      writable: false,
      value: STRING,
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
      value: STRING,
    });

    expect(dataDescriptors.get.configurable).toBe(FALSE);
    expect(dataDescriptors.get.enumerable).toBe(TRUE);
    expect(dataDescriptors.get.writable).toBe(FALSE);
    expect(dataDescriptors.get.value).toBe(STRING);

    const newObject: { prop: string } & ObjectOne = Object.defineProperty(
      OBJECT_ONE_CLONE,
      'prop',
      dataDescriptors.get
    );
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
