import { NameSuffix } from '../lib/name-suffix.class';

describe('NameSuffix', () => {
  let nameSuffix: NameSuffix;
  beforeEach(() => {
    nameSuffix = new NameSuffix();
  });
  it('is DEFINED', () => {
    expect(nameSuffix).toBeDefined();
  });
  it('set prefix to $$', () => {
    nameSuffix.set('$$');
    expect(nameSuffix.get).toEqual('$$');
  });
  it('initially set prefix to $$', () => {
    expect(new NameSuffix('$$').get).toEqual('$$');
  });

});
