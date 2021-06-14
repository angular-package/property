// Function to test.
import { getExistProperty } from '../lib/get-exist-property.function';
// Object.
import { OBJECT_ONE, OBJECT_TWO, ObjectOne } from './variables/object.const';
import { TRUE } from './variables/boolean.const';
/**
 * Test `getExistProperty()` function.
 */
describe(getExistProperty.name, () => {
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
        expect(getExistProperty(OBJECT_ONE, 'key as string')).toEqual(TRUE);
        expect(getExistProperty(OBJECT_TWO, 'x')).toEqual('One Two Three');
      });

      it('when OBJECT_ONE does not exist and the default callback throws an error', () => {
        const TEMP = { ...{}, ...OBJECT_ONE };
        try {
          getExistProperty(removeObject(TEMP), property);
        } catch (error) {
          expect(error.message).toContain('Object with the specified key does not exist');
        }
      });

      it('when OBJECT_ONE property does not exists and the default callback throws an error', () => {
        updateProperty(OBJECT_ONE, property);
        try {
          const get = getExistProperty(OBJECT_ONE, property);
        } catch (error) {
          expect(error.message).toContain('Object with the specified key does not exist');
        }
      });
    });

    it('when OBJECT_ONE exists but its property does not exist and custom callback does not throw an error', () => {
      updateProperty(OBJECT_ONE, property);
      getExistProperty(OBJECT_ONE, property, (result: boolean, value: any) => {
        expect(result).toBeFalse();
        expect(value[property]).toBeUndefined();
        return result;
      });
    });

  });
});
