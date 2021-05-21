import { OBJECT_ONE, ObjectOne } from './variables/object.const';
import { SYMBOL_NUMBER } from './variables/symbol.const';
import { pickProperty } from '../lib/pick-property.function';

describe(pickProperty.name, () => {
  // Defined.
  it('is DEFINED', () => expect(pickProperty).toBeDefined());

  pickProperty(OBJECT_ONE, [SYMBOL_NUMBER, 'test']);
});
