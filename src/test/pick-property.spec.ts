// Function to test.
import { pickProperties } from '../lib/pick-property.function';
// Constant.
import { OBJECT_ONE, ObjectOne } from './variables/object.const';
import { SYMBOL_NUMBER } from './variables/symbol.const';
/**
 * 
 */
describe(pickProperties.name, () => {
  // Defined.
  it('is DEFINED', () => expect(pickProperties).toBeDefined());

  pickProperties(OBJECT_ONE, [SYMBOL_NUMBER, 'test']);
});
