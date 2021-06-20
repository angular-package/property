// Function to test.
import { getProperties } from '../lib/get-properties.function';
// Constant.
import { NUMBER } from './variables/number.const';
import { ObjectOne, OBJECT_ONE } from './variables/object.const';
import { SYMBOL_NUMBER, SYMBOL_STRING } from './variables/symbol.const';
import { CLASS } from './variables/class.const';
import { STRING } from './variables/string.const';
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
      it(`'test'`, () => expect(getProperties(CLASS, ['firstName']).firstName).toEqual(CLASS.firstName));

      it(`NUMBER ${NUMBER}`, () => expect(getProperties(CLASS, ['firstName']).firstName).toEqual(CLASS.firstName));
      it(`NUMBER ${STRING}`, () => expect(getProperties(CLASS, ['firstName']).firstName).toEqual(CLASS.firstName));

      it(`SYMBOL_NUMBER`, () => expect(getProperties(CLASS, [SYMBOL_NUMBER])[SYMBOL_NUMBER]).toEqual(CLASS[SYMBOL_NUMBER]));
      it(`SYMBOL_STRING`, () => expect(getProperties(CLASS, [SYMBOL_STRING])[SYMBOL_STRING]).toEqual(CLASS[SYMBOL_STRING]));

      it(`'firstName', 'surname', NUMBER, STRING, SYMBOL_NUMBER, SYMBOL_STRING`, () => {
        const test = getProperties(CLASS, ['firstName', 'surname', NUMBER, STRING, SYMBOL_NUMBER, SYMBOL_STRING]);
        expect(test['!@#$%^&*()abcdefghijklmnoprstuwyz']).toEqual(CLASS['!@#$%^&*()abcdefghijklmnoprstuwyz']);
        expect(test[10304050]).toEqual(CLASS[10304050]);
        expect(test.firstName).toEqual(CLASS.firstName);
        expect(test.surname).toEqual(CLASS.surname);
        expect(test[NUMBER]).toEqual(CLASS[NUMBER]);
        expect(test[STRING]).toEqual(CLASS[STRING]);
        expect(test[SYMBOL_NUMBER]).toEqual(CLASS[SYMBOL_NUMBER]);
        expect(test[SYMBOL_STRING]).toEqual(CLASS[SYMBOL_STRING]);
      });
    });
  });
});
