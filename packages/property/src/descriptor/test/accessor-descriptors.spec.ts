// 
import { AccessorDescriptors } from '../lib/accessor-descriptors.class';
// Variables.
import { ObjectOne, OBJECT_ONE } from '../../test/variables/object.const';
import { FALSE } from '../../test/variables/boolean.const';

describe(AccessorDescriptors.name, () => {
  // Variables.
  let accessorDescriptors: AccessorDescriptors<string, ObjectOne>;

  // Before.
  beforeEach(() => accessorDescriptors = new AccessorDescriptors());
  // Defined.
  it('is DEFINED', () => expect(accessorDescriptors).toBeDefined());

  it('set method', () => {
    accessorDescriptors.set({
      configurable: false,
      enumerable: false,
      get(): string {
        return this[1030405027];
      },
      set(value: string): void {
        this[1030405027] = value;
      }
    });
    const TEST: ObjectOne = { ...{}, ...OBJECT_ONE };
    Object.defineProperty(TEST, 'test', accessorDescriptors.get);
    expect(accessorDescriptors.get.configurable).toBe(FALSE);
    expect(accessorDescriptors.get.enumerable).toBe(FALSE);

    // getter.
    expect(TEST.test).toEqual('key is number');

    // setter.
    TEST[1030405027] = 'key is not number';
    expect(TEST.test).toEqual('key is not number');
  });
});

