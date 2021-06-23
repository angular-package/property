// External.
import { ResultCallback } from '@angular-package/type';
// Function.
import { Prefix } from '../lib/prefix.class';
/**
 * Tests.
 */
describe(Prefix.name, () => {
  // Constant.
  const pattern = /[^0-9$_]/g;
  const customCallback: ResultCallback = (result: boolean, value: any): boolean => {
    if (result === true) {
      throw new Error('Result is string');
    }
    return result;
  };

  // Variable.
  let namePrefix: Prefix;
  let prefix = 'wordpress';

  // BeforeEach.
  beforeEach(() => namePrefix = new Prefix());
  beforeEach(() => prefix = 'wordpress');

  it('is DEFINED', () => expect(namePrefix).toBeDefined());

  // Default callback.
  it('has default callback', () => {
    try {
      namePrefix.set('$$$');
    } catch (e) {
      expect(e.message).toEqual('Result is string');
    }
  });

  // Custom callback.
  it('has custom callback', () => {
    try {
      namePrefix.set('$$$', customCallback);
    } catch (e) {
      expect(e.message).toEqual('Result is string');
    }
  });

  // Initial.
  it('initially set prefix to $$', () => expect(new Prefix('$$').get).toEqual('$$'));

  // Set.
  describe(`set prefix to '${prefix}'`, () => {
    it('default', () => expect(namePrefix.set(prefix).get).toEqual('wor'));
    it(`different length to ${prefix}`, () => expect(namePrefix.length(9).set(prefix).get).toEqual(prefix));
    it(`different pattern to ${prefix}`, () => expect(namePrefix.pattern(pattern).set(`${prefix}27`).get).toEqual('27'));
  });

  // Define.
  describe('define', () => {
    it(`default to ${prefix}`, () => expect(Prefix.define(prefix)).toEqual('wor'));
    it(`different length to ${prefix}`, () => expect(Prefix.define(prefix, undefined, 9)).toEqual('wordpress'));
    it(`different pattern to ${prefix}`, () => expect(Prefix.define(`${prefix}27`, pattern)).toEqual('27'));
  });
});
