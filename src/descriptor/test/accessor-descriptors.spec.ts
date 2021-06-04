// Main class to test.
import { AccessorDescriptors } from '../lib/accessor-descriptors.class';
// Variables.
import { ObjectOne, OBJECT_ONE } from '../../test/variables/object.const';
import { FALSE, TRUE } from '../../test/variables/boolean.const';

describe(AccessorDescriptors.name, () => {
  // Variables.
  let accessorDescriptors: AccessorDescriptors<string, ObjectOne>;

  // Before.
  beforeEach(() => (accessorDescriptors = new AccessorDescriptors()));
  // Defined.
  it('is DEFINED', () => expect(accessorDescriptors).toBeDefined());

  describe('method', () => {
    describe('define()', () => {
      it('empty object handle error', () => {
        try {
          accessorDescriptors.define({});
        } catch (error: any) {
          expect(error.message.includes('AccessorDescriptor')).toBe(TRUE);
        }
      });

      it('default configurable and enumerable', () => {
        const ACCESSOR_DESCRIPTOR = accessorDescriptors.define({
          get(): string {
            return this[1030405027];
          },
        });
        expect(ACCESSOR_DESCRIPTOR?.configurable).toBe(TRUE);
        expect(ACCESSOR_DESCRIPTOR?.enumerable).toBe(TRUE);
      });

      it('set and get', () => {
        const ACCESSOR_DESCRIPTOR = accessorDescriptors.define({
          configurable: false,
          enumerable: false,
          get(): string {
            return this[1030405027];
          },
          set(value: string): void {
            this[1030405027] = value;
          },
        });
        const TEST: ObjectOne = { ...{}, ...OBJECT_ONE };
        Object.defineProperty(TEST, 'test', ACCESSOR_DESCRIPTOR);
        expect(TEST.test).toEqual('key is number');
        TEST[1030405027] = 'key is not number';
        expect(TEST.test).toEqual('key is not number');
      });
    });
  });
  describe('set() method', () => {
    // it('all properties', () => {
    //   accessorDescriptors.set({
    //     configurable: false,
    //     enumerable: false,
    //     get(): string {
    //       return this[1030405027];
    //     },
    //     set(value: string): void {
    //       this[1030405027] = value;
    //     }
    //   });
    //   const TEST: ObjectOne = { ...{}, ...OBJECT_ONE };
    //   Object.defineProperty(TEST, 'test', accessorDescriptors.get);
    //   expect(accessorDescriptors.get.configurable).toBe(FALSE);
    //   expect(accessorDescriptors.get.enumerable).toBe(FALSE);
    //   // getter.
    //   expect(TEST.test).toEqual('key is number');
    //   // setter.
    //   TEST[1030405027] = 'key is not number';
    //   expect(TEST.test).toEqual('key is not number');
    // });
  });
});
