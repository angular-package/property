// Function to test.
import { getExistProperty } from '../lib/get-exist-property.function';
// Object.
import { OBJECT_ONE, OBJECT_TWO, ObjectOne } from './constants/object.const';
import { TRUE } from './constants/boolean.const';
/**
 * Test `getExistProperty()` function.
 */
describe(getExistProperty.name, () => {

  let OBJECT_ONE_CLONE: ObjectOne;

  beforeEach(() => OBJECT_ONE_CLONE = { ...{}, ...OBJECT_ONE });

  const property = 'test';
  function updateProperty(value: any, key: string): ObjectOne {
    value[key] = undefined;
    delete value[key];
    return value as ObjectOne;
  }
  function removeObject(value: any): ObjectOne {
    value = undefined;
    return value;
  }

  // Defined.
  it('is DEFINED', () => expect(getExistProperty).toBeDefined());

  describe('get property', () => {

    describe('from the OBJECT_ONE', () => {

      it('when OBJECT_ONE and its property exists', () => {
        expect(getExistProperty(OBJECT_ONE_CLONE, 'key as string')).toEqual(TRUE);
        expect(getExistProperty(OBJECT_TWO, 'x')).toEqual('One Two Three');
      });

      it('when OBJECT_ONE does not exist and the default callback throws an error', () => {
        try {
          getExistProperty(removeObject(OBJECT_ONE_CLONE), property);
        } catch (error) {
          expect(error.message).toContain('Object with the specified key does not exist');
        }
      });

      it('when OBJECT_ONE property does not exists and the default callback throws an error', () => {
        updateProperty(OBJECT_ONE_CLONE, property);
        try {
          const get = getExistProperty(OBJECT_ONE_CLONE, property);
        } catch (error) {
          expect(error.message).toContain('Object with the specified key does not exist');
        }
      });
    });

    it('when OBJECT_ONE exists but its property does not exist and custom callback does not throw an error', () => {
      updateProperty(OBJECT_ONE_CLONE, property);
      getExistProperty(OBJECT_ONE_CLONE, property, (result: boolean, value: any) => {
        expect(result).toBeFalse();
        expect(value[property]).toBeUndefined();
        return result;
      });
    });

  });
});
