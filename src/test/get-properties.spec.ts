// Function to test.
import { getProperties } from '../lib/get-properties.function';
// Constant.
import { NUMBER } from './variables/number.const';
import { ObjectOne, OBJECT_ONE } from './variables/object.const';
import { SYMBOL_NUMBER, SYMBOL_STRING } from './variables/symbol.const';
/**
 *
 */
describe(getProperties.name, () => {
  // Defined.
  it('is DEFINED', () => expect(getProperties).toBeDefined());

  describe('get from', () => {
    describe('OBJECT_ONE', () => {
      it(`'test'`, () => expect(getProperties(OBJECT_ONE, ['test']).test).toEqual(OBJECT_ONE.test));
      it(`[NUMBER]`, () =>
        expect(getProperties(OBJECT_ONE, [NUMBER])[NUMBER]).toEqual(
          OBJECT_ONE[NUMBER]
        ));
      it('[SYMBOL_NUMBER]', () =>
        expect(
          getProperties(OBJECT_ONE, [SYMBOL_NUMBER])[SYMBOL_NUMBER]
        ).toEqual(OBJECT_ONE[SYMBOL_NUMBER]));
      it('[SYMBOL_STRING]', () =>
        expect(
          getProperties(OBJECT_ONE, [SYMBOL_STRING])[SYMBOL_STRING]
        ).toEqual(OBJECT_ONE[SYMBOL_STRING]));
    });

    describe('CLASS', () => {
      it(`'test'`, () => expect(getProperties(OBJECT_ONE, ['test']).test).toEqual(OBJECT_ONE.test));
    });
  });
});
