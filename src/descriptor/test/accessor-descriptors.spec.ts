// @angular-package/type
import { is } from '@angular-package/type';
// Main class to test.
import { AccessorDescriptors } from '../lib/accessor-descriptors.class';
// Constant.
import { ObjectOne, OBJECT_ONE } from '../../test/variables/object.const';
import { TRUE } from '../../test/variables/boolean.const';

describe(AccessorDescriptors.name, () => {
  // Variables.
  let accessorDescriptors: AccessorDescriptors<string, ObjectOne>;
  let OBJECT_ONE_CLONE: ObjectOne;

  // Before.
  beforeEach(() => (accessorDescriptors = new AccessorDescriptors()));
  beforeEach(() => OBJECT_ONE_CLONE = { ...{}, ...OBJECT_ONE });

  // Defined.
  it('is DEFINED', () => expect(accessorDescriptors).toBeDefined());
  // Method.
  describe('method', () => {
    describe('static define()', () => {
      it('empty object handle error', () => {
        try {
          AccessorDescriptors.define<any, ObjectOne>({}, (result: boolean, value: any): boolean => {
            if (result === false) {
              value = is.object(value) ? JSON.stringify(value) : value;
              throw new Error(
                `Property accessor descriptor must be an \`ThisAccessorDescriptor<Value, Obj>\` type, got value ${value}`
              );
            }
            return result;
          });
        } catch (error: any) {
          expect(error.message.includes('ThisAccessorDescriptor')).toBe(TRUE);
        }
      });

      it('default configurable and enumerable', () => {
        const ACCESSOR_DESCRIPTOR = AccessorDescriptors.define<string, ObjectOne>({
          get(): string {
            return this[1030405027];
          },
        });
        expect(ACCESSOR_DESCRIPTOR?.configurable).toBe(TRUE);
        expect(ACCESSOR_DESCRIPTOR?.enumerable).toBe(TRUE);
      });

      it('set and get', () => {
        const ACCESSOR_DESCRIPTOR = AccessorDescriptors.define<string, ObjectOne>({
          configurable: false,
          enumerable: false,
          get(): string {
            return this[1030405027];
          },
          set(value: string): void {
            this[1030405027] = value;
          },
        });
        Object.defineProperty(OBJECT_ONE_CLONE, 'test', ACCESSOR_DESCRIPTOR);
        expect(OBJECT_ONE_CLONE.test).toEqual('key is number');
        OBJECT_ONE_CLONE[1030405027] = 'key is not number';
        expect(OBJECT_ONE_CLONE.test).toEqual('key is not number');
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
