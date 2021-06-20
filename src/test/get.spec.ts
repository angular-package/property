// Object to test.
import { get } from '../lib/get.object';
/**
 * Test `get` object.
 */
describe(`get object`, () => {
  // Defined.
  it('is DEFINED', () => expect(get).toBeDefined());

  describe(`defined`, () => {
    it('`existProperty()`', () => expect(get.existProperty).toBeDefined());
    it('`object()`', () => expect(get.object).toBeDefined());
    it('`properties()`', () => expect(get.properties).toBeDefined());
    it('`property()`', () => expect(get.property).toBeDefined());
  });
});
