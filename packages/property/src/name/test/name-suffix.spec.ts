import { NameSuffix } from '../lib/name-suffix.class';
import { ResultCallback } from '@angular-package/type';

describe(NameSuffix.name, () => {
  let nameSuffix: NameSuffix;

  const customCallback: ResultCallback = (result: boolean, value: any): boolean => {
    if (result === true) {
      throw new Error('Result is string');
    }
    return result;
  };

  beforeEach(() => nameSuffix = new NameSuffix());

  it('is DEFINED', () => expect(nameSuffix).toBeDefined());
  it('has default callback', () => {
    try {
      nameSuffix.set('$$$');
    } catch (e) {
      expect(e.message).toEqual('Result is string');
    }
  });
  it('has custom callback', () => {
    try {
      nameSuffix.set('$$$', customCallback);
    } catch (e) {
      expect(e.message).toEqual('Result is string');
    }
  });
  it('initially set prefix to $$', () => expect(new NameSuffix('$$').get).toEqual('$$'));
  it('set prefix to $$', () => expect(nameSuffix.set('$$').get).toEqual('$$'));
});
