// External import: Type.
import { ResultCallback } from '@angular-package/type';
// Import: Class.
import { Suffix } from '../lib/suffix.class';
/**
 * Tests.
 */
describe(Suffix.name, () => {
  // Constant.
  const pattern = /[^0-9$_]/g;
  const customCallback: ResultCallback = (result: boolean, value: any): boolean => {
    if (result === true) {
      throw new Error('Result is string');
    }
    return result;
  };

  // Variable.
  let nameSuffix: Suffix;
  let suffix = 'database';

  beforeEach(() => nameSuffix = new Suffix());
  beforeEach(() => suffix = 'database');


  it('is DEFINED', () => expect(nameSuffix).toBeDefined());

  // Default callback.
  it('has default callback', () => {
    try {
      nameSuffix.set('$$$');
    } catch (e) {
      expect(e.message).toEqual('Result is string');
    }
  });

  // Custom callback.
  it('has custom callback', () => {
    try {
      nameSuffix.set('$$$', customCallback);
    } catch (e) {
      expect(e.message).toEqual('Result is string');
    }
  });

  // Initial.
  it('initially set suffix to $$', () => expect(new Suffix('$$').get).toEqual('$$'));

  // Set.
  describe(`set suffix to '${suffix}'`, () => {
    it('default', () => expect(nameSuffix.set(suffix).get).toEqual('dat'));
    it(`different length to ${suffix}`, () => expect(nameSuffix.length(8).set(suffix).get).toEqual(suffix));
    it(`different pattern to ${suffix}`, () => expect(nameSuffix.pattern(pattern).set(`${suffix}27`).get).toEqual('27'));
  });

  // Define.
  describe('define', () => {
    it(`default to ${suffix}`, () => expect(Suffix.define(suffix)).toEqual('dat'));
    it(`different length to ${suffix}`, () => expect(Suffix.define(suffix, undefined, 8)).toEqual('database'));
    it(`different pattern to ${suffix}`, () => expect(Suffix.define(`${suffix}27`, pattern)).toEqual('27'));
  });
});
